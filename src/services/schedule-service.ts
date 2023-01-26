import scheduleRepository from '../repositories/schedule-repository';
import serviceRepository from '../repositories/service-repository';
import { notFound, badRequest } from '../errors/errors';
import { verifyDate } from '../utils/verify-date';

async function verifyServiceAndDate(schedule_id: number, service_id: number, date: string, hour: number) {
  const service = await serviceRepository.findById(service_id);
  
  if(!service) {
    throw badRequest();
  };

  const dateVerify = await verifyDate(schedule_id, date, hour, service);

  if(!dateVerify.hourIsAvailable) {
    throw badRequest();
  };
}

async function getScheduleList() {
  const scheduleList = await scheduleRepository.listSchedule();

  return scheduleList;
}

async function insertSchedule(name: string, service_id: number, date: string, hour: number) {
  await verifyServiceAndDate(null, service_id, date, hour);

  const schedule = await scheduleRepository.insertSchedule(name, service_id, date, hour);

  return schedule;
}

async function updateSchedule(id: number, name: string, service_id: number, date: string, hour: number){
  const schedule = await scheduleRepository.getScheduleById(id);
  
  await verifyServiceAndDate(id, service_id, date, hour);

  if(!schedule) throw notFound();

  const updatedSchedule = await scheduleRepository.updateSchedule(id, name, service_id, date, hour);

  return updatedSchedule;
}

async function deleteScheduleById(id: number) {
  const schedule = await scheduleRepository.getScheduleById(id);
  if(!schedule) throw notFound();

  const deletedSchedule = await scheduleRepository.deleteScheduleById(id);
  return deletedSchedule;
}

async function finishScheduleById(id: number) {
  const schedule = await scheduleRepository.getScheduleById(id);
  if(!schedule) throw notFound();
  if(schedule.finished) throw badRequest();

  const finishedSchedule = await scheduleRepository.finishSchedule(id);
  return finishedSchedule;
}

const scheduleService = {
  getScheduleList,
  insertSchedule,
  updateSchedule,
  deleteScheduleById,
  finishScheduleById
}

export default scheduleService;
