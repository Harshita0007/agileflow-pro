// src/context/TaskContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Task, TaskFilters } from '../types/Task';
import { taskReducer, initialState, TaskState, TaskAction } from './taskReducer';
import { demoTasks } from '../data/demoTasks';

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

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'SET_TASKS', payload: demoTasks });
    }, []);

    const addTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        };
        dispatch({ type: 'ADD_TASK', payload: newTask });
    };

    const updateTask = (task: Task) => dispatch({ type: 'UPDATE_TASK', payload: task });
    const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });
    const setFilters = (filters: Partial<TaskFilters>) => dispatch({ type: 'SET_FILTERS', payload: filters });
    const clearFilters = () => dispatch({ type: 'CLEAR_FILTERS' });
    const reorderTasks = (sourceIndex: number, destinationIndex: number) =>
        dispatch({ type: 'REORDER_TASKS', payload: { sourceIndex, destinationIndex } });

    // ✅ New: Handle cross-column task move
    const reorderTasksAcrossColumns = (
        source: { droppableId: string; index: number },
        destination: { droppableId: string; index: number }
    ) => {
        dispatch({
            type: 'MOVE_TASK',
            payload: { source, destination }
        });
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
                reorderTasksAcrossColumns
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
