import { notFound } from "../errors/errors";
import serviceRepository from "../repositories/service-repository";

async function createService(name: string, duration: number, price: number) {
  const service = await serviceRepository.insertService(name, duration, price);

  return service;
}

async function findServiceById(id: number) {
  const service = await serviceRepository.findById(id);

  return service;
}

async function listServices() {
  const services = await serviceRepository.listServices();

  return services;
}

async function updateService(id: number, name: string, duration: number, price: number) {
  const serviceExistent = await serviceRepository.findById(id);
  if(!serviceExistent) throw notFound();

  const service = await serviceRepository.updateService(id, name, duration, price);

  return service;
}

async function deleteService(id: number) {
  const serviceExistent = await serviceRepository.findById(id);
  if(!serviceExistent) throw notFound();

  const service = await serviceRepository.deleteService(id);

  return service;
}

const serviceService = {
  createService,
  findServiceById,
  listServices,
  updateService,
  deleteService
}

export default serviceService;
