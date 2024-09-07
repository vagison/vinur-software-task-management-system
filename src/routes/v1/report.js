import express from 'express';
import { reportController } from '../../controllers';

const reportRouter = express.Router();

reportRouter.get('/generate', reportController.generate);

export default reportRouter;
