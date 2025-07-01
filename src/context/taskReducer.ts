// src/context/taskReducer.ts
import { Task } from "../types/Task";

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: {
    priority: string;
    status: string;
    search: string;
    dueDateFrom: string;
    dueDateTo: string;
  };
}

export type TaskAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_FILTERS"; payload: Partial<TaskState["filters"]> }
  | {
      type: "REORDER_TASKS";
      payload: { sourceIndex: number; destinationIndex: number };
    };

// 🔧 Define reusable initial filters
const initialFilters: TaskState["filters"] = {
  priority: "",
  status: "",
  search: "",
  dueDateFrom: "",
  dueDateTo: "",
};

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filters: initialFilters,
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false, error: null };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: initialFilters,
      };

    case "REORDER_TASKS":
      const { sourceIndex, destinationIndex } = action.payload;
      const newTasks = Array.from(state.tasks);
      const [removed] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(destinationIndex, 0, removed);
      return { ...state, tasks: newTasks };

    default:
      return state;
  }
};
