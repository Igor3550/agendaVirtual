import { Router } from 'express';
import dateController from '../controller/date-controller';

const dateRouter = Router();

dateRouter.get('/hours/:date', dateController.getDateHours);

export { dateRouter };
