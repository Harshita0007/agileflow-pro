import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import TaskModal from '../TaskForm/TaskModal';
import TaskFilters from '../Filters/TaskFilters';
import TaskList from '../TaskList/TaskList';

const KanbanBoard: React.FC = () => {
    const { addTask } = useTaskContext();
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {/* Top header with Add Task button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <h2>📋 Task Board</h2>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        backgroundColor: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    + Add Task
                </button>
            </div>

            {/* Filter tasks */}
            <div style={{ padding: '0 1rem' }}>
                <TaskFilters />
            </div>

            {/* Task list section */}
            <div style={{ padding: '1rem' }}>
                <TaskList />
            </div>

            {/* Modal for creating a new task */}
            {showModal && (
                <TaskModal
                    onClose={() => setShowModal(false)}
                    onCreate={(taskData) => {
                        addTask(taskData);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default KanbanBoard;
