import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from 'joi';

const scheduleSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().required(),
  hour: Joi.number().required(),
  service_id: Joi.number().required()
});

export function verifyScheduleInput(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  try {
    const bodyVerify = scheduleSchema.validate(body);
    if(bodyVerify.error) return res.sendStatus(httpStatus.BAD_REQUEST);
    return next();
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
