import prisma from "../database/prisma-connection";

async function listSchedule() {
  return prisma.schedule.findMany({});
}

async function listScheduleByDate(date: string) {
  return prisma.schedule.findMany({
    where: {
      date: date
    },
    include: {
      Service: true
    }
  });
}

async function insertSchedule(name: string, service_id: number, date: string, hour: number) {
  return prisma.schedule.create({
    data: {
      clientName: name,
      date,
      hour,
      service_id
    }
  });
}

const scheduleRepository = {
  listSchedule,
  listScheduleByDate,
  insertSchedule
}

export default scheduleRepository;
