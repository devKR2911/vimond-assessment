import { Response } from "express";
import { IRequestPayload } from "@/interfaces/interval.interface";
import { evaluateInterval } from "@/services/interval.services";

const checkInterval = (req: IRequestPayload, resp: Response): void => {
  const data = req.body;
  const result = evaluateInterval(data);
  resp.status(200).json({ result });
};

export { checkInterval };
