import dayjs from "dayjs";
import scheduleRepository from "../repositories/schedule-repository";
import { Service } from "@prisma/client";
import { getDaysHoursHash } from "./hashtable-days-hour";

async function verifyDate(schedule_id: number, date: string, hour: number, service: Service) {
  const dayHoursHash = getDaysHoursHash();
  const scheduleDayList = await scheduleRepository.listScheduleByDate(date);
  const durationHourList = [];
  const isAfterTodayVerify = dayjs(date).isBefore(dayjs());

  if(isAfterTodayVerify) return false;

  for(let i = 0; i<(service.duration); i++){
    durationHourList.push(hour+i);
  }

  scheduleDayList.map((schedule) => {
    const start = schedule.hour;

    if(schedule.id !== schedule_id){
      for(let i = 0; i < schedule.Service.duration; i++){
        dayHoursHash[(start+i)] = false;
      }
    }

  });

  for(let i = 0; i<(durationHourList.length); i++){
    let hour = durationHourList[i];

    if(!dayHoursHash[hour]) {
      return false;
    };
  };

  return true;
}

export {
  verifyDate
}
