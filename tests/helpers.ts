import prisma from "../src/database/prisma-connection";

async function cleanDb() {
  await prisma.schedule.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.waiting.deleteMany({});
};

export {
  cleanDb
};
