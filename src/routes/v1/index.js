import express from 'express';

import testRouter from './test';
import taskRouter from './task';

const indexRouter = express.Router();

indexRouter.use('/test', testRouter);
indexRouter.use('/task', taskRouter);

export default indexRouter;
