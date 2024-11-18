const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks'); // Import task routes

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use tasks routes
app.use('/tasks', tasksRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

