import express from 'express';
import { taskController } from '../../controllers';

const taskRouter = express.Router();

// single resource
taskRouter.post('/', taskController.create);
taskRouter.get('/:id', taskController.getTaskById);
taskRouter.patch('/:id/update-status', taskController.updateStatus);

// multiple resources
taskRouter.get('/', taskController.getTasks);
taskRouter.post('/mark-complete', taskController.markTasksCompletion);

export default taskRouter;
