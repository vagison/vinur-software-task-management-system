import { Task } from '../models';

import { errorMessagesConstants, responseMessagesConstants } from '../constants';

const create = async (req, res, next) => {
  try {
    const data = req.body;

    const task = await Task.create(data);

    return res.status(201).json({ message: responseMessagesConstants.Task.created, task });
  } catch (error) {
    next(error);
  }
};

export {
  create,
};
