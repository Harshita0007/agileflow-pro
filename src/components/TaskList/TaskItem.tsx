import React, { useState } from 'react';
import { Task } from '../../types/Task';
import { validateTask } from '../../utils/validation';
import { useTaskContext } from '../../context/TaskContext';
import styles from './TaskItem.module.css';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { updateTask, deleteTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<Task>(task);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedTask(task);
    };

    const handleSave = () => {
        const errors = validateTask(editedTask);
        if (errors.length === 0) {
            updateTask(editedTask);
            setIsEditing(false);
        } else {
            alert('Please fix validation errors:\n' + errors.map(e => e.message).join('\n'));
        }
    };

    const handleCancel = () => {
        setEditedTask(task);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id);
        }
    };

    const handleStatusChange = (newStatus: Task['status']) => {
        const updatedTask = { ...task, status: newStatus };
        updateTask(updatedTask);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getPriorityColor = (priority: Task['priority']): string => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const getStatusColor = (status: Task['status']): string => {
        switch (status) {
            case 'todo': return '#6b7280';
            case 'in-progress': return '#3b82f6';
            case 'done': return '#10b981';
            default: return '#6b7280';
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return `Overdue by ${Math.abs(diffDays)} day(s)`;
        } else if (diffDays === 0) {
            return 'Due today';
        } else if (diffDays === 1) {
            return 'Due tomorrow';
        } else {
            return `Due in ${diffDays} day(s)`;
        }
    };

    const isOverdue = (dateString: string): boolean => {
        return new Date(dateString) < new Date();
    };

    if (isEditing) {
        return (
            <div className={`${styles['task-item']} ${styles.editing}`}>
                <div className={styles['task-edit-form']}>
                    <div className={styles['edit-row']}>
                        <input
                            type="text"
                            name="title"
                            value={editedTask.title}
                            onChange={handleInputChange}
                            placeholder="Task title"
                            maxLength={100}
                        />
                        <input
                            type="text"
                            name="assignee"
                            value={editedTask.assignee}
                            onChange={handleInputChange}
                            placeholder="Assignee"
                            maxLength={100}
                        />
                    </div>

                    <div className={styles['edit-row']}>
                        <select
                            name="status"
                            value={editedTask.status}
                            onChange={handleInputChange}
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>

                        <select
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleInputChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <input
                            type="date"
                            name="dueDate"
                            value={editedTask.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <textarea
                        name="description"
                        value={editedTask.description || ''}
                        onChange={handleInputChange}
                        placeholder="Description"
                        rows={2}
                    />

                    <div className={styles['edit-actions']}>
                        <button className={styles.save} onClick={handleSave}>💾 Save</button>
                        <button className={styles.cancel} onClick={handleCancel}>✖ Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['task-item']}>
            <div className={styles['task-header']}>
                <h3>{task.title}</h3>
                <div className={styles.actions}>
                    <button title="Mark as To Do" onClick={() => handleStatusChange('todo')}>🕐</button>
                    <button title="In Progress" onClick={() => handleStatusChange('in-progress')}>⚙️</button>
                    <button title="Mark as Done" onClick={() => handleStatusChange('done')}>✅</button>
                    <button title="Edit Task" onClick={handleEdit}>✏️</button>
                    <button title="Delete Task" onClick={handleDelete}>🗑️</button>
                </div>
            </div>

            <div className={styles['task-meta']}>
                <span className={styles.assignee}>👤 {task.assignee}</span>
                {task.dueDate && (
                    <span
                        className={styles['due-date']}
                        style={{ color: isOverdue(task.dueDate) ? '#dc2626' : '#6b7280' }}
                    >
                        📅 {formatDate(task.dueDate)}
                    </span>
                )}
                <span
                    className={styles.priority}
                    style={{ color: getPriorityColor(task.priority) }}
                >
                    ⬤ {task.priority}
                </span>
                <span
                    className={styles.status}
                    style={{ color: getStatusColor(task.status) }}
                >
                    🏷 {task.status}
                </span>
            </div>

            {task.description && (
                <div className={styles['task-description']}>
                    <button
                        className={styles['expand-toggle']}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Hide details ▲' : 'Show details ▼'}
                    </button>
                    {isExpanded && <p>{task.description}</p>}
                </div>
            )}
        </div>
    );
};

export default TaskItem;
