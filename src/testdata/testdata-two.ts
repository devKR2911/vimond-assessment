import { IIntervalRequestBody } from "@/interfaces/interval.interface";

export const input: IIntervalRequestBody = {
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

export const output = [
  {
    from: 10,
    to: 5000,
  },
];
