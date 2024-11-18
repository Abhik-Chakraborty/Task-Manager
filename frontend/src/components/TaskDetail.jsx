import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For accessing route parameters and navigation
import axios from 'axios';

function TaskDetail() {
    const { id } = useParams(); // Extract the task ID from the URL
    const navigate = useNavigate(); // For navigation
    const [task, setTask] = useState(null); // Task state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // API base URL

    // Fetch task details when component loads
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${apiUrl}/tasks/${id}`);
                setTask(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching task details:', err);
                setError('Task not found or an error occurred.');
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, apiUrl]);

    // Handle loading state
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return (
            <div className="text-center mt-10">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate('/')} // Redirect to home
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
            <p className="mb-2">
                <strong>Description:</strong> {task.description}
            </p>
            <p className="mb-2">
                <strong>Due Date:</strong>{' '}
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date set'}
            </p>
            <p className="mb-2">
                <strong>Created At:</strong>{' '}
                {task.createdOn ? new Date(task.createdOn).toLocaleString() : 'N/A'}
            </p>
            <p className="mb-2">
                <strong>Updated At:</strong>{' '}
                {task.lastEditedOn ? new Date(task.lastEditedOn).toLocaleString() : 'Never Edited'}
            </p>
            <button
                onClick={() => navigate('/')} // Redirect to the task list
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Go Back
            </button>
        </div>
    );
}

export default TaskDetail;
