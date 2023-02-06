import waitingRepository from "../repositories/waiting-repository";
import serviceService from "./services-service";
import { notFound } from "../errors/errors";

async function getWaitingList() {
  const waitingList = await waitingRepository.getWaitingList();
  return waitingList;
}

async function getWaitingsByName(name: string) {
  const waitings = await waitingRepository.getWaitingByName(name);
  return waitings;
}

async function createWaiting(name: string, date: string, service_id: number) {
  const service = await serviceService.findServiceById(service_id);
  if(!service) throw notFound();
  
  const waiting = await waitingRepository.insertWaiting(name, date, service_id);
  return waiting;
}

async function updateWaiting(id: number, name: string) {
  const existentWaiting = await waitingRepository.getWaitingById(id);
  if(!existentWaiting) throw notFound();

  const waiting = await waitingRepository.updateWaiting(id, name);
  return waiting;
}

async function deleteWaiting(id: number) {
  const existentWaiting = await waitingRepository.getWaitingById(id);
  if(!existentWaiting) throw notFound();
  
  const waiting = await waitingRepository.deleteWaiting(id);
  return waiting;
}

const waitingService = {
  getWaitingList,
  createWaiting,
  updateWaiting,
  deleteWaiting,
  getWaitingsByName
}

export default waitingService;