import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";

import app from "../../src/app";
import { createSchedule, createService } from '../factories';
import { cleanDb } from "../helpers";

const api = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("GET /schedule", () => {
  it('Should respond with status code 200 and the schedule list', async () => {
    const response = await api.get('/schedule');

    expect(response.status).toBe(httpStatus.OK);
  });

  it('Should respond with the correct schedule body list!', async () => {
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

describe("POST /schedule", () => {

  it("Should respond status code 404 if service doesnt exists!", async () => {
    const fakeScheduleBody = {
      name: faker.name.firstName(),
      date: faker.date.future(),
      service_id: 1,
      hour: 7
    }
    const response = await api.post('/schedule').send(fakeScheduleBody);

    expect(response.status).toBe(httpStatus.NOT_FOUND);

  });

  it("Should respond status code 400 if body is invalid!", async () => {
    const createdService = await createService();

    const fakeScheduleBody = {
      date: faker.date.future(),
      service_id: createdService.id,
      hour: 7
    };

    const response = await api.post('/schedule').send(fakeScheduleBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

  });

  it("Should respond status code 400 when date is invalid!", async () => {
    const createdService = await createService();

    const fakeScheduleBody = {
      name: faker.name.firstName(),
      date: faker.date.past(),
      service_id: createdService.id,
      hour: 7
    };

    const response = await api.post('/schedule').send(fakeScheduleBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

  });

  it("Should respond status code 200 and the correct body when the input ok!", async () => {
    const createdService = await createService();

    const fakeScheduleBody = {
      name: faker.name.firstName(),
      date: faker.date.future(),
      service_id: createdService.id,
      hour: 7
    };

    const response = await api.post('/schedule').send(fakeScheduleBody);

    expect(response.status).toBe(httpStatus.OK);

    expect(response.body).toEqual({
      id: expect.any(Number),
      clientName: fakeScheduleBody.name,
      date: fakeScheduleBody.date.toISOString(),
      service_id: fakeScheduleBody.service_id,
      hour: fakeScheduleBody.hour,
      createdAt: expect.any(String)
    });

  });

});
