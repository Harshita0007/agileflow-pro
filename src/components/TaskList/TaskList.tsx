// src/components/TaskList/TaskList.tsx
import React, { useMemo } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import './TaskList.module.css';

const TaskList: React.FC = () => {
    const { state } = useTaskContext();
    const { tasks, filters, loading, error } = state;

    const filteredTasks = useMemo(() => {
        return tasks.filter((task: Task) => {
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const matchesSearch =
                    task.title.toLowerCase().includes(searchTerm) ||
                    task.description?.toLowerCase().includes(searchTerm) ||
                    task.assignee.toLowerCase().includes(searchTerm) ||
                    task.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
                if (!matchesSearch) return false;
            }

            if (filters.priority && task.priority !== filters.priority) return false;
            if (filters.status && task.status !== filters.status) return false;

            if (filters.dueDateFrom || filters.dueDateTo) {
                if (!task.dueDate) return false;
                const taskDate = new Date(task.dueDate);

                if (filters.dueDateFrom) {
                    const fromDate = new Date(filters.dueDateFrom);
                    if (taskDate < fromDate) return false;
                }

                if (filters.dueDateTo) {
                    const toDate = new Date(filters.dueDateTo);
                    if (taskDate > toDate) return false;
                }
            }

            return true;
        });
    }, [tasks, filters]);

    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) return priorityDiff;

            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            }
            if (a.dueDate && !b.dueDate) return -1;
            if (!a.dueDate && b.dueDate) return 1;

            return a.title.localeCompare(b.title);
        });
    }, [filteredTasks]);

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h2 className="tasks-title">Tasks</h2>
                <div className="task-count">
                    {filteredTasks.length !== tasks.length ? (
                        <span>Showing {filteredTasks.length} of {tasks.length} tasks</span>
                    ) : (
                        <span>{tasks.length} tasks</span>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading tasks...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>Error Loading Tasks</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="retry-btn"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    {sortedTasks.length === 0 ? (
                        <div className="empty-state">
                            {tasks.length === 0 ? (
                                <>
                                    <div className="empty-icon">📝</div>
                                    <h3>No tasks yet</h3>
                                    <p>Create your first task to get started!</p>
                                </>
                            ) : (
                                <>
                                    <div className="empty-icon">🔍</div>
                                    <h3>No tasks match your filters</h3>
                                    <p>Try adjusting your search criteria.</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="tasks-grid">
                            {sortedTasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    )}

                    <div className="task-summary">
                        <div className="summary-stats">
                            <div className="stat-item">
                                <span className="stat-label">Total:</span>
                                <span className="stat-value">{tasks.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">To Do:</span>
                                <span className="stat-value">
                                    {tasks.filter(t => t.status === 'todo').length}
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">In Progress:</span>
                                <span className="stat-value">
                                    {tasks.filter(t => t.status === 'in-progress').length}
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Done:</span>
                                <span className="stat-value">
                                    {tasks.filter(t => t.status === 'done').length}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskList;