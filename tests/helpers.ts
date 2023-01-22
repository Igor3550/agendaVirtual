import prisma from "../src/database/prisma-connection";

export async function cleanDb() {
  await prisma.history.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.service.deleteMany({});
};
