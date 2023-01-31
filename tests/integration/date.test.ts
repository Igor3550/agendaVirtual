import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../../src/app";
import { createSchedule } from '../factories';
import { cleanDb} from "../helpers";

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe('GET /date/hours/:date', () => {

  it('Should respond with status code 400 when date is invalid!', async () => {
    const fakeDate = faker.date.past();
    const response = await api.get(`/date/hours/${fakeDate}`);

    expect(response.status).toBe(400);
  });

  it('Should respond with status code 200 and the correct body!', async () => {
    const createdSchedule = await createSchedule();
    const shouldRespond = {
      "7": false,
      "8": false,
      "9": false,
      "10": true,
      "11": true,
      "12": true,
      "13": true,
      "14": true,
      "15": true,
      "16": true,
      "17": true,
      "18": true,
      "19": true,
      "20": true
    };

    const response = await api.get(`/date/hours/${createdSchedule.date}`);

    expect(response.status).toBe(200);
    return expect(response.body).toEqual(shouldRespond);
  });

});
