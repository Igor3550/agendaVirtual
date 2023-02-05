import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import prisma from "../../src/database/prisma-connection";
import { createService } from "./schedule-factory";

export async function createWaiting() {
  const date = faker.date.future();
  const waiting = await prisma.waiting.create({
    data: {
      clientName: faker.name.firstName(),
      date: date,
      service_id: (await createService()).id
    }
  });

  return waiting;
}
