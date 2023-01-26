import { notFound } from '../errors/errors';
import historyRepository from '../repositories/history-repository';

async function listHistory() {
  const historysList = await historyRepository.listHistory();
  return historysList;
}

async function getHistoryByName(name: string) {
  const history = await historyRepository.getHistoryByName(name);
  if(!history) throw notFound();

  return history;
}

const historyService = {
  listHistory,
  getHistoryByName
}

export default historyService;
