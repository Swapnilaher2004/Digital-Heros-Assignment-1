import React from 'react'
import './Header.css'

const Header = ({ theme, onToggleTheme, taskCount, completedCount }) => {
    return (
        <header className="header">
            <div className="header-inner">
                {/* Brand */}
                <div className="header-brand">
                    <div className="brand-icon">
                        <span>🧠</span>
                    </div>
                    <div className="brand-text">
                        <h1 className="brand-title">AI Study Planner</h1>
                        <p className="brand-subtitle">Smart learning, powered by AI</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="header-stats">
                    <div className="stat-chip">
                        <span className="stat-label">Tasks</span>
                        <span className="stat-value">{taskCount}</span>
                    </div>
                    <div className="stat-chip stat-chip--success">
                        <span className="stat-label">Done</span>
                        <span className="stat-value">{completedCount}</span>
                    </div>
                </div>

                {/* Theme Toggle */}
                <button
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    <span className="theme-toggle__track">
                        <span className="theme-toggle__thumb">
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                    </span>
                </button>
            </div>
        </header>
    )
}

export default Header
