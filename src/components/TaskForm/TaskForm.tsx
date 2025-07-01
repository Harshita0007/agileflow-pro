import React, { useState } from 'react';
import styles from './TaskForm.module.css';
import { useTaskContext } from '../../context/TaskContext';
import { TaskFormData, TaskPriority, TaskStatus } from '../../types/Task';

const TaskForm: React.FC = () => {
    const { addTask } = useTaskContext();

    const [formData, setFormData] = useState<Omit<TaskFormData, 'tags'>>({
        title: '',
        assignee: '',
        status: 'todo',
        priority: 'medium',
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

        addTask({ ...formData, tags: [] });

        setFormData({
            title: '',
            assignee: '',
            status: 'todo',
            priority: 'medium',
            dueDate: '',
            description: '',
        });
        setErrors({});
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Create New Task</h2>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Title */}
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
                        onClick={() => {
                            setFormData({
                                title: '',
                                assignee: '',
                                status: 'todo',
                                priority: 'medium',
                                dueDate: '',
                                description: '',
                            });
                            setErrors({});
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
