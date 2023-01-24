import scheduleRepository from "../repositories/schedule-repository";
import { Service } from "@prisma/client";
import { dayHoursHash } from "./hashtable-days-hour";

async function verifyDate(date: string, hour: number, service: Service) {
  const scheduleDayList = await scheduleRepository.listScheduleByDate(date);
  const durationHourList = [];

  for(let i = 0; i<(service.duration); i++){
    durationHourList.push(hour+i);
  }

  scheduleDayList.map((schedule) => {
    const start = schedule.hour;

    for(let i = 0; i < schedule.Service.duration; i++){
      dayHoursHash[(start+i)] = false;
    }

  });

  for(let i = 0; i<(durationHourList.length); i++){
    let hour = durationHourList[i];
    if(dayHoursHash[hour] === false) {
      return false;
    };
  };

  return true;
}

export {
  verifyDate
}
