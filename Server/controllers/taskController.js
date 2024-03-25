const Task = require('../models/Task');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
  try {
    // Use Mongoose or any other database library to fetch tasks from the database
    const username=req.query.user;
    console.log(req.query.user)
    const tasks = await Task.find({username});

    // Send the tasks as a JSON response
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
};



const createTask = async (req, res) => {
  const { title, description, username } = req.body;
  // console.log(title)

  try {
    // Create a new task document
    const newTask = new Task({ title, description, username });
  
    // Save the task document to the database
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error('Task creation failed:', err);
    res.status(500).json({ message: 'Task creation failed', error: err.message });
  }
};
const updateTask = async (req, res) => {
  const taskId = req.params.id; // Get the task ID from the request parameters
  const { title, description } = req.body; // Get the updated task data from the request body

  try {
    // Find the task by its ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task properties
    task.title = title;
    task.description = description;

    // Save the updated task to the database
    await task.save();

    return res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    console.error('Error updating task:', err);
    return res.status(500).json({ message: 'Task update failed' });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id; // Get the task ID from the request parameters

  try {
    // Find the task by its ID
    const task = await Task.findOneAndRemove({ _id: taskId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    return res.status(500).json({ message: 'Task deletion failed' });
  }
};


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
