import { Request, Response } from "express";
import httpStatus from "http-status";

import historyService from "../services/history-service";

async function listHistory(req: Request, res: Response) {
  const name = req.query.name;
  
  try {
    if(name) {
      const history = await historyService.getHistoryByName(String(name));
      return res.send(history);
    }
    const historyList = await historyService.listHistory();
    return res.send(historyList);
  } catch (error) {
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const historyController = {
  listHistory
}

export default historyController;
