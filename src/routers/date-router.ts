import { Router } from 'express';
import dateController from '../controller/date-controller';

const dateRouter = Router();

dateRouter.get('/hours', dateController.getDateHours);

export { dateRouter };
