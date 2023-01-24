import { Request, Response } from "express";
import httpStatus from "http-status";

import scheduleService from "../services/schedule-service";

async function sendScheduleList(req: Request, res: Response) {
  try {
    const scheduleList = await scheduleService.getScheduleList();
    return res.send(scheduleList);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createSchedule(req: Request, res: Response) {
  const { name, date, hour, service_id } = req.body;

  try {
    const schedule = await scheduleService.insertSchedule(name, service_id, date, hour);
    return res.send(schedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const scheduleController = {
  sendScheduleList,
  createSchedule
}

export default scheduleController;
