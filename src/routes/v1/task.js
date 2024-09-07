import express from 'express';
import { taskController } from '../../controllers';

const taskRouter = express.Router();

taskRouter.post('/', taskController.create);

export default taskRouter;
