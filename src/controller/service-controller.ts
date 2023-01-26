import { Request, Response } from "express";
import httpStatus from "http-status";

import serviceService from "../services/services-service";

async function getServicesList(req: Request, res: Response) {
  try {
    const serviceList = await serviceService.listServices();
    return res.send(serviceList);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createService(req: Request, res: Response) {
  const { name, duration, price } = req.body;

  try {
    const createdService = await serviceService.createService(name, duration, price);
    return res.send(createdService);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateService(req: Request, res: Response) {
  const serviceId = req.params.id;
  if(!serviceId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const { name, duration, price } = req.body;

  try {
    const updatedService = await serviceService.updateService(Number(serviceId), name, duration, price);
    return res.send(updatedService);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteService(req: Request, res: Response) {
  const serviceId = req.params.id;

  try {
    const deletedService = await serviceService.deleteService(Number(serviceId));
    return res.send(deletedService);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const serviceController = {
  getServicesList,
  createService,
  updateService,
  deleteService
}

export default serviceController;
