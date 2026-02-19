import React, { useState } from 'react'
import './TaskForm.css'

const CATEGORIES = ['DSA', 'MERN', 'Cybersecurity', 'Other']
const PRIORITIES = ['High', 'Medium', 'Low']

const emptyForm = {
    title: '',
    description: '',
    category: 'DSA',
    priority: 'Medium',
    deadline: '',
}

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
    const [form, setForm] = useState(editingTask || emptyForm)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Sync form when editingTask changes
    React.useEffect(() => {
        setForm(editingTask || emptyForm)
        setErrors({})
    }, [editingTask])

    const validate = () => {
        const errs = {}
        if (!form.title.trim()) errs.title = 'Task title is required'
        return errs
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        setIsSubmitting(true)

        const taskData = {
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
        }

        setTimeout(() => {
            if (editingTask) {
                onUpdateTask({ ...editingTask, ...taskData })
            } else {
                onAddTask(taskData)
                setForm(emptyForm)
            }
            setIsSubmitting(false)
        }, 300)
    }

    const isEdit = !!editingTask

    return (
        <div className={`task-form-card ${isEdit ? 'task-form-card--edit' : ''}`}>
            <div className="task-form-header">
                <div className="task-form-header__icon">{isEdit ? '✏️' : '➕'}</div>
                <h2 className="task-form-title">{isEdit ? 'Edit Task' : 'Add New Task'}</h2>
                {isEdit && (
                    <button className="btn-cancel-edit" onClick={onCancelEdit} title="Cancel editing">
                        ✕
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="task-form" noValidate>
                {/* Title */}
                <div className={`form-group ${errors.title ? 'form-group--error' : ''}`}>
                    <label className="form-label">Task Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Solve 10 LeetCode problems"
                        className="form-input"
                        maxLength={100}
                    />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Optional details about your study task..."
                        className="form-input form-textarea"
                        rows={2}
                        maxLength={300}
                    />
                </div>

                {/* Category & Priority Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <div className="select-wrapper">
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="form-input form-select"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <span className="select-arrow">▾</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Priority</label>
                        <div className="priority-options">
                            {PRIORITIES.map(p => (
                                <label key={p} className={`priority-btn priority-btn--${p.toLowerCase()} ${form.priority === p ? 'priority-btn--active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={p}
                                        checked={form.priority === p}
                                        onChange={handleChange}
                                        hidden
                                    />
                                    {p === 'High' ? '🔴' : p === 'Medium' ? '🟡' : '🟢'} {p}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Deadline */}
                <div className="form-group">
                    <label className="form-label">Deadline (optional)</label>
                    <input
                        type="date"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        className="form-input"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className={`btn-submit ${isSubmitting ? 'btn-submit--loading' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="spinner" />
                    ) : (
                        <>
                            <span>{isEdit ? '💾 Update Task' : '➕ Add Task'}</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default TaskForm
