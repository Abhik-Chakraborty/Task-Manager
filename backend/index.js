const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// File path for the task database
const filePath = path.join(__dirname, 'tasks.json');

// Initialize in-memory tasks array
let tasks = [];

// Load tasks from the file into memory
const loadTasks = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        tasks = JSON.parse(data);
    } catch (err) {
        console.error('Error loading tasks:', err.message);
        tasks = [];
    }
};

// Save tasks from memory to the file
const saveTasks = () => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log('Tasks saved successfully');
    } catch (err) {
        console.error('Error saving tasks:', err.message);
    }
};

// Initialize tasks from file on server start
loadTasks();

// Routes

// Get All Tasks
app.get('/tasks', (req, res) => {
    const { status } = req.query;
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
    res.json(filteredTasks);
});

// Create New Task
app.post('/tasks', (req, res) => {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = {
        _id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        title,
        description,
        status: status || 'todo',
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        createdOn: new Date().toISOString(), // Add task creation time
        lastEditedOn: new Date().toISOString(), // Initially, it's the same as createdOn
    };

    tasks.push(task);
    saveTasks();
    res.status(201).json(task); // Respond with the new task
});

// Update Task by ID
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t._id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields
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

    // Update the lastEditedOn field
    task.lastEditedOn = new Date().toISOString();

    saveTasks();
    res.json(task); // Respond with the updated task
});

// Mark Task as Complete
app.patch('/tasks/:id/complete', (req, res) => {
    const task = tasks.find(t => t._id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's status to 'completed'
    task.status = 'completed';
    saveTasks(); // Persist changes to the file
    res.json(task); // Respond with the updated task
});

// Delete Task by ID
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(task => task._id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(index, 1); // Remove the task from memory
    saveTasks(); // Save to file
    res.json({ message: 'Task deleted' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
