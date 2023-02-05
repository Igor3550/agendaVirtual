import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";

import app from "../../src/app";
import { cleanDb } from "../helpers";
import { createWaiting } from "../factories/waitng-factory";
import { createService } from "../factories";

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe('GET /waiting', () => {

  it('Should respond with 200 and waiting list!', async () => {
    const response = await api.get('/waiting');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
    
  });

});

describe('GET /waiting?name=client', () => {

  it('Should respond with 200 and list of waitings that contains the name!', async () => {
    const createdWaiting = await createWaiting();
    const createdWaiting2 = await createWaiting();
    const response = await api.get(`/waiting?name=${createdWaiting.clientName}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([{
      id: createdWaiting.id,
      clientName: createdWaiting.clientName,
      date: createdWaiting.date.toISOString(),
      service_id: createdWaiting.service_id,
      createdAt: createdWaiting.createdAt.toISOString()
    }]);
    
  });

});

describe('POST /waiting', () => {

  it('Should respond with 400 when name not passed!', async () => {
    const response = await api.post('/waiting');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    
  });

  it('Should respond with 200 and the waiting body!', async () => {
    const service = await createService();
    const body = {
      name: faker.name.firstName(),
      date: faker.date.future(),
      service_id: service.id
    }
    const response = await api.post('/waiting').send(body);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      clientName: body.name,
      date: body.date.toISOString(),
      service_id: body.service_id,
      createdAt: expect.any(String)
    });
    
  });

});

describe('PUT /waiting/:id', () => {

  it('Should respond with 400 when name not passed!', async () => {
    const createdWaiting = await createWaiting();
    const response = await api.put(`/waiting/${createdWaiting.id}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    
  });

  it('Should respond with 400 when id is invalid!', async () => {
    const name = faker.name.firstName();
    const response = await api.put(`/waiting/a`).send({name: name});

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    
  });

  it('Should respond with 404 when id doesnt exists!', async () => {
    const name = faker.name.firstName();
    const response = await api.put(`/waiting/1`).send({name: name});

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    
  });

  it('Should respond with 200 and the waiting body!', async () => {
    const createdWaiting = await createWaiting();
    const name = faker.name.firstName();
    const response = await api.put(`/waiting/${createdWaiting.id}`).send({name: name});

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: createdWaiting.id,
      clientName: name,
      date: createdWaiting.date.toISOString(),
      service_id: createdWaiting.service_id,
      createdAt: createdWaiting.createdAt.toISOString()
    });
    
  });

});

describe('DELETE /waiting/:id', () => {

  it('Should respond with 400 when id is invalid!', async () => {
    const response = await api.delete(`/waiting/a`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    
  });

  it('Should respond with 404 when id doesnt exists!', async () => {
    const response = await api.delete(`/waiting/1`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    
  });

  it('Should respond with 200 and the waiting body!', async () => {
    const createdWaiting = await createWaiting();
    const response = await api.delete(`/waiting/${createdWaiting.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: createdWaiting.id,
      clientName: createdWaiting.clientName,
      date: createdWaiting.date.toISOString(),
      service_id: createdWaiting.service_id,
      createdAt: createdWaiting.createdAt.toISOString()
    });
    
  });

});