import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';

function Filterbar() {
    const { handleFilterClick } = useTaskContext();
    const [activeFilter, setActiveFilter] = useState('all'); // Track the active filter

    const filters = [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Todo', value: 'todo' },
    ];

    const handleClick = (filter) => {
        setActiveFilter(filter); // Update the active filter
        handleFilterClick(filter); // Call the context's filter function
    };

    return (
        <div className="flex justify-center mt-8">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    className={`filter-button font-bold py-2 px-4 ${
                        activeFilter === filter.value
                            ? 'bg-blue-600 text-white' // Active button styles
                            : 'bg-gray-300 text-gray-800 hover:bg-gray-400' // Inactive button styles
                    } ${filter.value === 'all' ? 'rounded-l' : ''} ${
                        filter.value === 'todo' ? 'rounded-r' : ''
                    }`}
                    onClick={() => handleClick(filter.value)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}

export default Filterbar;
