import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

export const input_data_one: IIntervalRequestBody = {
  includedInterval: [
    {
      from: 10,
      to: 100,
    },
  ],
  excludedInterval: [
    {
      from: 20,
      to: 30,
    },
  ],
};

export const output_data_one: IIntervalNode[] = [
  {
    from: 10,
    to: 19,
  },
  {
    from: 31,
    to: 100,
  },
];
