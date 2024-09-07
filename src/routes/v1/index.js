import express from 'express';

import taskRouter from './task';
import reportRouter from './report';

const indexRouter = express.Router();

indexRouter.use('/task', taskRouter);
indexRouter.use('/report', reportRouter);

export default indexRouter;
