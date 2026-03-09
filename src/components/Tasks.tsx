import { useState } from 'react'
import './Tasks.css'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  tags: string[]
}

interface TasksProps {
  isDarkMode: boolean
}

const Tasks = ({ isDarkMode }: TasksProps) => {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: '完成川藏线路书规划',
      description: '详细规划沿途景点、住宿和加油站',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-03-15',
      tags: ['路书', '自驾']
    },
    {
      id: 2,
      title: '预订海南酒店',
      description: '三亚、海口各3晚酒店预订',
      status: 'pending',
      priority: 'medium',
      dueDate: '2026-03-20',
      tags: ['住宿', '海南']
    },
    {
      id: 3,
      title: '车辆保养检查',
      description: '出发前全面检查车辆状况',
      status: 'completed',
      priority: 'high',
      dueDate: '2026-03-05',
      tags: ['车辆', '维护']
    },
    {
      id: 4,
      title: '准备露营装备',
      description: '帐篷、睡袋、炊具等',
      status: 'pending',
      priority: 'medium',
      dueDate: '2026-03-18',
      tags: ['装备', '露营']
    }
  ])

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'in-progress': return '🔄'
      case 'completed': return '✅'
    }
  }

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'pending': return '待处理'
      case 'in-progress': return '进行中'
      case 'completed': return '已完成'
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return '#27ae60'
      case 'medium': return '#f39c12'
      case 'high': return '#e74c3c'
    }
  }

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === 'pending'),
    inProgress: tasks.filter(t => t.status === 'in-progress'),
    completed: tasks.filter(t => t.status === 'completed')
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>✅ 我的任务</h1>
        <button className="create-task-btn">+ 创建任务</button>
      </div>

      <div className="tasks-stats">
        <div className="stat-item">
          <span className="stat-icon">⏳</span>
          <span className="stat-label">待处理</span>
          <span className="stat-value">{tasksByStatus.pending.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔄</span>
          <span className="stat-label">进行中</span>
          <span className="stat-value">{tasksByStatus.inProgress.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">✅</span>
          <span className="stat-label">已完成</span>
          <span className="stat-value">{tasksByStatus.completed.length}</span>
        </div>
      </div>

      <div className="tasks-board">
        <div className="task-column">
          <h3>⏳ 待处理</h3>
          {tasksByStatus.pending.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h4>{task.title}</h4>
                <div 
                  className="priority-badge" 
                  style={{ background: getPriorityColor(task.priority) }}
                >
                  {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                </div>
              </div>
              <p className="task-desc">{task.description}</p>
              <div className="task-tags">
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="task-tag">{tag}</span>
                ))}
              </div>
              <div className="task-footer">
                <span className="due-date">📅 {task.dueDate}</span>
                <button className="start-btn">开始</button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-column">
          <h3>🔄 进行中</h3>
          {tasksByStatus.inProgress.map(task => (
            <div key={task.id} className="task-card in-progress">
              <div className="task-header">
                <h4>{task.title}</h4>
                <div 
                  className="priority-badge" 
                  style={{ background: getPriorityColor(task.priority) }}
                >
                  {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                </div>
              </div>
              <p className="task-desc">{task.description}</p>
              <div className="task-tags">
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="task-tag">{tag}</span>
                ))}
              </div>
              <div className="task-footer">
                <span className="due-date">📅 {task.dueDate}</span>
                <button className="complete-btn">完成</button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-column">
          <h3>✅ 已完成</h3>
          {tasksByStatus.completed.map(task => (
            <div key={task.id} className="task-card completed">
              <div className="task-header">
                <h4>{task.title}</h4>
                <div 
                  className="priority-badge" 
                  style={{ background: getPriorityColor(task.priority) }}
                >
                  {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                </div>
              </div>
              <p className="task-desc">{task.description}</p>
              <div className="task-tags">
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="task-tag">{tag}</span>
                ))}
              </div>
              <div className="task-footer">
                <span className="due-date">📅 {task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
