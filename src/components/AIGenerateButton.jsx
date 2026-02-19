import React, { useState } from 'react'
import './AIGenerateButton.css'

const AI_PLAN_TEMPLATES = [
    {
        title: 'Master Binary Search & Variants',
        description: 'Solve 15 binary search problems on LeetCode – standard, rotated array, and answer-based searches.',
        category: 'DSA',
        priority: 'High',
        deadline: '',
    },
    {
        title: 'Build REST API with Express & MongoDB',
        description: 'Create a full CRUD REST API using Express.js, connect to MongoDB Atlas, and test with Postman.',
        category: 'MERN',
        priority: 'High',
        deadline: '',
    },
    {
        title: 'React State Management – Context & Hooks',
        description: 'Build a todo app using useContext, useReducer, and custom hooks. No external state library.',
        category: 'MERN',
        priority: 'Medium',
        deadline: '',
    },
    {
        title: 'SQL Injection & XSS Attack Defense',
        description: 'Study OWASP Top 10 vulnerabilities, practice on DVWA, and implement input sanitization techniques.',
        category: 'Cybersecurity',
        priority: 'High',
        deadline: '',
    },
    {
        title: 'Dynamic Programming Patterns',
        description: 'Learn and solve classic DP problems: knapsack, longest subsequence, coin change, and matrix chain.',
        category: 'DSA',
        priority: 'Medium',
        deadline: '',
    },
    {
        title: 'Network Security Fundamentals',
        description: 'Study TCP/IP, firewalls, VPNs, and practice packet analysis with Wireshark.',
        category: 'Cybersecurity',
        priority: 'Low',
        deadline: '',
    },
    {
        title: 'Graph Algorithms: BFS, DFS & Dijkstra',
        description: 'Implement and practice BFS, DFS, Dijkstra, and A* on LeetCode graph problems.',
        category: 'DSA',
        priority: 'High',
        deadline: '',
    },
    {
        title: 'Full-Stack Authentication with JWT',
        description: 'Implement secure JWT-based auth in a MERN app: signup, login, refresh tokens, and protected routes.',
        category: 'MERN',
        priority: 'Medium',
        deadline: '',
    },
]

const shuffleAndPick = (arr, n) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, n)
}

const AIGenerateButton = ({ onGenerate }) => {
    const [loading, setLoading] = useState(false)
    const [generated, setGenerated] = useState(false)

    const handleGenerate = () => {
        if (loading) return
        setLoading(true)
        setGenerated(false)

        // Simulate AI thinking
        setTimeout(() => {
            const today = new Date()
            const tasks = shuffleAndPick(AI_PLAN_TEMPLATES, 5).map((t, i) => {
                const d = new Date(today)
                d.setDate(d.getDate() + (i + 1) * 3)
                return {
                    ...t,
                    deadline: d.toISOString().split('T')[0],
                }
            })
            onGenerate(tasks)
            setLoading(false)
            setGenerated(true)
            setTimeout(() => setGenerated(false), 3000)
        }, 1800)
    }

    return (
        <div className="ai-generate-wrapper">
            <button
                className={`ai-generate-btn ${loading ? 'ai-generate-btn--loading' : ''} ${generated ? 'ai-generate-btn--success' : ''}`}
                onClick={handleGenerate}
                disabled={loading}
                aria-label="AI Generate Study Plan"
            >
                {loading ? (
                    <>
                        <span className="ai-spinner" />
                        <span>AI is thinking...</span>
                    </>
                ) : generated ? (
                    <>
                        <span className="ai-icon">✅</span>
                        <span>Plan Generated!</span>
                    </>
                ) : (
                    <>
                        <span className="ai-icon">✨</span>
                        <span>AI Generate Study Plan</span>
                        <span className="ai-badge">5 tasks</span>
                    </>
                )}
            </button>
            <p className="ai-subtext">
                {loading
                    ? 'Crafting your personalized study roadmap...'
                    : generated
                        ? '5 new tasks added to your planner!'
                        : 'Instantly generate a personalized study roadmap'}
            </p>
        </div>
    )
}

export default AIGenerateButton
