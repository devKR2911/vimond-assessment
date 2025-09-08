import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

const mergeOverlappingIntervals = (intervals: IIntervalNode[]) => {
  const mergedIntervals: IIntervalNode[] = [];
  intervals.forEach((intervalNode) => {
    // Find from the merged array if there exists any node that over lap the current node from function param
    const overlappingInterval = mergedIntervals.find(
      (node) =>
        Math.max(node.from, intervalNode.from) <
        Math.min(node.to, intervalNode.to)
    );
    // If there is a matching node exists that is already overlapping
    // Rewrite the from and to of that specific node
    if (overlappingInterval) {
      overlappingInterval.from = Math.min(
        overlappingInterval.from,
        intervalNode.from
      );
      overlappingInterval.to = Math.max(
        overlappingInterval.to,
        intervalNode.to
      );
    } else {
      mergedIntervals.push(intervalNode);
    }
  });
  return mergedIntervals;
};
/**
 * @description Function that evaluates the payload and calculate the overlappings
 * @param interval: This is the interval details that we are recieving from the request body
 * We expect that in the list of entries always the "from" node is less than "to" node
 * We can consider a line drawn from "from" node to "to" node, just to imagine that
 * @returns
 * Steps:
 *  1.  Sort the include and exclude interval arrays based on the "from" node
 *  2.  Check if there is any over lapping of entrires in incudes and excludes arrays seperatly
 *      This is because if there are twoi enrtries like 10-100, 60-180 either in includes or exludes array
 *      We should consider this as one single entry 10-180, this is clearly one single line
 *  3.  Now when this over lapping is fixed we have the sorted set of information with unique "from" and "to" points
 *      Loop through each of the includes array against
 */
export const evaluateInterval = (
  interval: IIntervalRequestBody
): IIntervalNode[] => {
  const { includedInterval, excludedInterval } = interval;

  // Sort the interval in ascending order
  const sortedIncludedInterval = includedInterval.sort(
    (interval1, interval2) => interval1.from - interval2.from
  );
  const sortedExcludedInterval = excludedInterval.sort(
    (interval1, interval2) => interval1.from - interval2.from
  );

  // Merge the incuded and excluded nodes in case if they have mutually overlapping entries
  // Example: 10-100, 60-180 is same as 10-180
  const mergedIncludedInterval = mergeOverlappingIntervals(
    sortedIncludedInterval
  );
  const mergedExcludedInterval = mergeOverlappingIntervals(
    sortedExcludedInterval
  );

  const minValue = mergedIncludedInterval.length
    ? mergedIncludedInterval[0].from
    : 0;
  const maxValue = mergedIncludedInterval.length
    ? mergedIncludedInterval[mergedIncludedInterval.length - 1].to
    : 0;

  const negationOfExcludedInterval =
    mergedExcludedInterval.length === 0
      ? mergedIncludedInterval
      : mergedExcludedInterval.flatMap((node, index) => {
          const returnArray = [];
          // First Node
          if (index === 0) {
            returnArray.push({
              from: minValue,
              to: node.from - 1,
            });
          }
          if (index > 0 && index !== mergedExcludedInterval.length - 1) {
            // Intermediate nodes
            returnArray.push({
              from: mergedExcludedInterval[index - 1].to + 1,
              to: node.from - 1,
            });
          }
          if (mergedExcludedInterval.length === 1) {
            // If there is only one element in the exclude array
            // we should manually add the values from that specific node to the max value in the include array
            returnArray.push({
              from: node.to + 1,
              to: maxValue,
            });
          }

          if (
            index === mergedExcludedInterval.length - 1 &&
            mergedExcludedInterval.length > 1
          ) {
            // Last Node
            returnArray.push({
              from: mergedExcludedInterval[index - 1].to + 1,
              to: node.from - 1,
            });
            returnArray.push({
              from: node.to + 1,
              to: maxValue,
            });
          }

          return returnArray;
        });

  const finalInterval: IIntervalNode[] = [];

  // Find the overlap between negationOfExcludedInterval and mergedIncludedInterval
  mergedIncludedInterval.forEach((incNode) => {
    negationOfExcludedInterval.forEach((negExcNode) => {
      const isOverlapping =
        Math.max(incNode.from, negExcNode.from) <
        Math.min(incNode.to, negExcNode.to);
      if (isOverlapping) {
        const from = Math.max(incNode.from, negExcNode.from);
        const to = Math.min(incNode.to, negExcNode.to);
        finalInterval.push({ from, to });
      }
    });
  });

  return finalInterval;
};
