import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, TaskFilters } from '../types/Task';
import { taskReducer, initialState, TaskState, TaskAction } from './taskReducer';
import { fetchTasksFromAPI } from '../types/taskService'; // ✅ Fetch from API

export interface TaskContextType {
    state: TaskState;
    dispatch: React.Dispatch<TaskAction>;
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    setFilters: (filters: Partial<TaskFilters>) => void;
    clearFilters: () => void;
    reorderTasks: (sourceIndex: number, destinationIndex: number) => void;
    reorderTasksAcrossColumns: (
        source: { droppableId: string; index: number },
        destination: { droppableId: string; index: number }
    ) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
    return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const tasksFromAPI = await fetchTasksFromAPI();

                // ✅ Merge localStorage tasks
                const localTasksJSON = localStorage.getItem('localTasks');
                const localTasks: Task[] = localTasksJSON ? JSON.parse(localTasksJSON) : [];

                const combinedTasks = [...tasksFromAPI, ...localTasks];

                dispatch({ type: 'SET_TASKS', payload: combinedTasks });
            } catch (err) {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to load tasks from API' });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchTasks();
    }, []);

    const addTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        };

        // ✅ Persist to localStorage
        const existing = localStorage.getItem('localTasks');
        const parsed = existing ? JSON.parse(existing) : [];
        parsed.push(newTask);
        localStorage.setItem('localTasks', JSON.stringify(parsed));

        dispatch({ type: 'ADD_TASK', payload: newTask });
    };

    const deleteTask = (id: string) => {
        // ✅ Also update localStorage
        const existing = localStorage.getItem('localTasks');
        const parsed: Task[] = existing ? JSON.parse(existing) : [];
        const updated = parsed.filter((task) => task.id !== id);
        localStorage.setItem('localTasks', JSON.stringify(updated));

        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const updateTask = (task: Task) => dispatch({ type: 'UPDATE_TASK', payload: task });
    const setFilters = (filters: Partial<TaskFilters>) => dispatch({ type: 'SET_FILTERS', payload: filters });
    const clearFilters = () => dispatch({ type: 'CLEAR_FILTERS' });
    const reorderTasks = (sourceIndex: number, destinationIndex: number) =>
        dispatch({ type: 'REORDER_TASKS', payload: { sourceIndex, destinationIndex } });

    const reorderTasksAcrossColumns = (
        source: { droppableId: string; index: number },
        destination: { droppableId: string; index: number }
    ) => {
        dispatch({ type: 'MOVE_TASK', payload: { source, destination } });
    };

    return (
        <TaskContext.Provider
            value={{
                state,
                dispatch,
                addTask,
                updateTask,
                deleteTask,
                setFilters,
                clearFilters,
                reorderTasks,
                reorderTasksAcrossColumns,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
