// src/services/taskService.ts
import { Task } from "../types/Task";

export const fetchTasksFromAPI = async (): Promise<Task[]> => {
  try {
    const res = await fetch("https://dummyjson.com/todos?limit=20");

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    // Optional tag pool
    const tagPool = [
      "urgent",
      "backend",
      "frontend",
      "bug",
      "feature",
      "review",
    ];

    const getRandomTags = () => {
      const count = Math.floor(Math.random() * 3); // 0 to 2 tags
      const shuffled = tagPool.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const transformed: Task[] = data.todos.map((todo: any) => ({
      id: todo.id.toString(),
      title: todo.todo,
      assignee: `User ${todo.userId}`,
      status: todo.completed ? "done" : "todo",
      description: `Task for user ${todo.userId}`,
      priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      tags: getRandomTags(),
    }));

    return transformed;
  } catch (error) {
    console.error("❌ Failed to fetch tasks from API:", error);
    throw new Error("Could not load tasks. Please try again later.");
  }
};
