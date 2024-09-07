import express from 'express';

import testRouter from './test';
import taskRouter from './task';
import reportRouter from './report';

const indexRouter = express.Router();

indexRouter.use('/test', testRouter);
indexRouter.use('/task', taskRouter);
indexRouter.use('/report', reportRouter);

export default indexRouter;
