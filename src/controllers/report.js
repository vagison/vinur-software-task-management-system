import createHttpError from 'http-errors';
import { Task } from '../models';
import { errorMessagesConstants } from '../constants';

const get = async (req, res, next) => {
  try {
    const reportPeriodStart = req.query.periodStart;
    const reportPeriodEnd = req.query.periodEnd;
    const { assignedMember } = req.query;

    if ((!reportPeriodStart && !reportPeriodEnd && !assignedMember)) {
      throw createHttpError.UnprocessableEntity(errorMessagesConstants.Report.NoCriteriaProvided);
    }

    if (reportPeriodEnd < reportPeriodStart) {
      throw createHttpError.UnprocessableEntity(errorMessagesConstants.Report.InvalidDateframe);
    }

    const criteria = {};
    const report = {
      periodStart: 'not specified',
      periodEnd: 'not specified',
      assignedMember: 'not specified',
    };

    if (reportPeriodStart) {
      criteria.finishedAt = {
        $gte: new Date(reportPeriodStart),
      };
      report.periodStart = reportPeriodStart;
    }

    if (reportPeriodEnd) {
      criteria.finishedAt = {
        $lte: new Date(reportPeriodEnd),
      };
      report.periodEnd = reportPeriodEnd;
    }

    if (assignedMember) {
      criteria.assignedMember = {
        $eq: assignedMember,
      };
      report.assignedMember = assignedMember;
    }

    const completedTasksCount = await Task.countDocuments({
      ...criteria,
      completed: true,
    });

    report.completedTasks = completedTasksCount;

    const average = await Task.aggregate([
      {
        $match: criteria,
      },
      {
        $addFields: {
          timeDifference: {
            $subtract: ['$finishedAt', '$createdAt'],
          },
        },
      },
      {
        $group: {
          _id: null,
          averageTime: {
            $avg: '$timeDifference',
          },
        },
      },
    ]);

    if (average.length > 0) {
      report.average = {
        averageInSeconds: average[0].averageTime / (1000),
        averageInHours: average[0].averageTime / (1000 * 60 * 60),
      };
    }

    return res.status(200).json({ report });
  } catch (error) {
    next(error);
  }
};

export { get };
