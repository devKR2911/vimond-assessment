import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

export const input_data_three: IIntervalRequestBody = {
  includedInterval: [
    {
      from: 200,
      to: 300,
    },
    {
      from: 50,
      to: 100,
    },
  ],
  excludedInterval: [
    {
      from: 95,
      to: 205,
    },
  ],
};

export const output_data_three: IIntervalNode[] = [
  {
    from: 50,
    to: 94,
  },
  {
    from: 206,
    to: 300,
  },
];
