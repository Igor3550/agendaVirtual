import dayjs from "dayjs";
import scheduleRepository from "../repositories/schedule-repository";
import { Service } from "@prisma/client";
import { getDaysHoursHash } from "./hashtable-days-hour";

async function verifyDate(schedule_id: number, date: string, hour: number, service: Service) {
  const today = dayjs().format('YYYY-MM-DD')
  const dayHoursHash = getDaysHoursHash();
  const scheduleDayList = await scheduleRepository.listScheduleByDate(date);
  const durationHourList = [];
  const isAfterTodayVerify = dayjs(date).isBefore(dayjs());
  const isSameTodayVerify = dayjs(date).isSame(dayjs(today));
  const availableHours = {
    dayHoursHash,
    hourIsAvailable: false
  }

  if(isAfterTodayVerify && !isSameTodayVerify) return availableHours;

  scheduleDayList.map((schedule) => {
    const start = schedule.hour;

    if(schedule.id !== schedule_id){
      for(let i = 0; i < schedule.Service.duration; i++){
        dayHoursHash[(start+i)] = false;
      }
    }

  });

  if(!schedule_id && !hour && !service) {
    availableHours.hourIsAvailable = true
    return availableHours;
  }

  for(let i = 0; i<(service.duration); i++){
    durationHourList.push(hour+i);
  }

  for(let i = 0; i<(durationHourList.length); i++){
    let hour = durationHourList[i];

    if(!dayHoursHash[hour]) {
      return availableHours;
    };
  };

  availableHours.hourIsAvailable = true
  return availableHours;
}

export {
  verifyDate
}
