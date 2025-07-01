// src/components/KanbanBoard/KanbanColumn.tsx
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types/Task';
import './KanbanBoard.module.css';

interface KanbanColumnProps {
    title: string;
    status: Task['status'];
    tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, status, tasks }) => {
    const getPriorityColor = (priority: Task['priority']): string => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="kanban-column">
            <div className="kanban-column-header">
                <h3>{title}</h3>
                <span className="task-count">{tasks.length}</span>
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`kanban-column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`kanban-task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                    >
                                        <div className="task-card-header">
                                            <h4 className="task-title">{task.title}</h4>
                                            <div
                                                className="priority-indicator"
                                                style={{ backgroundColor: getPriorityColor(task.priority) }}
                                                title={`Priority: ${task.priority}`}
                                            />
                                        </div>

                                        {task.description && (
                                            <p className="task-description">{task.description}</p>
                                        )}

                                        <div className="task-meta">
                                            <div className="task-assignee">
                                                <span>👤 {task.assignee}</span>
                                            </div>

                                            {task.dueDate && (
                                                <div className="task-due-date">
                                                    <span>📅 {formatDate(task.dueDate)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {task.tags && task.tags.length > 0 && (
                                            <div className="task-tags">
                                                {task.tags.map((tag, tagIndex) => (
                                                    <span key={tagIndex} className="task-tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        {tasks.length === 0 && (
                            <div className="empty-column">
                                <p>No tasks in {title.toLowerCase()}</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;