import prisma from "../../src/database/prisma-connection";
import {faker} from "@faker-js/faker";

async function createService() {
  const service = await prisma.service.create({
    data: {
      name: 'Fibra',
      duration: 3,
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
      hour: 7
    }
  })

  return schedule;
};

async function createScheduleFinished() {
  const schedule = await prisma.schedule.create({
    data: {
      clientName: faker.name.firstName(),
      service_id: (await createService()).id,
      date: faker.date.future().toISOString(),
      hour: 7,
      finished: true
    }
  })

  return schedule;
};

export {
  createSchedule,
  createService,
  createScheduleFinished
};
