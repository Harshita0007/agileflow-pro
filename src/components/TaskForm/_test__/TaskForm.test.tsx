// src/components/TaskForm/__tests__/TaskForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';
import { TaskProvider } from '@/context/TaskContext';

test('shows validation error when required fields are empty', () => {
    render(
        <TaskProvider>
            <TaskForm />
        </TaskProvider>
    );

    const submitButton = screen.getByRole('button', { name: /Add Task/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Assignee is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Due date is required/i)).toBeInTheDocument();
});
