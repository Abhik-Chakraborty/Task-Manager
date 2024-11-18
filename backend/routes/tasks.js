const express = require('express');
const router = express.Router();
const { loadTasks, saveTasks, findTaskById } = require('../utils/fileUtils');

let tasks = [];
loadTasks(tasks);

// Get All Tasks
router.get('/', (req, res) => {
    const { status } = req.query;
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
    res.json(filteredTasks);
});

// Get Task by ID
router.get('/:id', (req, res) => {
    const task = findTaskById(tasks, req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Create New Task
router.post('/', (req, res) => {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = {
        _id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        status: status || 'todo',
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        createdOn: new Date().toISOString(),
        lastEditedOn: new Date().toISOString(),
    };

    tasks.push(task);
    saveTasks(tasks);
    res.status(201).json(task);
});

// Update Task by ID
router.put('/:id', (req, res) => {
    const task = findTaskById(tasks, req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.dueDate) {
        const dueDate = new Date(req.body.dueDate);
        if (!isNaN(dueDate.getTime())) {
            task.dueDate = dueDate.toISOString();
        } else {
            return res.status(400).json({ message: 'Invalid due date' });
        }
    }

    task.lastEditedOn = new Date().toISOString();
    saveTasks(tasks);
    res.json(task);
});

// Mark Task as Complete
router.patch('/:id/complete', (req, res) => {
    const task = findTaskById(tasks, req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.status = 'completed';
    saveTasks(tasks);
    res.json(task);
});

// Delete Task by ID
router.delete('/:id', (req, res) => {
    const index = tasks.findIndex(task => task._id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(index, 1);
    saveTasks(tasks);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
