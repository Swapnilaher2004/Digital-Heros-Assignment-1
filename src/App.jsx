import React, { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ProgressTracker from './components/ProgressTracker'
import AIGenerateButton from './components/AIGenerateButton'
import './App.css'

const generateId = () => `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const STORAGE_KEY = 'ai_study_planner_tasks'
const THEME_KEY = 'ai_study_planner_theme'

const loadTasks = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const loadTheme = () => {
    try {
        return localStorage.getItem(THEME_KEY) || 'light'
    } catch {
        return 'light'
    }
}

function App() {
    const [tasks, setTasks] = useState(loadTasks)
    const [theme, setTheme] = useState(loadTheme)
    const [editingTask, setEditingTask] = useState(null)
    const [filterCategory, setFilterCategory] = useState('All')
    const [filterPriority, setFilterPriority] = useState('All')
    const [toast, setToast] = useState(null)

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    // Persist tasks
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }, [tasks])

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }, [])

    const handleAddTask = useCallback((taskData) => {
        const newTask = {
            ...taskData,
            id: generateId(),
            completed: false,
            createdAt: new Date().toISOString(),
        }
        setTasks(prev => [newTask, ...prev])
        showToast('✅ Task added successfully!')
    }, [showToast])

    const handleUpdateTask = useCallback((updatedTask) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t))
        setEditingTask(null)
        showToast('✏️ Task updated!')
    }, [showToast])

    const handleDeleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id))
        showToast('🗑 Task deleted', 'danger')
    }, [showToast])

    const handleToggleComplete = useCallback((id) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ))
    }, [])

    const handleAIGenerate = useCallback((newTasks) => {
        const tasksWithIds = newTasks.map(t => ({
            ...t,
            id: generateId(),
            completed: false,
            createdAt: new Date().toISOString(),
        }))
        setTasks(prev => [...tasksWithIds, ...prev])
        showToast('✨ AI generated 5 study tasks!')
    }, [showToast])

    const handleToggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }, [])

    const completedCount = tasks.filter(t => t.completed).length

    return (
        <div className="app-wrapper">
            {/* Background gradient overlay */}
            <div className="app-bg-gradient" aria-hidden="true" />

            {/* Header */}
            <Header
                theme={theme}
                onToggleTheme={handleToggleTheme}
                taskCount={tasks.length}
                completedCount={completedCount}
            />

            {/* Toast notification */}
            {toast && (
                <div className={`toast toast--${toast.type}`}>
                    {toast.message}
                </div>
            )}

            {/* Main content */}
            <main className="main-container">
                {/* Top section: AI button + progress */}
                <section className="top-section">
                    <div className="ai-section">
                        <div className="section-label">
                            <span className="section-label__dot" />
                            AI-Powered
                        </div>
                        <AIGenerateButton onGenerate={handleAIGenerate} />
                    </div>

                    <ProgressTracker tasks={tasks} />
                </section>

                {/* Task form */}
                <section className="form-section">
                    <TaskForm
                        onAddTask={handleAddTask}
                        editingTask={editingTask}
                        onUpdateTask={handleUpdateTask}
                        onCancelEdit={() => setEditingTask(null)}
                    />
                </section>

                {/* Task list */}
                <section className="list-section">
                    <TaskList
                        tasks={tasks}
                        onDelete={handleDeleteTask}
                        onEdit={setEditingTask}
                        onToggleComplete={handleToggleComplete}
                        filterCategory={filterCategory}
                        filterPriority={filterPriority}
                        onFilterCategory={setFilterCategory}
                        onFilterPriority={setFilterPriority}
                    />
                </section>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <p>AI Study Planner &copy; 2025 &mdash; Built with React + Vite ⚡</p>
            </footer>
        </div>
    )
}

export default App
