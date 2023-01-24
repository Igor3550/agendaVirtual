import { Router } from 'express';

import scheduleController from '../controller/schedule-controller';
import { verifyScheduleInput } from '../middlewares/schedule-insert-middleware';

const scheduleRouter = Router();

scheduleRouter
  .get('/', scheduleController.sendScheduleList)
  .post('/', verifyScheduleInput, scheduleController.createSchedule);

export { scheduleRouter }
