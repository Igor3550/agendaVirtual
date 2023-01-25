import prisma from "../src/database/prisma-connection";

async function cleanDb() {
  await prisma.history.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.service.deleteMany({});
};

export {
  cleanDb
};
