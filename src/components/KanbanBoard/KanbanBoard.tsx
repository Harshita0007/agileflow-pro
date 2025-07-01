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
    const getPriorityClass = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return 'priorityHigh';
            case 'medium': return 'priorityMedium';
            case 'low': return 'priorityLow';
            default: return '';
        }
    };

    return (
        <div className={`kanbanColumn ${status}Column`}>
            <div className="columnHeader">
                <div className="columnTitle">
                    {title}
                    <span className="columnCount">{tasks.length}</span>
                </div>
                <p className="columnSubtitle">
                    {status === 'todo' ? 'Tasks yet to start' :
                        status === 'in-progress' ? 'Ongoing tasks' : 'Completed tasks'}
                </p>
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`columnContent ${snapshot.isDraggingOver ? 'dragOver' : ''}`}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`taskCard ${snapshot.isDragging ? 'dragging' : ''}`}
                                    >
                                        <div className="taskCardHeader">
                                            <h4 className="taskCardTitle">{task.title}</h4>
                                            <span className={`taskCardPriority ${getPriorityClass(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </div>

                                        {task.description && (
                                            <p className="taskCardDescription">{task.description}</p>
                                        )}

                                        <div className="taskCardFooter">
                                            <span className="taskCardAssignee">👤 {task.assignee}</span>
                                            {task.dueDate && (
                                                <span className={`taskCardDueDate ${new Date(task.dueDate) < new Date() ? 'overdue'
                                                    : new Date(task.dueDate).toDateString() === new Date().toDateString() ? 'dueSoon'
                                                        : ''
                                                    }`}>
                                                    📅 {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        {tasks.length === 0 && (
                            <div className="emptyColumn">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
                                    alt="empty"
                                    className="emptyColumnIcon"
                                />
                                <p className="emptyColumnText">No tasks here yet</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;
