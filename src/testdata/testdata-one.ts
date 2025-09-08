import { IIntervalRequestBody } from "@/interfaces/interval.interface";

export const input: IIntervalRequestBody = {
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

export const output = [
  {
    from: 10,
    to: 19,
  },
  {
    from: 31,
    to: 100,
  },
];
