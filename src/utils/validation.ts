// src/utils/validation.ts
import { TaskFormData } from "../types/Task";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateTask = (
  task: Partial<TaskFormData>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Title validation
  if (!task.title || task.title.trim().length === 0) {
    errors.push({ field: "title", message: "Title is required" });
  } else if (task.title.length > 100) {
    errors.push({
      field: "title",
      message: "Title must be 100 characters or less",
    });
  }

  // Assignee validation
  if (!task.assignee || task.assignee.trim().length === 0) {
    errors.push({ field: "assignee", message: "Assignee is required" });
  } else if (task.assignee.length > 100) {
    errors.push({
      field: "assignee",
      message: "Assignee must be 100 characters or less",
    });
  }

  // Due date validation
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate <= today) {
      errors.push({
        field: "dueDate",
        message: "Due date must be in the future",
      });
    }
  }

  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};
