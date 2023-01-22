import prisma from "../database/prisma-connection";

async function listSchedule() {
  return prisma.schedule.findMany({});
}

const scheduleRepository = {
  listSchedule
}

export default scheduleRepository;
