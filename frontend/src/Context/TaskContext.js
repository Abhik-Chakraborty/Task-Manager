import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import axios from "axios";

const TaskContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [todoTasks, setTodoTasks] = useState(0);
    const [inProgressTasks, setInProgressTasks] = useState(0);


    useEffect(() => {
        fetchData();
    }, [totalTasks]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tasks`);
            console.log("response.data", response.data)
            setTasks(response.data);
            setFilteredTasks(response.data);
            setTotalTasks(response.data.length);
    
            const completedCount = response.data.filter(
                (task) => task.status === "completed"
            ).length;
    
            const inProgressCount = response.data.filter(
                (task) => task.status === "in-progress"
            ).length;
    
            setCompletedTasks(completedCount);
            setInProgressTasks(inProgressCount); 
            setTodoTasks(response.data.length - completedCount - inProgressCount);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const handleFilterClick = (status) => {
        if (status === "all") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter((task) => task.status === status);
            setFilteredTasks(filtered);
        }
    };

    const addTask = async (title, description, dueDate, status) => {
        try {
            const response = await axios.post(`${apiUrl}/tasks`, {
                title,
                description,
                dueDate,
                status,
            });
            setTasks([...tasks, response.data]);

            if (status === 'completed') {
                setCompletedTasks((prev) => prev + 1);
            } else if (status === 'in-progress') {
                setInProgressTasks((prev) => prev + 1);
            } else {
                setTodoTasks((prev) => prev + 1);
            }

        setTotalTasks((prev) => prev + 1);
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${apiUrl}/tasks/${taskId}`);
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
            setTotalTasks((prev) => prev - 1);
            const completedCount = updatedTasks.filter(
                (task) => task.status === "completed"
            ).length;
            setCompletedTasks(completedCount);
            setTodoTasks(updatedTasks.length - completedCount);
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const editTask = async (taskId, updatedTitle, updatedDescription, updatedDueDate) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, {
                title: updatedTitle,
                description: updatedDescription,
                dueDate: updatedDueDate,
            });
            
    
            // Reload tasks from the backend    
            fetchData();
        } catch (err) {
            console.error('Error editing task:', err);
        }
    };
    

    const updateTaskStatus = async (taskId, status) => {
        try {
            // Determine the correct API endpoint
            const endpoint =
                status === 'completed'
                    ? `${apiUrl}/tasks/${taskId}/complete`
                    : `${apiUrl}/tasks/${taskId}`;
    
            // Use PATCH for completed tasks, PUT for others
            const method = status === 'completed' ? 'patch' : 'put';
            await axios[method](endpoint, { status });
    
            // Update the task in memory
            const updatedTasks = tasks.map((task) =>
                task._id === taskId ? { ...task, status } : task
            );
    
            setTasks(updatedTasks);
    
            // Dynamically reapply filters
            const filtered = updatedTasks.filter((task) => task.status === status);
            setFilteredTasks(filtered);
    
            // Update task counts
            const completedCount = updatedTasks.filter(
                (task) => task.status === 'completed'
            ).length;
            const inProgressCount = updatedTasks.filter(
                (task) => task.status === 'in-progress'
            ).length;
    
            setCompletedTasks(completedCount);
            setInProgressTasks(inProgressCount);
            setTodoTasks(updatedTasks.length - completedCount - inProgressCount);
        } catch (err) {
            console.error('Error updating task status:', err);
        }
    };
    
    

    return (
        <TaskContext.Provider
    value={{
        filteredTasks,
        totalTasks,
        completedTasks,
        todoTasks,
        inProgressTasks, // Add in-progress tasks
        handleFilterClick,
        addTask,
        deleteTask,
        editTask,
        updateTaskStatus,
    }}
>
    {children}
</TaskContext.Provider>
    );
};
