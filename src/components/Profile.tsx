import { useState } from 'react'
import type { UserInfo, UsageRecord } from '../types'
import './Profile.css'

interface ProfileProps {
  userInfo: UserInfo
  onBack: () => void
  onRenew: () => void
  onModelChange: (model: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Profile = ({ userInfo, onBack, onRenew, onModelChange, isDarkMode, toggleDarkMode }: ProfileProps) => {
  const [selectedModel, setSelectedModel] = useState(userInfo.selectedModel || 'GPT-4')
  
  const models = ['GPT-4', 'GPT-3.5', 'Claude-3', 'Gemini-Pro']
  
  // 模拟消费记录
  const usageRecords: UsageRecord[] = [
    { id: '1', timestamp: new Date('2026-03-08 16:30'), model: 'GPT-4', tokens: 1250, cost: 0.05, type: '对话' },
    { id: '2', timestamp: new Date('2026-03-08 15:15'), model: 'GPT-4', tokens: 890, cost: 0.04, type: '对话' },
    { id: '3', timestamp: new Date('2026-03-08 14:00'), model: 'GPT-3.5', tokens: 2100, cost: 0.02, type: '对话' },
    { id: '4', timestamp: new Date('2026-03-08 12:30'), model: 'Claude-3', tokens: 1560, cost: 0.06, type: '对话' }
  ]

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    onModelChange(model)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString('zh-CN', { 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const planNames = {
    monthly: '月付套餐',
    quarterly: '季付套餐',
    yearly: '年付套餐'
  }

  return (
    <div className="profile-container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <button className="back-btn" onClick={onBack}>
            ← 返回
          </button>
          <h1 className="profile-title">个人中心</h1>
          <div style={{ width: '48px' }}></div>
        </div>

        {/* 用户信息 */}
        <div className="user-info-section">
          <div className="user-avatar-large">{userInfo.botAvatar || '👤'}</div>
          <h2 className="user-name-large">{userInfo.username}</h2>
          <p className="user-phone">{userInfo.email}</p>
        </div>

        {/* 账户余额 */}
        <div className="balance-section">
          <div className="balance-card">
            <span className="balance-label">API 余额</span>
            <span className="balance-value">¥ {userInfo.apiBalance.toFixed(2)}</span>
          </div>
        </div>

        {/* 订阅信息 */}
        <div className="subscription-section">
          <h3 className="section-title">订阅信息</h3>
          <div className="subscription-card">
            <div className="subscription-item">
              <span className="item-label">当前套餐</span>
              <span className="item-value">{planNames[userInfo.subscriptionPlan || 'yearly']}</span>
            </div>
            <div className="subscription-item">
              <span className="item-label">到期时间</span>
              <span className="item-value">{userInfo.subscriptionExpiry || '2027-03-08'}</span>
            </div>
            <button className="btn btn-primary renew-btn" onClick={onRenew}>
              续费套餐
            </button>
          </div>
        </div>

        {/* 模型选择 */}
        <div className="model-section">
          <h3 className="section-title">AI 模型</h3>
          <div className="model-grid">
            {models.map((model) => (
              <button
                key={model}
                className={`model-card ${selectedModel === model ? 'active' : ''}`}
                onClick={() => handleModelChange(model)}
              >
                <span className="model-name">{model}</span>
                {selectedModel === model && <span className="model-check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 消费记录 */}
        <div className="usage-section">
          <h3 className="section-title">消费记录</h3>
          <div className="usage-list">
            {usageRecords.map((record) => (
              <div key={record.id} className="usage-item">
                <div className="usage-left">
                  <span className="usage-type">{record.type}</span>
                  <span className="usage-model">{record.model}</span>
                  <span className="usage-time">{formatDate(record.timestamp)}</span>
                </div>
                <div className="usage-right">
                  <span className="usage-tokens">{record.tokens} tokens</span>
                  <span className="usage-cost">-¥{record.cost.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
