import { IIntervalRequestBody } from "@/interfaces/interval.interface";

export const input: IIntervalRequestBody = {
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

export const output = [
  {
    from: 50,
    to: 94,
  },
  {
    from: 206,
    to: 300,
  },
];
