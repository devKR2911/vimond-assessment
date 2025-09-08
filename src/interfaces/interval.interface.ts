import { Request } from "express";

export interface IIntervalNode {
  from: number;
  to: number;
}

export interface IIntervalRequestBody {
  excludedInterval: IIntervalNode[];
  includedInterval: IIntervalNode[];
}

export interface IRequestPayload extends Request {
  body: IIntervalRequestBody;
}
