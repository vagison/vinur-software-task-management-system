import createHttpError from 'http-errors';

import { Task } from '../models';

import { errorMessagesConstants, responseMessagesConstants } from '../constants';
import { generatePaginatedRes, paginate } from '../utils/pagination';

const create = async (req, res, next) => {
  try {
    const data = req.body;
    delete data.createdAt;
    const task = await Task.create(data);

    return res.status(201).json({ message: responseMessagesConstants.Task.Created, task });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
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

const getTasks = async (req, res, next) => {
  try {
    const pagination = paginate(req);

    const tasks = await Task
      .find()
      .skip(pagination.offset)
      .limit(pagination.limit);

    const results = generatePaginatedRes(tasks, {
      total: await Task.countDocuments(),
      page: pagination.page,
      limit: pagination.limit,
    });

    return res.status(200).json(results);
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

const markTasksCompletion = async (req, res, next) => {
  try {
    const completedAt = req.body.completedAt ? new Date(req.body.completedAt) : false;

    const filter = {
      _id: {
        $in: req.body.tasks,
      },
      ...(completedAt ? { createdAt: { $lte: completedAt } } : {}),
    };

    let updateData = { };

    if (!completedAt) {
      updateData = {
        $unset: {
          completedAt: '',
        },
      };
    } else {
      updateData = {
        $set: {
          completedAt,
        },
      };
    }

    await Task.updateMany(filter, updateData);

    return res.status(200).json({ message: completedAt ? responseMessagesConstants.Task.MarkAsCompleted : responseMessagesConstants.Task.MarkAsNotCompleted });
  } catch (error) {
    next(error);
  }
};

export {
  create, getTaskById, getTasks, updateStatus, markTasksCompletion,
};
