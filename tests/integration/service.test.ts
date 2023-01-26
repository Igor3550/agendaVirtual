import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";

import app from "../../src/app";
import { createService } from '../factories';
import { cleanDb} from "../helpers";

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe('GET /services', () => {

  it('Should Respond with status code 200 and the correct list of services!', async () => {
    const createdService = await createService();
    const response = await api.get('/services');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: createdService.id,
        name: createdService.name,
        duration: createdService.duration,
        price: createdService.price,
        createdAt: createdService.createdAt.toISOString()
      }
    ]);
  });

});

describe('POST /services', () => {

  it('Should Respond with status code 400 when body is not the correct!', async () => {
    const serviceToCreate = {
      name: "service_name",
      duration: 2
    }
    const response = await api.post('/services').send(serviceToCreate);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

  });

  it('Should Respond with status code 200 when body is correct!', async () => {
    const serviceToCreate = {
      name: "service_name",
      duration: 2,
      price: 100
    }
    const response = await api.post('/services').send(serviceToCreate);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      {
        id: expect.any(Number),
        name: serviceToCreate.name,
        duration: serviceToCreate.duration,
        price: serviceToCreate.price,
        createdAt: expect.any(String)
      }
    );
  });

});

describe('PUT /services/:id', () => {

  it('Should Respond with status code 400 when body is not the correct!', async () => {
    const createdService = await createService();

    const newServiceBody = {
      name: "service_name",
      duration: 2
    }
    const response = await api.put(`/services/${createdService.id}`).send(newServiceBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

  });

  it('Should Respond with status code 404 when the id not exists!', async () => {
    const newServiceBody = {
      name: "service_name",
      duration: 2,
      price: 100
    }
    const response = await api.put(`/services/0`).send(newServiceBody);

    expect(response.status).toBe(httpStatus.NOT_FOUND);

  });

  it('Should Respond with status code 200 and the correct object when body is correct!', async () => {
    const createdService = await createService();

    const newServiceBody = {
      name: "service_name",
      duration: 2,
      price: 100
    }
    const response = await api.put(`/services/${createdService.id}`).send(newServiceBody);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      {
        id: createdService.id,
        name: newServiceBody.name,
        duration: newServiceBody.duration,
        price: newServiceBody.price,
        createdAt: createdService.createdAt.toISOString()
      }
    );
  });

});

describe('DELETE /services/:id', () => {

  it('Should Respond with status code 404 when the id not exists!', async () => {
    const response = await api.delete(`/services/0`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);

  });

  it('Should Respond with status code 200 and the correct object when id exists!', async () => {
    const createdService = await createService();

    const response = await api.delete(`/services/${createdService.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      {
        id: createdService.id,
        name: createdService.name,
        duration: createdService.duration,
        price: createdService.price,
        createdAt: createdService.createdAt.toISOString()
      }
    );
  });

});