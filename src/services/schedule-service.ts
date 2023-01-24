import scheduleRepository from '../repositories/schedule-repository';
import serviceRepository from '../repositories/service-repository';
import { notFound, badRequest } from '../errors/errors';
import { verifyDate } from '../utils/verify-date';

async function getScheduleList() {
  const scheduleList = await scheduleRepository.listSchedule();

  return scheduleList;
}

async function insertSchedule(name: string, service_id: number, date: string, hour: number) {
  const service = await serviceRepository.findById(service_id);
  
  if(!service) {
    throw notFound();
  };

  const dateVerify = await verifyDate(date, hour, service);

  if(!dateVerify) {
    throw badRequest();
  };

  const schedule = await scheduleRepository.insertSchedule(name, service_id, date, hour);

  return schedule;
}

const scheduleService = {
  getScheduleList,
  insertSchedule
}

export default scheduleService;
