import prisma from "../database/prisma-connection";

async function listHistory() {
  const historyList = await prisma.schedule.findMany({
    where: {
      finished: true
    }
  });

  return historyList;
}

async function getHistoryByName(name: string) {
  const history = await prisma.schedule.findMany({
    where:{
      finished: true,
      clientName:{
        contains: name,
        mode: 'insensitive'
      }
    }
  });

  return history;
}

const historyRepository = {
  listHistory,
  getHistoryByName
}

export default historyRepository;
