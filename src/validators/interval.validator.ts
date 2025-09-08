import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { createValidator } from "express-joi-validation";

const validator = createValidator();

const intervalNodeSchema = Joi.object({
  from: Joi.number().integer().required(),
  to: Joi.number().integer().required(),
});

const bodySchema = Joi.object({
  includedInterval: Joi.array().items(intervalNodeSchema),
  excludedInterval: Joi.array().items(intervalNodeSchema),
});

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const { error } = bodySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
}
