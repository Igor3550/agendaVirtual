import { Router } from 'express';
import serviceController from '../controller/service-controller';
import { verifyServiceInput } from '../middlewares/service-insert-middlewares';

const serviceRouter = Router();

serviceRouter
  .get('/', serviceController.getServicesList)
  .post('/', verifyServiceInput, serviceController.createService)
  .put('/:id', verifyServiceInput, serviceController.updateService)
  .delete('/:id', serviceController.deleteService);

export { serviceRouter };
