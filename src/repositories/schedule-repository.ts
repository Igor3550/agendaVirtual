import prisma from "../database/prisma-connection";

async function listSchedule() {
  return prisma.schedule.findMany({
    where: {
      finished: false
    }
  });
}

async function listScheduleByDate(date: string) {
  return prisma.schedule.findMany({
    where: {
      date: date,
      finished: false
    },
    include: {
      Service: true
    }
  });
}

async function getScheduleById(id: number) {
  return prisma.schedule.findFirst({
    where: {
      id
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

async function updateSchedule(id:number, name: string, service_id: number, date: string, hour: number) {
  return prisma.schedule.update({
    where: {
      id
    },
    data: {
      clientName: name,
      date,
      hour,
      service_id
    }
  });
}

async function finishSchedule(id:number) {
  return prisma.schedule.update({
    where: {
      id
    },
    data: {
      finished: true
    }
  });
}

async function deleteScheduleById(id: number) {
  return prisma.schedule.delete({
    where: {
      id
    }
  });
}

const scheduleRepository = {
  getScheduleById,
  listSchedule,
  listScheduleByDate,
  insertSchedule,
  updateSchedule,
  deleteScheduleById,
  finishSchedule
}

export default scheduleRepository;
