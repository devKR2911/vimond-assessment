import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

export function evaluateInterval(
  interval: IIntervalRequestBody
): IIntervalNode[] {
  const { includedInterval, excludedInterval } = interval;

  // Sort the interval in ascending order
  const sortedIncludedInterval = includedInterval.sort(
    (interval1, interval2) => interval1.from - interval2.from
  );
  const sortedExcludedInterval = excludedInterval.sort(
    (interval1, interval2) => interval1.from - interval2.from
  );

  const finalInterval: IIntervalNode[] = [];

  sortedIncludedInterval.forEach((includedInterval) => {
    sortedExcludedInterval.forEach((excludedInterval) => {
      // Lets see which all are the nodes that cover this interval from the exclude list
      // Two lines overlap when the max of start is less than min of end
      const isOverlapping =
        Math.max(includedInterval.from, excludedInterval.from) <
        Math.min(includedInterval.to, excludedInterval.to);
      if (isOverlapping) {
        if (includedInterval.from < excludedInterval.from) {
          finalInterval.push({
            from: includedInterval.from,
            to: excludedInterval.from - 1,
          });
        }
        if (includedInterval.to > excludedInterval.to) {
          finalInterval.push({
            from: excludedInterval.to + 1,
            to: includedInterval.to,
          });
        }
      }
    });
  });
  return finalInterval;
}
