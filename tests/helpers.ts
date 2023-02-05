import prisma from "../src/database/prisma-connection";

async function cleanDb() {
  await prisma.schedule.deleteMany({});
  await prisma.waiting.deleteMany({});
  await prisma.service.deleteMany({});
};

export {
  cleanDb
};
