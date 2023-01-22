import supertest from "supertest";

import app from "../../src/app";
import { createSchedule } from '../factories';
import { cleanDb } from "../helpers";

const api = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("GET /schedule", () => {
  it('Should respond with status code 200 and the schedule list', async () => {
    const response = await api.get('/schedule');

    expect(response.status).toBe(200);
  });

  it('Should respond with the correct list schedule', async () => {
    const createdSchedule = await createSchedule();
    const response = await api.get('/schedule');

    console.log(response.body);
    console.log(createdSchedule);

    expect(response.body).toEqual([{
      "id": createdSchedule.id,
      "clientName": createdSchedule.clientName,
      "service_id": createdSchedule.service_id,
      "date": createdSchedule.date,
      "hour": createdSchedule.hour,
      "createdAt": createdSchedule.createdAt.toISOString()
    }]);

  });
});
