import './App.css';
import Filterbar from './components/Filterbar';
import Navbar from './components/Navbar';
import { TaskProvider } from './Context/TaskContext';
import Tasks from "./components/TaskList";
import TaskDetail from "./components/TaskDetail"; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
    return (
        <TaskProvider>
            <Router>
                <Navbar />
                <Filterbar />
                <Routes>
                    <Route path="/" element={<Tasks />} />

                    <Route path="/task/:id" element={<TaskDetail />} />
                </Routes>
            </Router>
        </TaskProvider>
    );
}

export default App;
