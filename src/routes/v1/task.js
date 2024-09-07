import express from 'express';
import { taskController } from '../../controllers';

const taskRouter = express.Router();

taskRouter.post('/create/', taskController.create);
taskRouter.get('/details/:id', taskController.get);
taskRouter.patch('/updateStatus/:id', taskController.updateStatus);
taskRouter.patch('/markCompleted', taskController.markTasksCompleted);

export default taskRouter;
