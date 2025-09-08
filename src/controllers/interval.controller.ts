import { Response } from "express";
import { IRequestPayload } from "@/interfaces/interval.interface";

const checkInterval = (req: IRequestPayload, resp: Response): void => {
  const data = req.body;
  console.log(data);
  resp.status(200).json({ message: "Success!!" });
};

export { checkInterval };
