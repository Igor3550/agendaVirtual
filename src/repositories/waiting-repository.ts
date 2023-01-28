import prisma from "../database/prisma-connection";

async function getWaitingList() {
  const waitingList = await prisma.waiting.findMany({});
  return waitingList;
}

async function getWaitingById(id: number) {
  const waiting = await prisma.waiting.findFirst({
    where:{
      id
    }
  });
  return waiting;
}

async function insertWaiting(name: string) {
  const waiting = await prisma.waiting.create({
    data:{
      clientName: name
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
  getWaitingById
}

export default waitingRepository;