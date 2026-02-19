import React from 'react'
import './ProgressTracker.css'

const ProgressTracker = ({ tasks }) => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

    const high = tasks.filter(t => t.priority === 'High').length
    const medium = tasks.filter(t => t.priority === 'Medium').length
    const low = tasks.filter(t => t.priority === 'Low').length

    const catCounts = tasks.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + 1
        return acc
    }, {})

    const getEmoji = (pct) => {
        if (pct === 100) return '🏆'
        if (pct >= 75) return '🔥'
        if (pct >= 50) return '💪'
        if (pct >= 25) return '📈'
        return '🚀'
    }

    const getMessage = (pct) => {
        if (pct === 100) return 'All tasks complete! Amazing work!'
        if (pct >= 75) return "You're almost there! Keep going!"
        if (pct >= 50) return 'Halfway through! Great momentum!'
        if (pct >= 25) return "Good start! Keep the pace!"
        return 'Start ticking off those tasks!'
    }

    return (
        <div className="progress-tracker">
            {/* Header + Emoji */}
            <div className="progress-tracker__header">
                <div>
                    <h2 className="progress-tracker__title">Study Progress</h2>
                    <p className="progress-tracker__msg">{getMessage(pct)}</p>
                </div>
                <div className="progress-emoji">{getEmoji(pct)}</div>
            </div>

            {/* Big percentage */}
            <div className="progress-percent">
                <span className="percent-value">{pct}%</span>
                <span className="percent-label">Complete</span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar-track">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    {pct > 10 && <span className="progress-bar-shimmer" />}
                </div>
            </div>

            {/* Stats row */}
            <div className="progress-stats">
                <div className="progress-stat">
                    <span className="progress-stat__value">{total}</span>
                    <span className="progress-stat__label">Total</span>
                </div>
                <div className="progress-stat progress-stat--success">
                    <span className="progress-stat__value">{completed}</span>
                    <span className="progress-stat__label">Done</span>
                </div>
                <div className="progress-stat progress-stat--pending">
                    <span className="progress-stat__value">{total - completed}</span>
                    <span className="progress-stat__label">Remaining</span>
                </div>
            </div>

            {/* Priority distribution */}
            {total > 0 && (
                <div className="priority-dist">
                    <p className="priority-dist__label">Priority Distribution</p>
                    <div className="priority-dist__bars">
                        <div className="priority-dist__item">
                            <span className="priority-dist__dot priority-dist__dot--high" />
                            <span className="priority-dist__name">High</span>
                            <div className="priority-dist__track">
                                <div
                                    className="priority-dist__fill priority-dist__fill--high"
                                    style={{ width: `${total ? (high / total) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="priority-dist__count">{high}</span>
                        </div>
                        <div className="priority-dist__item">
                            <span className="priority-dist__dot priority-dist__dot--medium" />
                            <span className="priority-dist__name">Medium</span>
                            <div className="priority-dist__track">
                                <div
                                    className="priority-dist__fill priority-dist__fill--medium"
                                    style={{ width: `${total ? (medium / total) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="priority-dist__count">{medium}</span>
                        </div>
                        <div className="priority-dist__item">
                            <span className="priority-dist__dot priority-dist__dot--low" />
                            <span className="priority-dist__name">Low</span>
                            <div className="priority-dist__track">
                                <div
                                    className="priority-dist__fill priority-dist__fill--low"
                                    style={{ width: `${total ? (low / total) * 100 : 0}%` }}
                                />
                            </div>
                            <span className="priority-dist__count">{low}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProgressTracker
