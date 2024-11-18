import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../Context/TaskContext';

function EditModal({ 
    isOpen, 
    closeModal, 
    taskId, 
    initialTitle = '', 
    initialDescription = '', 
    initialDueDate = '' 
}) {
    const { editTask } = useTaskContext();
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [dueDate, setDueDate] = useState(initialDueDate);

    useEffect(() => {
        if (isOpen) {
            setTitle(initialTitle);
            setDescription(initialDescription);
            setDueDate(initialDueDate);
        }
    }, [isOpen, initialTitle, initialDescription, initialDueDate]);

    const handleSubmit = () => {
        editTask(taskId, title, description, dueDate);
        closeModal();
    };

    return (
        <div
            className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-container bg-white w-full md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg">
                <div className="modal-header flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Edit Task</h3>
                    <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
                        X
                    </button>
                </div>
                <div className="modal-body mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
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
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
