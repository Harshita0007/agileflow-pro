// src/hooks/useTasks.ts
import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";

interface DummyJsonTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  const fetchTasks = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const response = await fetch("https://dummyjson.com/todos?limit=20");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform DummyJSON todos to our Task format
      const transformedTasks: Task[] = data.todos.map(
        (todo: DummyJsonTodo) => ({
          id: todo.id.toString(),
          title: todo.todo,
          assignee: `User ${todo.userId}`,
          status: todo.completed ? "done" : ("todo" as const),
          description: `Task assigned to user ${todo.userId}`,
          priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as
            | "low"
            | "medium"
            | "high",
          dueDate: new Date(
            Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
          tags: ["work", "personal", "urgent"][Math.floor(Math.random() * 3)]
            ? [["work", "personal", "urgent"][Math.floor(Math.random() * 3)]]
            : [],
          completed: todo.completed,
          userId: todo.userId,
        })
      );

      dispatch({ type: "SET_TASKS", payload: transformedTasks });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch tasks";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    }
  };

  const createTask = async (taskData: Omit<Task, "id">) => {
    try {
      // Simulate API call
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: taskData.title,
          completed: taskData.status === "done",
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Since DummyJSON doesn't persist data, we'll add it locally
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      dispatch({ type: "ADD_TASK", payload: newTask });
      return newTask;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create task";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: task.title,
          completed: task.status === "done",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch({ type: "UPDATE_TASK", payload: task });
      return task;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update task";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete task";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  useEffect(() => {
    if (state.tasks.length === 0 && !state.loading) {
      fetchTasks();
    }
  }, []);

  return {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
