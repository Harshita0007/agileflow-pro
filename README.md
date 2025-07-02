# 🧠 AgileFlow Pro

<div align="center">
  
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Deployed](https://img.shields.io/badge/GitHub_Pages-Deployed-green?style=for-the-badge&logo=github&logoColor=white)

### 🚀 A lightweight, modern productivity app designed for small remote teams

_Streamline task management with intuitive Kanban boards, smart filtering, and seamless collaboration_

🔗 **[Live Demo](https://harshita0007.github.io/agileflow-pro)**

---

<div align="center">
  
## 🌟 **LIVE DEMO AVAILABLE** 🌟

### 🚀 **[👉 TRY AGILEFLOW PRO NOW 👈](https://harshita0007.github.io/agileflow-pro)**

<div style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 15px; margin: 20px 0;">

**✨ Experience the full power of AgileFlow Pro in your browser**

🎯 **No signup required** • 📱 **Mobile responsive** • ⚡ **Instant loading**

**Test Features:**
🖱️ Drag & Drop Tasks • 🔍 Smart Search • 📊 Priority Filters • ✏️ Live Editing

</div>

### 📊 **Live Stats**

![GitHub Pages](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge&logo=github-pages)
![Uptime](https://img.shields.io/badge/Uptime-99.9%25-success?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-A+-brightgreen?style=for-the-badge)

</div>

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [🎯 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Core Implementation](#-core-implementation)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

### 📝 **Comprehensive Task Management**

- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks with ease
- 🏷️ **Rich Task Fields** - Title, assignee, description, priority levels, due dates, and status tracking
- ✏️ **Intuitive Editing** - Modal-based editing with real-time validation
- 📋 **Smart Validation** - Client-side form validation with helpful error messages

### 🔍 **Advanced Filtering System**

- 🔎 **Intelligent Search** - Search tasks by title or assignee with debounced input
- 📊 **Priority Filtering** - Filter by priority levels (Low/Medium/High)
- 📅 **Date Range Filtering** - Filter tasks by custom date ranges
- ⛓️ **Combined Filters** - Stack multiple filters for precise task discovery

### 🎨 **Modern Interactive UI**

- 🖱️ **Drag & Drop Kanban** - Smooth task management with `@hello-pangea/dnd`
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ✨ **Smooth Animations** - CSS transitions for enhanced user experience
- 🎯 **Accessibility First** - Built with accessibility best practices

### 🧠 **Robust State Management**

- 📦 **Context API** - Clean, predictable state management
- 💾 **Local Persistence** - Automatic data saving with localStorage
- 🧼 **Performance Optimized** - Memoization and debouncing for smooth interactions
- 🔄 **Real-time Updates** - Instant UI updates across all components

---

## 🎯 Interactive Demo

<div align="center">

### 🌐 **[EXPLORE THE LIVE APPLICATION](https://harshita0007.github.io/agileflow-pro)**

<table>
<tr>
<td align="center" width="50%">
<h4>🎮 What You Can Try</h4>
<ul align="left">
<li>🆕 Create new tasks with validation</li>
<li>🖱️ Drag tasks between columns</li>
<li>🔍 Search and filter in real-time</li>
<li>✏️ Edit tasks with modal forms</li>
<li>📱 Test responsive design</li>
<li>💾 See localStorage persistence</li>
</ul>
</td>
<td align="center" width="50%">
<h4>⚡ Performance Highlights</h4>
<ul align="left">
<li>🚀 Sub-second loading times</li>
<li>📱 Mobile-optimized interface</li>
<li>🎯 Smooth drag-and-drop</li>
<li>🔄 Real-time updates</li>
<li>💡 Debounced search</li>
<li>✨ Smooth animations</li>
</ul>
</td>
</tr>
</table>

**💡 Pro Tip:** _Open the demo in multiple tabs to see localStorage persistence in action!_

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Technology            | Version  | Purpose                                         |
| --------------------- | -------- | ----------------------------------------------- |
| **React**             | 19.1.0   | Component-based UI framework                    |
| **TypeScript**        | 4.9.5    | Static typing and enhanced developer experience |
| **Context API**       | Built-in | Global state management                         |
| **@hello-pangea/dnd** | Latest   | Drag and drop functionality                     |
| **react-window**      | Latest   | Virtualized lists for performance               |
| **date-fns**          | Latest   | Date manipulation utilities                     |
| **Jest + RTL**        | Latest   | Comprehensive testing suite                     |
| **gh-pages**          | Latest   | GitHub Pages deployment                         |

</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/harshita0007/agileflow-pro.git

# Navigate to project directory
cd agileflow-pro

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
npm run test:watch # Run tests in watch mode
npm run deploy     # Deploy to GitHub Pages
```

---

## 📁 Project Structure

```
agileflow-pro/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TaskBoard/
│   │   ├── TaskCard/
│   │   ├── TaskForm/
│   │   └── Filters/
│   ├── contexts/
│   │   └── TaskContext.tsx
│   ├── hooks/
│   │   ├── useTasks.ts
│   │   └── useDebounce.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── package.json
└── README.md
```

---

## 🔧 Core Implementation

### Drag and Drop Handler

```typescript
const onDragEnd = (result: DropResult) => {
  if (!result.destination) return;

  const newTasks = reorderTasks(tasks, result.source, result.destination);
  updateTasks(newTasks);
};
```

### Custom Debounce Hook

```typescript
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

### Form Validation System

```typescript
interface TaskFormData {
  title: string;
  assignee: string;
  description?: string;
  priority: string;
  dueDate: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

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

### Task Context Provider

```typescript
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

### Local Storage Integration

```typescript
useEffect(() => {
  const savedTasks = localStorage.getItem("agileflow-tasks");
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("agileflow-tasks", JSON.stringify(tasks));
}, [tasks]);
```

---

## 🧪 Testing

The project includes comprehensive testing with Jest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- ✅ Component rendering
- ✅ User interactions
- ✅ State management
- ✅ Form validation
- ✅ Drag and drop functionality

---

## 📦 Deployment

### GitHub Pages Deployment

The project is automatically deployed to GitHub Pages:

```bash
# Deploy to GitHub Pages
npm run deploy
```

### Manual Deployment Steps

1. Build the project: `npm run build`
2. Deploy build folder to your hosting service
3. Configure routing for single-page application

---

## 🔮 Future Enhancements

### 🎯 Planned Features

- [ ] **Team Collaboration** - Real-time updates with multiple users
- [ ] **Task Comments** - Discussion threads on tasks
- [ ] **File Attachments** - Upload and manage task-related files
- [ ] **Time Tracking** - Built-in time tracking for tasks
- [ ] **Advanced Analytics** - Task completion metrics and reports
- [ ] **Mobile App** - React Native companion app
- [ ] **Integration APIs** - Connect with Slack, GitHub, etc.
- [ ] **Dark Mode** - Theme switching capability

### 🚀 Technical Improvements

- [ ] **Backend Integration** - RESTful API with database
- [ ] **PWA Features** - Offline functionality
- [ ] **Advanced Caching** - Redis integration
- [ ] **Real-time Sync** - WebSocket implementation

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🧪 Additional test coverage
- 🎨 UI/UX enhancements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- The open-source community for excellent libraries
- Contributors and testers who helped improve this project

---

<div align="center">

**Built with ❤️ by [Harshita](https://github.com/harshita0007)**

⭐ **Star this repo if you found it helpful!**

</div>
