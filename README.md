# AgileFlow Pro

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Deployed](https://img.shields.io/badge/GitHub_Pages-Deployed-green?style=for-the-badge&logo=github&logoColor=white)

A task management app built for small remote teams. Drag, drop, filter, and get stuff done.

**[→ Try it live](https://harshita0007.github.io/agileflow-pro)**

---

## What it does

**Task Management**

- Create, edit, and delete tasks
- Drag and drop between columns (To Do → In Progress → Done)
- Set priorities, due dates, and assignees

**Smart Filtering**

- Search by title or person
- Filter by priority level
- Date range filtering
- Combine multiple filters

**Nice touches**

- Everything saves automatically to your browser
- Works on mobile
- Smooth animations and transitions

## Built with

- React 19.1.0 + TypeScript
- Context API for state management
- @hello-pangea/dnd for drag and drop
- localStorage for persistence
- date-fns for date handling

## Quick start

```bash
git clone https://github.com/harshita0007/agileflow-pro.git
cd agileflow-pro
npm install
npm start
```

Open http://localhost:3000 and you're good to go.

## Key code bits

**Drag and drop handler:**

```ts
const onDragEnd = (result: DropResult) => {
  if (!result.destination) return;
  const newTasks = reorderTasks(tasks, result.source, result.destination);
  updateTasks(newTasks);
};
```

**Debounced search hook:**

```ts
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

**Form validation:**

```ts
const validateTask = (data: TaskFormData): ValidationResult => {
  const errors: string[] = [];
  if (!data.title.trim()) errors.push("Title is required");
  if (data.title.length > 100) errors.push("Title too long");
  if (!data.assignee.trim()) errors.push("Assignee is required");
  if (new Date(data.dueDate) <= new Date()) {
    errors.push("Due date must be in the future");
  }
  return { isValid: errors.length === 0, errors };
};
```

**Task context setup:**

```ts
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const actions = {
    addTask: (task: Task) => setTasks([...tasks, task]),
    updateTask: (updated: Task) => {
      setTasks(tasks.map((task) => (task.id === updated.id ? updated : task)));
    },
  };

  return (
    <TaskContext.Provider value={{ tasks, filters, actions }}>
      {children}
    </TaskContext.Provider>
  );
};
```

## Project structure

```
src/
├── components/
│   ├── TaskBoard/     # Main kanban board
│   ├── TaskCard/      # Individual task cards
│   ├── TaskForm/      # Add/edit task modal
│   └── Filters/       # Search and filter controls
├── contexts/
│   └── TaskContext.tsx # Global state management
├── hooks/
│   ├── useTasks.ts    # Task operations hook
│   └── useDebounce.ts # Search debouncing
├── utils/
│   └── validation.ts  # Form validation logic
└── types/
    └── index.ts       # TypeScript definitions
```

## What's next

Some ideas I'm thinking about:

- Real-time collaboration (multiple users)
- Task comments and file attachments
- Time tracking
- Better mobile experience
- Dark mode
- Export to CSV

## Development

```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
npm run deploy   # Deploy to GitHub Pages
```

## Contributing

Found a bug or have an idea? Open an issue or submit a PR. Just keep it simple and well-tested.

---

Built by [Harshita](https://github.com/harshita0007) • [Live Demo](https://harshita0007.github.io/agileflow-pro)
