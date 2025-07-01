import React from 'react';
import { TaskProvider } from './context/TaskContext';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
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
          <KanbanBoard />
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
