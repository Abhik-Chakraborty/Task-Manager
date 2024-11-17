import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';

function AddTaskModal({ isOpen, closeModal }) {
    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('todo');

    const handleSubmit = () => {
        addTask(title, description, dueDate, status);
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('todo');
        closeModal();
    };

    return (
        <div
            className={`modal ${isOpen ? 'block' : 'hidden'}
         fixed inset-0 z-10 overflow-y-auto`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div
                className="modal-container bg-white
             w-full md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg"
            >
                <div className="modal-header flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Add New Task</h3>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        X
                    </button>
                </div>
                <div className="modal-body mt-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="border rounded w-full py-2
                                           px-3 text-gray-700 
                                          leading-tight focus:outline-none
                                            focus:shadow-outline"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            className="border rounded w-full 
                                          py-2 px-3 text-gray-700 
                                          leading-tight focus:outline-none
                                            focus:shadow-outline"
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="dueDate"
                        >
                            Due Date
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600
                                       text-white font-bold 
                                       py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal;
