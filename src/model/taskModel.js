const prisma = require("../config/prisma.js");

const getAllTasks = async () => {
  try {
    return prisma.tasks.findMany();
  } catch (error) {
    throw new Error("Error fetching all tasks: " + error.message);
  }
};

const getTaskById = async (id) => {
  try {
    return prisma.tasks.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    throw new Error("Error fetching task by ID: " + error.message);
  }
};

const createTask = async (task) => {
  try {
    return prisma.tasks.create({
      data: task,
    });
  } catch (error) {
    throw new Error("Error creating task: " + error.message);
  }
};

const updateTask = async (id, task) => {
  try {
    return prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: task,
    });
  } catch (error) {
    throw new Error("Error updating task: " + error.message);
  }
};

const deleteTask = async (id) => {
  try {
    return prisma.tasks.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    throw new Error("Error deleting task: " + error.message);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
