import { Request, Response } from "express";
import httpStatus from "http-status";

import scheduleService from "../services/schedule-service";

async function sendScheduleList(req: Request, res: Response) {
  try {
    const scheduleList = await scheduleService.getScheduleList();
    res.send(scheduleList);
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const scheduleController = {
  sendScheduleList
}

export default scheduleController;
