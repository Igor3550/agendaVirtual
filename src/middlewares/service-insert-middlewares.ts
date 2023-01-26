import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from 'joi';

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  duration: Joi.number().required(),
  price: Joi.number().required()
});

export function verifyServiceInput(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  try {
    const bodyVerify = serviceSchema.validate(body);
    if(bodyVerify.error) return res.sendStatus(httpStatus.BAD_REQUEST);
    return next();
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
