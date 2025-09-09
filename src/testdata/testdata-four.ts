import {
  IIntervalNode,
  IIntervalRequestBody,
} from "@/interfaces/interval.interface";

export const input_data_four: IIntervalRequestBody = {
  includedInterval: [
    {
      from: 200,
      to: 300,
    },
    {
      from: 10,
      to: 100,
    },
    {
      from: 400,
      to: 500,
    },
  ],
  excludedInterval: [
    {
      from: 410,
      to: 420,
    },
    {
      from: 95,
      to: 205,
    },
    {
      from: 100,
      to: 150,
    },
  ],
};

export const output_data_four: IIntervalNode[] = [
  {
    from: 10,
    to: 94,
  },
  {
    from: 206,
    to: 300,
  },
  {
    from: 400,
    to: 409,
  },
  {
    from: 421,
    to: 500,
  },
];
