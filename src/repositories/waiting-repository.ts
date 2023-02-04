import prisma from "../database/prisma-connection";

async function getWaitingList() {
  return await prisma.waiting.findMany({
    orderBy:{
      id:'asc'
    }
  });
}

async function getWaitingById(id: number) {
  const waiting = await prisma.waiting.findFirst({
    where:{
      id
    }
  });
  return waiting;
}

async function getWaitingByName(name: string) {
  const waiting = await prisma.waiting.findMany({
    where:{
      clientName:{
        contains: name,
        mode: 'insensitive'
      }
    }
  });
  return waiting;
}

async function insertWaiting(name: string, date: string, service_id: number) {
  const waiting = await prisma.waiting.create({
    data:{
      clientName: name,
      date,
      service_id
    }
  });
  return waiting;
}

async function updateWaiting(id: number, name: string) {
  const waiting = await prisma.waiting.update({
    where:{
      id
    },
    data:{
      clientName: name
    }
  });
  return waiting;
}

async function deleteWaiting(id: number) {
  const waiting = await prisma.waiting.delete({
    where:{
      id
    }
  });
  return waiting;
}

const waitingRepository = {
  getWaitingList,
  insertWaiting,
  updateWaiting,
  deleteWaiting,
  getWaitingById,
  getWaitingByName
}

export default waitingRepository;