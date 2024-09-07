import createHttpError from 'http-errors';

import { Task } from '../models';

import { errorMessagesConstants, responseMessagesConstants } from '../constants';

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const task = await Task.create(data);

    return res.status(201).json({ message: responseMessagesConstants.Task.Created, task });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw createHttpError.NotFound(errorMessagesConstants.Task.NotFound);
    }

    return res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw createHttpError.NotFound(errorMessagesConstants.Task.NotFound);
    }

    task.status = req.body.status;
    await task.save();

    return res.status(200).json({ message: responseMessagesConstants.Task.StatusUpdated, task });
  } catch (error) {
    next(error);
  }
};

const markTasksCompleted = async (req, res, next) => {
  try {
    const filter = {
      _id:
        { $in: req.body.tasks },
    };

    await Task.updateMany(filter, {
      $set: { completed: true },
    });

    return res.status(200).json({ message: responseMessagesConstants.Task.MarkAsCompleted });
  } catch (error) {
    next(error);
  }
};

export {
  create, get, updateStatus, markTasksCompleted,
};
