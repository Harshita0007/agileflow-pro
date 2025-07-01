import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import styles from './TaskFilters.module.css';

type TaskPriority = 'low' | 'medium' | 'high';
type TaskStatus = 'todo' | 'in-progress' | 'done';

const TaskFilters: React.FC = () => {
    const { setFilters, clearFilters } = useTaskContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPriority, setSelectedPriority] = useState<TaskPriority | ''>('');
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus | ''>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleApplyFilters = () => {
        setFilters({
            search: searchTerm,
            priority: selectedPriority,
            status: selectedStatus,
            dueDateFrom: startDate,
            dueDateTo: endDate,
        });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedPriority('');
        setSelectedStatus('');
        setStartDate('');
        setEndDate('');
        clearFilters();
    };

    const hasActiveFilters =
        searchTerm || selectedPriority || selectedStatus || startDate || endDate;

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filtersHeader}>
                <h3 className={styles.filtersTitle}>Filters</h3>
                {hasActiveFilters && (
                    <button onClick={handleClearFilters} className={styles.clearFiltersButton}>
                        Clear All
                    </button>
                )}
            </div>

            <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                    <label htmlFor="search" className={styles.filterLabel}>Search</label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title, assignee..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="priority" className={styles.filterLabel}>Priority</label>
                    <select
                        id="priority"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value as TaskPriority | '')}
                        className={styles.filterSelect}
                    >
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="status" className={styles.filterLabel}>Status</label>
                    <select
                        id="status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as TaskStatus | '')}
                        className={styles.filterSelect}
                    >
                        <option value="">All</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="startDate" className={styles.filterLabel}>Due Date From</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="endDate" className={styles.filterLabel}>Due Date To</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>
            </div>

            <div className={styles.filterActions}>
                <button onClick={handleApplyFilters} className={styles.applyFiltersButton}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default TaskFilters;
