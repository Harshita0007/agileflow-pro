import React, { useMemo, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList: React.FC = () => {
    const { state, updateTask } = useTaskContext();
    const { tasks, filters, loading, error } = state;
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

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

    // Group tasks by status
    const tasksByStatus = useMemo(() => {
        const grouped = {
            'todo': [] as Task[],
            'in-progress': [] as Task[],
            'done': [] as Task[]
        };

        const priorityOrder = { high: 3, medium: 2, low: 1 };

        filteredTasks.forEach(task => {
            if (grouped[task.status]) {
                grouped[task.status].push(task);
            }
        });

        // Sort tasks within each column
        Object.keys(grouped).forEach(status => {
            grouped[status as keyof typeof grouped].sort((a, b) => {
                const prioDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                if (prioDiff !== 0) return prioDiff;

                const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
                const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
                return aDate - bDate || a.title.localeCompare(b.title);
            });
        });

        return grouped;
    }, [filteredTasks]);

    const countByStatus = (status: Task['status']) =>
        tasks.filter(t => t.status === status).length;

    const getColumnTitle = (status: string) => {
        switch (status) {
            case 'todo': return '📝 To Do';
            case 'in-progress': return '🔄 In Progress';
            case 'done': return '✅ Done';
            default: return status;
        }
    };

    const getColumnColor = (status: string) => {
        switch (status) {
            case 'todo': return '#ef4444'; // red
            case 'in-progress': return '#f59e0b'; // amber
            case 'done': return '#10b981'; // emerald
            default: return '#6b7280';
        }
    };

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent, task: Task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
        (e.currentTarget as HTMLElement).style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
        setDraggedTask(null);
        setDragOverColumn(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (e: React.DragEvent, status: string) => {
        e.preventDefault();
        setDragOverColumn(status);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        // Only clear drag over if we're leaving the column container
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOverColumn(null);
        }
    };

    const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
        e.preventDefault();
        setDragOverColumn(null);

        if (draggedTask && draggedTask.status !== newStatus) {
            // Update the task status - create updated task object
            const updatedTask: Task = { ...draggedTask, status: newStatus };
            updateTask(updatedTask);
        }

        setDraggedTask(null);
    };

    // Wrapper component for draggable task items
    const DraggableTaskItem: React.FC<{ task: Task }> = ({ task }) => (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={handleDragEnd}
            className={styles.draggableTask}
        >
            <TaskItem task={task} />
        </div>
    );

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
                    {filteredTasks.length === 0 ? (
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
                        <>
                            {/* Kanban Board Layout with Drag & Drop */}
                            <div className={styles.kanbanBoard}>
                                {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                                    <div
                                        key={status}
                                        className={`${styles.kanbanColumn} ${dragOverColumn === status ? styles.dragOver : ''
                                            }`}
                                        onDragOver={handleDragOver}
                                        onDragEnter={(e) => handleDragEnter(e, status)}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, status as Task['status'])}
                                    >
                                        <div
                                            className={styles.columnHeader}
                                            style={{ borderTopColor: getColumnColor(status) }}
                                        >
                                            <h3 className={styles.columnTitle}>
                                                {getColumnTitle(status)}
                                            </h3>
                                            <span
                                                className={styles.taskCounter}
                                                style={{ backgroundColor: getColumnColor(status) }}
                                            >
                                                {statusTasks.length}
                                            </span>
                                        </div>
                                        <div className={styles.columnTasks}>
                                            {statusTasks.length === 0 ? (
                                                <div className={styles.emptyColumn}>
                                                    <p>Drop tasks here</p>
                                                </div>
                                            ) : (
                                                statusTasks.map(task => (
                                                    <DraggableTaskItem key={task.id} task={task} />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
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