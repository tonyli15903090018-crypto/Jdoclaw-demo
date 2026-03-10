import { useState } from 'react'
import './Tasks.css'

interface Task {
  id: number
  title: string
  time?: string
  completed: boolean
}

interface CronTask {
  id: number
  title: string
  schedule: string
  enabled: boolean
}

interface TasksProps {
  isDarkMode: boolean
}

const Tasks = ({}: TasksProps) => {
  // 定时任务数据
  const [cronTasks] = useState<CronTask[]>([
    { id: 1, title: '每日天气播报', schedule: '每天 07:00', enabled: true },
    { id: 2, title: '工作日提醒', schedule: '工作日 09:00', enabled: true },
    { id: 3, title: '晚间总结提醒', schedule: '每天 21:00', enabled: false }
  ])

  // 今日待办
  const [todayTasks] = useState<Task[]>([
    { id: 1, title: '完成川藏线路书规划', time: '14:00', completed: false },
    { id: 2, title: '预订海南酒店', time: '16:00', completed: false },
    { id: 3, title: '准备露营装备', completed: false }
  ])

  // 今日已完成
  const [completedTasks] = useState<Task[]>([
    { id: 1, title: '车辆保养检查', time: '09:00', completed: true },
    { id: 2, title: '购买旅行用品', time: '11:30', completed: true }
  ])

  // 今日锦囊数据(由AI生成)
  const todayTips = {
    weather: '☀️ 今日晴,气温 12-23°C',
    clothing: '👔 建议穿着: 长袖衬衫+薄外套,早晚温差大注意保暖',
    items: '🎒 记得带: 雨伞、水杯、充电宝',
    advice: '💡 今日适合: 外出办事、户外活动。建议下午3点前完成待办任务'
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>📅 日程管家</h1>
      </div>

      {/* 定时任务 */}
      <section className="tasks-section">
        <h2 className="section-title">⏰ 定时任务</h2>
        <div className="cron-tasks-list">
          {cronTasks.map(task => (
            <div key={task.id} className="cron-task-item">
              <div className="cron-task-info">
                <span className="cron-task-title">{task.title}</span>
                <span className="cron-task-schedule">{task.schedule}</span>
              </div>
              <label className="cron-task-toggle">
                <input type="checkbox" checked={task.enabled} readOnly />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
        <p className="section-note">💡 定时任务由小龙虾AI自动管理</p>
      </section>

      {/* 今日锦囊 */}
      <section className="tasks-section">
        <h2 className="section-title">🎁 今日锦囊</h2>
        <div className="daily-tips">
          <div className="tip-item">
            <span className="tip-label">{todayTips.weather}</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">{todayTips.clothing}</span>
          </div>
          <div className="tip-item">
            <span className="tip-label">{todayTips.items}</span>
          </div>
          <div className="tip-item advice">
            <span className="tip-label">{todayTips.advice}</span>
          </div>
        </div>
        <p className="section-note">💡 根据天气和待办智能生成建议</p>
      </section>

      {/* 今日待办 */}
      <section className="tasks-section">
        <h2 className="section-title">📝 今日待办</h2>
        <div className="today-tasks-list">
          {todayTasks.map(task => (
            <div key={task.id} className="today-task-item">
              <label className="task-checkbox">
                <input type="checkbox" checked={task.completed} readOnly />
                <span className="checkbox-mark"></span>
              </label>
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                {task.time && <span className="task-time">{task.time}</span>}
              </div>
            </div>
          ))}
        </div>
        {todayTasks.length === 0 && (
          <p className="empty-state">🎉 今天没有待办事项</p>
        )}
      </section>

      {/* 今日已完成 */}
      <section className="tasks-section">
        <h2 className="section-title">✅ 今日已完成</h2>
        <div className="completed-tasks-list">
          {completedTasks.map(task => (
            <div key={task.id} className="completed-task-item">
              <span className="completed-mark">✓</span>
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                {task.time && <span className="task-time">{task.time}</span>}
              </div>
            </div>
          ))}
        </div>
        {completedTasks.length === 0 && (
          <p className="empty-state">还没有完成的任务</p>
        )}
      </section>
    </div>
  )
}

export default Tasks
