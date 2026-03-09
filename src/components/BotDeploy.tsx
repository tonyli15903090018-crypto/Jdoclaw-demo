import { useState } from 'react'
import './BotDeploy.css'

interface BotDeployProps {
  isDarkMode: boolean
}

interface DeployedBot {
  id: number
  name: string
  platform: string
  status: 'running' | 'stopped' | 'error'
  uptime: string
  requests: number
  lastActive: string
}

const BotDeploy = ({}: BotDeployProps) => {
  const [activeTab, setActiveTab] = useState<'deployed' | 'deploy'>('deployed')

  const deployedBots: DeployedBot[] = [
    {
      id: 1,
      name: '小美助手',
      platform: '微信公众号',
      status: 'running',
      uptime: '15天',
      requests: 1250,
      lastActive: '2分钟前'
    },
    {
      id: 2,
      name: '智能客服',
      platform: '企业微信',
      status: 'running',
      uptime: '7天',
      requests: 890,
      lastActive: '10分钟前'
    },
    {
      id: 3,
      name: '路书小助手',
      platform: 'Telegram',
      status: 'stopped',
      uptime: '-',
      requests: 0,
      lastActive: '2小时前'
    }
  ]

  const platforms = [
    { id: 'wechat', name: '微信公众号', icon: '💬', available: true },
    { id: 'wework', name: '企业微信', icon: '📱', available: true },
    { id: 'telegram', name: 'Telegram', icon: '✈️', available: true },
    { id: 'discord', name: 'Discord', icon: '🎮', available: true },
    { id: 'slack', name: 'Slack', icon: '💼', available: true },
    { id: 'api', name: 'API 接口', icon: '🔌', available: true }
  ]

  const getStatusColor = (status: DeployedBot['status']) => {
    switch (status) {
      case 'running': return '#27ae60'
      case 'stopped': return '#95a5a6'
      case 'error': return '#e74c3c'
    }
  }

  const getStatusText = (status: DeployedBot['status']) => {
    switch (status) {
      case 'running': return '运行中'
      case 'stopped': return '已停止'
      case 'error': return '错误'
    }
  }

  return (
    <div className="bot-deploy-container">
      <div className="bot-deploy-header">
        <h1>🤖 机器人部署</h1>
        <div className="header-tabs">
          <button
            className={`tab-btn ${activeTab === 'deployed' ? 'active' : ''}`}
            onClick={() => setActiveTab('deployed')}
          >
            已部署
          </button>
          <button
            className={`tab-btn ${activeTab === 'deploy' ? 'active' : ''}`}
            onClick={() => setActiveTab('deploy')}
          >
            新建部署
          </button>
        </div>
      </div>

      {activeTab === 'deployed' ? (
        <div className="deployed-section">
          <div className="deploy-stats">
            <div className="stat-box">
              <span className="stat-icon">🚀</span>
              <div className="stat-content">
                <span className="stat-value">{deployedBots.length}</span>
                <span className="stat-label">部署总数</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">✅</span>
              <div className="stat-content">
                <span className="stat-value">{deployedBots.filter(b => b.status === 'running').length}</span>
                <span className="stat-label">运行中</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">📊</span>
              <div className="stat-content">
                <span className="stat-value">{deployedBots.reduce((sum, b) => sum + b.requests, 0)}</span>
                <span className="stat-label">总请求数</span>
              </div>
            </div>
          </div>

          <div className="bot-list">
            {deployedBots.map(bot => (
              <div key={bot.id} className="bot-card">
                <div className="bot-card-header">
                  <div className="bot-info">
                    <h3>{bot.name}</h3>
                    <span className="bot-platform">{bot.platform}</span>
                  </div>
                  <div 
                    className="bot-status" 
                    style={{ background: getStatusColor(bot.status) }}
                  >
                    {getStatusText(bot.status)}
                  </div>
                </div>

                <div className="bot-metrics">
                  <div className="metric-item">
                    <span className="metric-icon">⏱️</span>
                    <div className="metric-content">
                      <span className="metric-label">运行时长</span>
                      <span className="metric-value">{bot.uptime}</span>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-icon">📈</span>
                    <div className="metric-content">
                      <span className="metric-label">请求总数</span>
                      <span className="metric-value">{bot.requests}</span>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-icon">🕐</span>
                    <div className="metric-content">
                      <span className="metric-label">最后活跃</span>
                      <span className="metric-value">{bot.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="bot-actions">
                  {bot.status === 'running' ? (
                    <button className="action-btn stop">⏸ 停止</button>
                  ) : (
                    <button className="action-btn start">▶️ 启动</button>
                  )}
                  <button className="action-btn config">⚙️ 配置</button>
                  <button className="action-btn logs">📋 日志</button>
                  <button className="action-btn delete">🗑️ 删除</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="deploy-section">
          <div className="deploy-form">
            <h2>选择部署平台</h2>
            <div className="platform-grid">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  className={`platform-card ${!platform.available ? 'disabled' : ''}`}
                  disabled={!platform.available}
                >
                  <span className="platform-icon">{platform.icon}</span>
                  <span className="platform-name">{platform.name}</span>
                  {platform.available ? (
                    <span className="platform-status available">可用</span>
                  ) : (
                    <span className="platform-status unavailable">即将推出</span>
                  )}
                </button>
              ))}
            </div>

            <div className="deploy-guide">
              <h3>📖 部署指南</h3>
              <div className="guide-steps">
                <div className="guide-step">
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <h4>选择平台</h4>
                    <p>从上方选择你要部署的平台</p>
                  </div>
                </div>
                <div className="guide-step">
                  <span className="step-number">2</span>
                  <div className="step-content">
                    <h4>配置参数</h4>
                    <p>填写平台所需的 API Key 和配置信息</p>
                  </div>
                </div>
                <div className="guide-step">
                  <span className="step-number">3</span>
                  <div className="step-content">
                    <h4>一键部署</h4>
                    <p>点击部署按钮，系统自动完成部署</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BotDeploy
