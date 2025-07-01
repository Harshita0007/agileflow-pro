import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../../types/Task';
import './TaskModal.css'; // 👈 Make sure this file exists or style inline

interface Props {
    onClose: () => void;
    onCreate: (task: Omit<Task, 'id'>) => void;
}

const TaskModal: React.FC<Props> = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [status, setStatus] = useState<TaskStatus>('todo');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !assignee || !dueDate) {
            alert('Please fill in all required fields.');
            return;
        }

        onCreate({
            title,
            assignee,
            priority,
            status,
            description,
            dueDate,
        });
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Create New Task</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter assignee name"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <textarea
                        placeholder="Describe the task..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                    <div className="modal-actions">
                        <button type="submit">Add Task</button>
                        <button type="button" onClick={onClose} className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
