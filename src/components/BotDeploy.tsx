import { useState } from 'react'
import type { DeviceType } from '../types'
import './BotDeploy.css'

interface Channel {
  id: string
  name: string
  icon: string
  status: 'connected' | 'disconnected'
  bindTime?: string
}

interface BotDeployProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  deviceType: DeviceType
}

const BotDeploy = ({ isDarkMode, toggleDarkMode, deviceType }: BotDeployProps) => {
  const [channels] = useState<Channel[]>([
    { id: 'qq', name: 'QQ Bot', icon: '📱', status: 'disconnected' },
    { id: 'feishu', name: '飞书', icon: '🪽', status: 'disconnected' },
    { id: 'wecom', name: '企业微信', icon: '💼', status: 'disconnected' }
  ])

  const handleBind = (channelId: string, channelName: string) => {
    alert(`绑定 ${channelName} 功能开发中...\n\n将打开二维码扫描页面进行授权`)
  }

  const handleUnbind = (channelId: string, channelName: string) => {
    if (confirm(`确定要解绑 ${channelName} 吗?`)) {
      alert(`解绑 ${channelName} 功能开发中...`)
    }
  }

  const getStatusText = (status: string) => {
    return status === 'connected' ? '已连接' : '未绑定'
  }

  const getStatusColor = (status: string) => {
    return status === 'connected' ? '#4caf50' : '#9e9e9e'
  }

  return (
    <div className={`bot-deploy-container ${deviceType}`}>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="bot-deploy-card">
        <div className="deploy-header">
          <h1 className="deploy-title">机器人部署</h1>
        </div>

        <div className="channels-list">
          {channels.map(channel => (
            <div key={channel.id} className="channel-item">
              <div className="channel-info">
                <span className="channel-icon">{channel.icon}</span>
                <span className="channel-name">{channel.name}</span>
                <span 
                  className="channel-status" 
                  style={{ color: getStatusColor(channel.status) }}
                >
                  {getStatusText(channel.status)}
                </span>
              </div>
              
              <div className="channel-actions">
                {channel.status === 'connected' ? (
                  <>
                    <span className="bind-time">绑定时间: {channel.bindTime || '2026-03-08'}</span>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleUnbind(channel.id, channel.name)}
                    >
                      解除绑定
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleBind(channel.id, channel.name)}
                  >
                    立即绑定
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="deploy-guide">
          <h3 className="guide-title">📖 部署指南</h3>
          <div className="guide-content">
            <ol className="guide-steps">
              <li>选择要绑定的渠道(QQ Bot / 飞书 / 企业微信)</li>
              <li>点击"立即绑定"按钮</li>
              <li>使用对应平台扫描二维码完成授权</li>
              <li>授权成功后,你的AI助手即可通过该渠道接收消息</li>
            </ol>
            <div className="guide-note">
              <p>💡 提示: 绑定后,你可以通过对应平台与你的AI助手对话</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BotDeploy
