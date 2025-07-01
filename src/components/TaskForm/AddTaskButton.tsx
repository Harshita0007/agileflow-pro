import React from 'react';
import './AddTaskButton.css';

interface Props {
    onClick: () => void;
}

const AddTaskButton: React.FC<Props> = ({ onClick }) => (
    <button className="add-task-btn" onClick={onClick}>
        + Add task
    </button>
);

export default AddTaskButton;
