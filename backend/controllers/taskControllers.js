const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");
const getTasksController = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).send({
      success: true,
      message: "Successfully retreived tasks",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot get tasks",
      error,
    });
  }
};

const createTaskController = async (req, res) => {
  const { name } = req.body;
  try {
    const task = await new taskModel({
      name,
      completed: false,
    }).save();
    res.status(201).send({
      success: true,
      message: "Successfully created task",
      task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Cannot create task",
      error,
    });
  }
};

const updateTaskController = (req, res) => {};

const markTaskCompleteController = async (req, res) => {
  const { id } = req.body;
  try {
    const task = await taskModel.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Task marked complete successfully",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

const delteTaskController = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await taskModel.findByIdAndDelete(id);
    if (!task) {
      return res.send({
        success: false,
        message: "Task not found",
        task,
      });
    }
    res.status(200).send({
      success: true,
      message: "successfully deleted task",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot delete task",
      error,
    });
  }
};

module.exports = {
  createTaskController,
  updateTaskController,
  markTaskCompleteController,
  delteTaskController,
  getTasksController,
};
