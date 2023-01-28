import { faker } from "@faker-js/faker";
import prisma from "../../src/database/prisma-connection";

export async function createWaiting() {
  const waiting = await prisma.waiting.create({
    data: {
      clientName: faker.name.firstName()
    }
  });

  return waiting;
}
