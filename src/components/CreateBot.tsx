import { useState } from 'react'
import DeviceSwitcher from './DeviceSwitcher'
import type { DeviceType } from '../types'
import './CreateBot.css'

interface CreateBotProps {
  onComplete: (botName: string, botAvatar: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const CreateBot = ({ onComplete, isDarkMode, toggleDarkMode }: CreateBotProps) => {
  const [botName, setBotName] = useState('小智')
  const [selectedAvatar, setSelectedAvatar] = useState('🤖')
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  const avatars = ['🤖', '👨‍💼', '👩‍💼', '🦊', '🐱', '🐶', '🦁', '🐼', '🦄', '🌟', '💎', '🎯']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(botName || '小智', selectedAvatar)
  }

  return (
    <div className={`create-bot-container ${deviceType}`}>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <DeviceSwitcher deviceType={deviceType} onDeviceChange={setDeviceType} />

      <div className="create-bot-card">
        <div className="create-bot-header">
          <h1 className="create-bot-title">创建你的专属 AI 助手</h1>
          <p className="create-bot-subtitle">给它起个名字，选个头像吧</p>
        </div>

        <form onSubmit={handleSubmit} className="create-bot-form">
          <div className="bot-preview">
            <div className="bot-avatar-large">{selectedAvatar}</div>
            <div className="bot-name-preview">{botName || '小智'}</div>
          </div>

          <div className="form-section">
            <label className="form-label">助手名称</label>
            <input
              type="text"
              className="input"
              placeholder="给你的助手起个名字"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              maxLength={10}
            />
            <span className="form-hint">{botName.length}/10</span>
          </div>

          <div className="form-section">
            <label className="form-label">选择头像</label>
            <div className="avatar-grid">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  className={`avatar-option ${selectedAvatar === avatar ? 'active' : ''}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary create-btn">
            创建助手
          </button>
        </form>

        <p className="create-note">
          * 创建后可随时在设置中修改
        </p>
      </div>
    </div>
  )
}

export default CreateBot
