import dayjs from "dayjs";
import { Request, Response } from "express";
import httpStatus from "http-status";
import dateService from "../services/date-service";

async function getDateHours(req: Request, res: Response) {
  const { date } = req.params;
  if(!date) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const dateHours = await dateService.getDateHours(dayjs(date).toISOString());
    return res.send(dateHours.dayHoursHash);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

}

const dateController = {
  getDateHours
}

export default dateController;
