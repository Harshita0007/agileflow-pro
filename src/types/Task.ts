export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
  tags?: string[];
  completed?: boolean;
  userId?: number;
}

export interface TaskFilters {
  priority?: TaskPriority | "";
  status?: TaskStatus | "";
  search?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
}

export interface TaskFormData {
  title: string;
  assignee: string;
  status: TaskStatus;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
}
