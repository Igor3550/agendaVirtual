import { Schedule } from '@prisma/client';

import scheduleRepository from '../repositories/schedule-repository';

type ScheduleItem = Omit<Schedule, "createdAt">

async function getScheduleList(): Promise<ScheduleItem[]> {
  const scheduleList = await scheduleRepository.listSchedule();

  return scheduleList;
}

const scheduleService = {
  getScheduleList
}

export default scheduleService;
