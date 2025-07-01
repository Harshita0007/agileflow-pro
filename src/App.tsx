import React from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskFilters from './components/Filters/TaskFilters';
import TaskForm from './components/TaskForm/TaskForm';
import { TaskProvider } from './context/TaskContext';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app-wrapper">
        <header className="app-header">
          <h1 className="app-title">AgileFlow Pro</h1>
          <p className="app-subtitle">Smart Task Planning for Productive Teams</p>
        </header>

        <main className="app-main">
          <TaskForm />
          {/* ✅ Only one TaskFilters component here */}
          <TaskFilters />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
