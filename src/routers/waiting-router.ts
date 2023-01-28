import { Router } from "express";
import waitingController from "../controller/waiting-controller";

const waitingRouter = Router();

waitingRouter
  .get('/', waitingController.getWaitingList)
  .post('/', waitingController.createWaiting)
  .put('/:id', waitingController.updateWaiting)
  .delete('/:id', waitingController.deleteWaiting);

export { waitingRouter };