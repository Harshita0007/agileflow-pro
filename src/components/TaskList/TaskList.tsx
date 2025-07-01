import React, { useMemo } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList: React.FC = () => {
    const { state } = useTaskContext();
    const { tasks, filters, loading, error } = state;

    const filteredTasks = useMemo(() => {
        return tasks.filter((task: Task) => {
            const search = filters.search?.toLowerCase() || '';

            const matchesSearch = !search || (
                task.title.toLowerCase().includes(search) ||
                task.description?.toLowerCase().includes(search) ||
                task.assignee.toLowerCase().includes(search) ||
                task.tags?.some(tag => tag.toLowerCase().includes(search))
            );
            if (!matchesSearch) return false;

            if (filters.priority && task.priority !== filters.priority) return false;
            if (filters.status && task.status !== filters.status) return false;

            if (filters.dueDateFrom || filters.dueDateTo) {
                if (!task.dueDate) return false;
                const due = new Date(task.dueDate);
                if (filters.dueDateFrom && due < new Date(filters.dueDateFrom)) return false;
                if (filters.dueDateTo && due > new Date(filters.dueDateTo)) return false;
            }

            return true;
        });
    }, [tasks, filters]);

    const sortedTasks = useMemo(() => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return [...filteredTasks].sort((a, b) => {
            const prioDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (prioDiff !== 0) return prioDiff;

            const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return aDate - bDate || a.title.localeCompare(b.title);
        });
    }, [filteredTasks]);

    const countByStatus = (status: Task['status']) =>
        tasks.filter(t => t.status === status).length;

    return (
        <div className={styles.taskListContainer}>
            <div className={styles.taskListHeader}>
                <h2 className={styles.tasksTitle}>📋 Task Overview</h2>
                <p className={styles.taskCount}>
                    {filteredTasks.length !== tasks.length
                        ? `Showing ${filteredTasks.length} of ${tasks.length} tasks`
                        : `${tasks.length} tasks`}
                </p>
            </div>

            {loading ? (
                <div className={styles.stateContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading tasks...</p>
                </div>
            ) : error ? (
                <div className={styles.stateContainer}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h3>Error Loading Tasks</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className={styles.retryBtn}>
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    {sortedTasks.length === 0 ? (
                        <div className={styles.stateContainer}>
                            {tasks.length === 0 ? (
                                <>
                                    <div className={styles.emptyIcon}>📝</div>
                                    <h3>No tasks created</h3>
                                    <p>Start by creating a new task.</p>
                                </>
                            ) : (
                                <>
                                    <div className={styles.emptyIcon}>🔍</div>
                                    <h3>No matching tasks</h3>
                                    <p>Try adjusting filters or search.</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className={styles.tasksGrid}>
                            {sortedTasks.map(task => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    )}

                    <div className={styles.taskSummary}>
                        <div className={styles.summaryStats}>
                            <div className={styles.statItem}>
                                <span>Total</span>
                                <strong>{tasks.length}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <span>To Do</span>
                                <strong>{countByStatus('todo')}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <span>In Progress</span>
                                <strong>{countByStatus('in-progress')}</strong>
                            </div>
                            <div className={styles.statItem}>
                                <span>Done</span>
                                <strong>{countByStatus('done')}</strong>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskList;
