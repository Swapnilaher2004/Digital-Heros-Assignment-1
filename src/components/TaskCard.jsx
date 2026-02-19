import React from 'react'
import './TaskCard.css'

const CATEGORY_EMOJI = {
    DSA: '🧩',
    MERN: '🌐',
    Cybersecurity: '🔐',
    Other: '📚',
}

const formatDeadline = (dateStr) => {
    if (!dateStr) return null
    const d = new Date(dateStr + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diff = Math.floor((d - today) / (1000 * 60 * 60 * 24))

    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    if (diff < 0) return { text: `Overdue by ${Math.abs(diff)}d`, formatted, overdue: true }
    if (diff === 0) return { text: 'Due today!', formatted, urgent: true }
    if (diff === 1) return { text: 'Due tomorrow', formatted, upcoming: true }
    return { text: `${diff}d left`, formatted }
}

const TaskCard = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const catClass = `cat-${task.category.toLowerCase().replace(/\s+/g, '')}`
    const priorityClass = `priority-${task.priority.toLowerCase()}`
    const deadline = formatDeadline(task.deadline)

    return (
        <div className={`task-card ${task.completed ? 'task-card--completed' : ''} ${priorityClass} fade-in-up`}>
            {/* Priority stripe */}
            <div className="task-card__priority-bar" />

            <div className="task-card__body">
                {/* Checkbox + Title Row */}
                <div className="task-card__top">
                    <button
                        className={`task-checkbox ${task.completed ? 'task-checkbox--checked' : ''}`}
                        onClick={() => onToggleComplete(task.id)}
                        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                        {task.completed && <span className="task-checkbox__check">✓</span>}
                    </button>

                    <div className="task-card__content">
                        <h3 className={`task-title ${task.completed ? 'task-title--done' : ''}`}>
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className="task-description">{task.description}</p>
                        )}
                    </div>
                </div>

                {/* Meta row */}
                <div className="task-card__meta">
                    <span className={`cat-badge ${catClass}`}>
                        <span>{CATEGORY_EMOJI[task.category] || '📖'}</span>
                        {task.category}
                    </span>

                    <span className={`priority-badge ${priorityClass}`}>
                        {task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'}
                        {task.priority}
                    </span>

                    {deadline && (
                        <span className={`deadline-badge ${deadline.overdue ? 'deadline-badge--overdue' : deadline.urgent ? 'deadline-badge--urgent' : ''}`}>
                            📅 {deadline.text}
                        </span>
                    )}

                    <span className={`status-badge ${task.completed ? 'status-badge--done' : 'status-badge--pending'}`}>
                        {task.completed ? '✅ Done' : '⏳ In Progress'}
                    </span>
                </div>

                {/* Actions */}
                <div className="task-card__actions">
                    <button
                        className="btn-action btn-edit"
                        onClick={() => onEdit(task)}
                        title="Edit task"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        className="btn-action btn-delete"
                        onClick={() => onDelete(task.id)}
                        title="Delete task"
                    >
                        🗑 Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
