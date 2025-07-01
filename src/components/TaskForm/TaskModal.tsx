import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../../types/Task';
import './TaskModal.css';
import styles from './TaskForm.module.css';

interface Props {
    onClose: () => void;
    onCreate: (task: Omit<Task, 'id'>) => void;
}

const TaskModal: React.FC<Props> = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState<Omit<Task, 'id' | 'tags'>>({
        title: '',
        assignee: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        description: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        const today = new Date().toISOString().split('T')[0];

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required.';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title must be under 100 characters.';
        }

        if (!formData.assignee.trim()) {
            newErrors.assignee = 'Assignee is required.';
        } else if (formData.assignee.length > 100) {
            newErrors.assignee = 'Assignee must be under 100 characters.';
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required.';
        } else if (formData.dueDate <= today) {
            newErrors.dueDate = 'Due date must be in the future.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onCreate({ ...formData, tags: [] });
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Create New Task</h2>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Title<span className={styles.required}>*</span>
                            </label>
                            <input
                                className={styles.input}
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                            />
                            {errors.title && <p className={styles.error}>{errors.title}</p>}
                        </div>

                        {/* Assignee */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Assignee<span className={styles.required}>*</span>
                            </label>
                            <input
                                className={styles.input}
                                name="assignee"
                                value={formData.assignee}
                                onChange={handleChange}
                                placeholder="Enter assignee name"
                            />
                            {errors.assignee && <p className={styles.error}>{errors.assignee}</p>}
                        </div>

                        {/* Priority */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Priority</label>
                            <select
                                className={styles.select}
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Status</label>
                            <select
                                className={styles.select}
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Due Date<span className={styles.required}>*</span>
                            </label>
                            <input
                                className={styles.input}
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                            {errors.dueDate && <p className={styles.error}>{errors.dueDate}</p>}
                        </div>

                        {/* Description */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                className={styles.textarea}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the task..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitButton}>
                                Add Task
                            </button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
