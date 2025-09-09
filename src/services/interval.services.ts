import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

/**
 * @description Function to recieve the interval list and merge them if they have overlapping end and start coordinates
 * @param intervals - Array of intervals having nodes "from" and "to"
 * @returns - Sorted and merged array based on the overlapping of adjacent nodes
 */
const sortAndMergeOverlappingIntervals = (intervals: IIntervalNode[]) => {
  // Sort the intervals based on the key "from" in ascending order
  const sortedInterval = [...intervals].sort(
    (interval1, interval2) => interval1.from - interval2.from
  );

  /**
   * To finish the merging in one single loop,
   * we create a "merged" array and keep the first node in the "sorted array" to it
   * we run the loop in the "sorted array" from index 1 to the last one
   * if the adjecent nodes overlap, "to" value of the "previous node" will be greater than or equal to "from" value of "cuurrent node"
   * if they overlap, overwrite the to value of the last node, if not push current node to "mergedIntervals"
   */
  const mergedIntervals: IIntervalNode[] = sortedInterval.length
    ? [sortedInterval[0]]
    : [];

  for (let i = 1; i < sortedInterval.length; i++) {
    const currentInterval = sortedInterval[i];
    const previousInterval = mergedIntervals[mergedIntervals.length - 1];
    if (previousInterval.to >= currentInterval.from) {
      previousInterval.to = Math.max(previousInterval.to, currentInterval.to);
    } else {
      mergedIntervals.push(currentInterval);
    }
  }
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
 *      Loop through each of the excludes array and fins its negated part within min and max limits of the incudes data set
 *  4.  The intersection between the negates data set and the includes dataset is the final value for us
 */
export const evaluateInterval = (
  interval: IIntervalRequestBody
): IIntervalNode[] => {
  const { includedInterval, excludedInterval } = interval;

  // Merge the incuded and excluded nodes in case if they have mutually overlapping entries
  // Example: 10-100, 60-180 is same as 10-180
  const mergedIncludedInterval =
    sortAndMergeOverlappingIntervals(includedInterval);
  const mergedExcludedInterval =
    sortAndMergeOverlappingIntervals(excludedInterval);

  const minBoundary = mergedIncludedInterval.length
    ? mergedIncludedInterval[0].from
    : 0;
  const maxBoundary = mergedIncludedInterval.length
    ? mergedIncludedInterval[mergedIncludedInterval.length - 1].to
    : 0;

  let negationOfExcludedInterval: IIntervalNode[] = [];
  if (mergedExcludedInterval.length === 0) {
    negationOfExcludedInterval = mergedIncludedInterval;
  } else {
    mergedExcludedInterval.forEach((currentNode, index) => {
      // You have to run the logic on only those lines which starts before maxBoundary and ends after minBoundary
      if (currentNode.to > minBoundary && currentNode.from < maxBoundary) {
        const previousNode =
          index === 0 ? undefined : mergedExcludedInterval[index - 1];
        const nextNode =
          index === mergedExcludedInterval.length - 1
            ? undefined
            : mergedExcludedInterval[index + 1];

        // First node
        // if the first node starts before the min boundary, skip it
        if (previousNode === undefined && currentNode.from > minBoundary) {
          negationOfExcludedInterval.push({
            from: minBoundary,
            to: currentNode.from - 1,
          });
        }

        // If you have a previous node, this only means this can never be the "first node"
        // This can either be the intermeadiate node or the last node
        // For both case add the information from the previous node end point to the current node start point to exclude array
        if (previousNode !== undefined) {
          negationOfExcludedInterval.push({
            from: previousNode.to + 1,
            to: currentNode.from - 1,
          });
        }

        // Last Node
        if (nextNode === undefined && currentNode.to < maxBoundary) {
          // Adding information about last node till maxBoundary
          negationOfExcludedInterval.push({
            from: currentNode.to + 1,
            to: maxBoundary,
          });
        }
      }
    });
  }
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
