import express from 'express';
import { reportController } from '../../controllers';

const reportRouter = express.Router();

reportRouter.get('/', reportController.get);

export default reportRouter;
