import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    assignedMember: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'not started',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
      transform(_, ret) {
        const obj = ret;
        delete obj._id;
        return obj;
      },
    },
  },
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
