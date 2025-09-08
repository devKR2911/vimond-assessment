import { Request, Response } from "express";

const checkInterval = (req: Request, resp: Response): void => {
  const data = req.body;
  console.log(data);
  resp.status(200).json({ message: "Success!!" });
};

export { checkInterval };
