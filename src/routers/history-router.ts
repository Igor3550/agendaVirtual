import { Router } from "express";

import historyController from "../controller/history-controller";

const historyRouter = Router();

historyRouter
  .get('/', historyController.listHistory);

export { historyRouter };