import { Request, Response } from "express";
import httpStatus from "http-status";

import waitingService from "../services/waiting-service";

async function getWaitingList(req: Request, res: Response) {
  try {
    const waitingList = await waitingService.getWaitingList();
    return res.send(waitingList);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createWaiting(req: Request, res: Response) {
  const { name } = req.body;
  if(!name) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const waiting = await waitingService.createWaiting(name);
    return res.send(waiting);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateWaiting(req: Request, res: Response) {
  const { name } = req.body;
  const clientId = Number(req.params.id);
  if(!name || !clientId || isNaN(clientId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const waiting = await waitingService.updateWaiting(clientId, name);
    return res.send(waiting);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}


async function deleteWaiting(req: Request, res: Response) {
  const clientId = Number(req.params.id);
  if(!clientId || isNaN(clientId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const waiting = await waitingService.deleteWaiting(clientId);
    return res.send(waiting);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const waitingController = {
  getWaitingList,
  createWaiting,
  updateWaiting,
  deleteWaiting
}

export default waitingController;