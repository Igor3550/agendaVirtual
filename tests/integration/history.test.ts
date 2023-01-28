import httpStatus from "http-status";
import supertest from "supertest";

import app from "../../src/app";
import { createScheduleFinished } from '../factories';
import { cleanDb} from "../helpers";

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe('GET /history', () => {

  it('Should respond with status code 200 and the list of schedules that is finished!', async () => {
    const createdSchedule = await createScheduleFinished();
    const response = await api.get('/history');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([{
      id: createdSchedule.id,
      clientName: createdSchedule.clientName,
      date: createdSchedule.date,
      hour: createdSchedule.hour,
      service_id: createdSchedule.service_id,
      createdAt: createdSchedule.createdAt.toISOString(),
      finished: createdSchedule.finished
    }]);
  })

});

describe('GET /history?name=cliente_name', () => {

  it('Should respond with status code 200 and empt array when client doesnt exists!', async () => {

    const response = await api.get(`/history?name=client_name`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it('Should respond with status code 200 and the list of schedules that is finished!', async () => {
    const createdSchedule = await createScheduleFinished();
    const response = await api.get(`/history?name=${createdSchedule.clientName}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([{
      id: createdSchedule.id,
      clientName: createdSchedule.clientName,
      date: createdSchedule.date,
      hour: createdSchedule.hour,
      service_id: createdSchedule.service_id,
      createdAt: createdSchedule.createdAt.toISOString(),
      finished: createdSchedule.finished
    }]);
  });

});