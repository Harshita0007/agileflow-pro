// src/components/TaskList/__tests__/TaskItem.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from '../TaskItem';
import { Task } from '@/types/Task';

const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    assignee: 'John Doe',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-07-15',
    description: 'A test task description',
    tags: ['urgent'],
};

test('renders TaskItem with correct title and assignee', () => {
    render(<TaskItem task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
});
