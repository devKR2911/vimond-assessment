import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

export const input_data_two: IIntervalRequestBody = {
  includedInterval: [
    {
      from: 50,
      to: 5000,
    },
    {
      from: 10,
      to: 100,
    },
  ],
  excludedInterval: [],
};

export const output_data_two: IIntervalNode[] = [
  {
    from: 10,
    to: 5000,
  },
];
