const taskModel = require("../model/taskModel.js");

const VALID_STATUSES = ["pendente", "concluido"];

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json({
      status: "success",
      message: "Tasks successfully found",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching task by ID",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({
      status: "error",
      message: "Title and status are required",
    });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid status. Allowed values are: ${VALID_STATUSES.join(
        ", "
      )}`,
    });
  }

  try {
    const task = await taskModel.createTask(req.body);
    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating task",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { title, status } = req.body;

  const task = await taskModel.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  if (!title || !status) {
    return res.status(400).json({
      status: "error",
      message: "Title and status are required",
    });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: `Invalid status. Allowed values are: ${VALID_STATUSES.join(
        ", "
      )}`,
    });
  }

  try {
    const updatedTask = await taskModel.updateTask(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error updating task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const task = await taskModel.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  try {
    await taskModel.deleteTask(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting task",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};