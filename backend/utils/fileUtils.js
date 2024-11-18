const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../tasks.json');

// Load tasks from file
const loadTasks = (tasks) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        tasks.push(...JSON.parse(data));
    } catch (err) {
        console.error('Error loading tasks:', err.message);
    }
};

// Save tasks to file
const saveTasks = (tasks) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log('Tasks saved successfully');
    } catch (err) {
        console.error('Error saving tasks:', err.message);
    }
};

// Find task by ID
const findTaskById = (tasks, id) => tasks.find((task) => task._id === id);

module.exports = {
    loadTasks,
    saveTasks,
    findTaskById,
};
