import Joi from "joi";
import Task from "../models/Task.js";


// validation
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  status: Joi.string().valid("pending", "completed"),
});


// CREATE TASK
export const createTask = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) throw { status: 400, message: error.details[0].message };

    const task = await Task.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};


// GET MY TASKS
export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};


// UPDATE TASK
export const updateTask = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) throw { status: 400, message: error.details[0].message };

    const task = await Task.findById(req.params.id);
    if (!task) throw { status: 404, message: "Task not found" };

    // owner check
    if (
      task.userId.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      throw { status: 403, message: "Not allowed" };
    }

    Object.assign(task, req.body);
    await task.save();

    res.json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};


// DELETE TASK
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw { status: 404, message: "Task not found" };

    // admin OR owner
    if (
      task.userId.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      throw { status: 403, message: "Not allowed" };
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (err) {
    next(err);
  }
};