import { Router } from 'express';

import scheduleController from '../controller/schedule-controller';

const scheduleRouter = Router();

scheduleRouter.get('/', scheduleController.sendScheduleList)

export { scheduleRouter }
