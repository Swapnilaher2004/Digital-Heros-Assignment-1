import React from 'react'
import TaskCard from './TaskCard'
import './TaskList.css'

const TaskList = ({ tasks, onDelete, onEdit, onToggleComplete, filterCategory, filterPriority, onFilterCategory, onFilterPriority }) => {
    const CATEGORIES = ['All', 'DSA', 'MERN', 'Cybersecurity', 'Other']
    const PRIORITIES = ['All', 'High', 'Medium', 'Low']

    const filtered = tasks.filter(t => {
        const catMatch = filterCategory === 'All' || t.category === filterCategory
        const priMatch = filterPriority === 'All' || t.priority === filterPriority
        return catMatch && priMatch
    })

    return (
        <div className="task-list-section">
            {/* Filters */}
            <div className="filters-bar">
                <div className="filter-group">
                    <span className="filter-label">Category:</span>
                    <div className="filter-chips">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`filter-chip ${filterCategory === cat ? 'filter-chip--active' : ''}`}
                                onClick={() => onFilterCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="filter-group">
                    <span className="filter-label">Priority:</span>
                    <div className="filter-chips">
                        {PRIORITIES.map(p => (
                            <button
                                key={p}
                                className={`filter-chip filter-chip--priority filter-chip--priority-${p.toLowerCase()} ${filterPriority === p ? 'filter-chip--active' : ''}`}
                                onClick={() => onFilterPriority(p)}
                            >
                                {p === 'High' ? '🔴' : p === 'Medium' ? '🟡' : p === 'Low' ? '🟢' : '⚡'} {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results info */}
            <div className="list-header">
                <h2 className="list-title">
                    Study Tasks
                    <span className="list-count">{filtered.length}</span>
                </h2>
                {(filterCategory !== 'All' || filterPriority !== 'All') && (
                    <button
                        className="clear-filters-btn"
                        onClick={() => { onFilterCategory('All'); onFilterPriority('All') }}
                    >
                        ✕ Clear filters
                    </button>
                )}
            </div>

            {/* Task Cards */}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state__icon">📭</div>
                    <h3 className="empty-state__title">
                        {tasks.length === 0 ? 'No tasks yet!' : 'No matching tasks'}
                    </h3>
                    <p className="empty-state__text">
                        {tasks.length === 0
                            ? 'Add your first study task above or generate a plan with AI'
                            : 'Try clearing some filters to see more tasks'}
                    </p>
                </div>
            ) : (
                <div className="task-cards-grid">
                    {filtered.map((task, idx) => (
                        <div
                            key={task.id}
                            style={{ animationDelay: `${idx * 60}ms` }}
                        >
                            <TaskCard
                                task={task}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onToggleComplete={onToggleComplete}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TaskList
