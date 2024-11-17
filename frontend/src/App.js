import './App.css';
import Filterbar from './components/Filterbar';
import Navbar from './components/Navbar';
import { TaskProvider } from './Context/TaskContext';
import Tasks from "./components/TaskList"

function App() {
    return (
        <>
            <TaskProvider>
                <Navbar />
                <Filterbar />
                <Tasks />
            </TaskProvider>
        </>
    );
}

export default App;