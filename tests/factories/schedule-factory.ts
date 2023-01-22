import prisma from "../../src/database/prisma-connection";
import {faker} from "@faker-js/faker";

async function createService() {
  const service = await prisma.service.create({
    data: {
      name: faker.name.firstName(),
      duration: '3h',
      price: 130
    }
  })

  return service;
}

async function createSchedule() {
  const schedule = await prisma.schedule.create({
    data: {
      clientName: faker.name.firstName(),
      service_id: (await createService()).id,
      date: faker.date.future().toISOString(),
      hour: '7h'
    }
  })

  return schedule;
};

export {
  createSchedule
};
