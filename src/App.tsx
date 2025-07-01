import React from 'react';
import { TaskProvider } from './context/TaskContext';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app-wrapper">
        <header className="app-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="logo-container">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" className="logo-svg">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="brand-text">
                  <h1 className="app-title">AgileFlow Pro</h1>
                  <p className="app-subtitle">Smart Task Planning for Productive Teams</p>
                </div>
              </div>
            </div>

            <div className="header-actions">
              <div className="user-profile">
                <div className="user-avatar">
                  <span>H</span>
                </div>
                <div className="user-info">
                  <span className="user-name">Harshita</span>
                </div>
              </div>

              <div className="header-controls">

              </div>
            </div>
          </div>


        </header>

        <main className="app-main">
          <div className="main-container">
            <KanbanBoard />
          </div>
        </main>

        <div className="app-background">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          <div className="bg-pattern"></div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;