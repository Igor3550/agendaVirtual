import dayjs from "dayjs";
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

  const tratedDate = dayjs(date).toISOString();

  try {
    const schedule = await scheduleService.insertSchedule(name, service_id, tratedDate, hour);
    return res.send(schedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateSchedule(req: Request, res: Response) {
  const schedule_id = req.params.id;
  const { name, service_id, date, hour } = req.body;

  const tratedDate = dayjs(date).toISOString();

  try {
    const updatedSchedule = await scheduleService.updateSchedule(Number(schedule_id), name, service_id, tratedDate, hour);
    return res.send(updatedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteSchedule(req: Request, res: Response) {
  const schedule_id = req.params.id;
  if(!schedule_id || isNaN(Number(schedule_id))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const deletedSchedule = await scheduleService.deleteScheduleById(Number(schedule_id));
    return res.send(deletedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function finishSchedule(req: Request, res: Response) {
  const schedule_id = req.params.id;
  if(!schedule_id || isNaN(Number(schedule_id))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const finishedSchedule = await scheduleService.finishScheduleById(Number(schedule_id));
    return res.send(finishedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const scheduleController = {
  sendScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  finishSchedule
}

export default scheduleController;
