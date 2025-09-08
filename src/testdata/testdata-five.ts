import { IIntervalRequestBody } from "@/interfaces/interval.interface";

export const input: IIntervalRequestBody = {
  includedInterval: [
    {
      from: 10,
      to: 100,
    },
    {
      from: 50,
      to: 5000,
    },
  ],
  excludedInterval: [
    {
      from: 80,
      to: 300,
    },
    {
      from: 330,
      to: 450,
    },
  ],
};

export const output = [
  {
    from: 10,
    to: 79,
  },
  {
    from: 301,
    to: 329,
  },
  {
    from: 451,
    to: 5000,
  },
];
