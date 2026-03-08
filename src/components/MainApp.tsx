import { useState, useRef, useEffect } from 'react'
import type { UserInfo, DeviceType, Message } from '../types'
import './MainApp.css'

interface MainAppProps {
  userInfo: UserInfo
  deviceType: DeviceType
  onDeviceChange: (device: DeviceType) => void
  onLogout: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const MainApp = ({ 
  userInfo, 
  deviceType, 
  onDeviceChange, 
  onLogout, 
  isDarkMode, 
  toggleDarkMode 
}: MainAppProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `你好${userInfo.username}！我是${userInfo.botName || 'Jdoclaw AI'} 助手，有什么可以帮助你的吗？`,
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '我已收到你的消息。这是一个演示回复。实际使用时会连接真实的 AI 服务。',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`main-app ${deviceType}`}>
      {/* 顶部导航栏 */}
      <header className="main-header">
        <div className="header-left">
          <h1 className="app-title">Jdoclaw</h1>
        </div>
        
        <div className="header-center">
          <div className="device-switcher">
            <button
              className={`device-btn ${deviceType === 'desktop' ? 'active' : ''}`}
              onClick={() => onDeviceChange('desktop')}
              title="电脑端"
            >
              💻
            </button>
            <button
              className={`device-btn ${deviceType === 'mobile' ? 'active' : ''}`}
              onClick={() => onDeviceChange('mobile')}
              title="手机端"
            >
              📱
            </button>
            <button
              className={`device-btn ${deviceType === 'car' ? 'active' : ''}`}
              onClick={() => onDeviceChange('car')}
              title="车机端"
            >
              🚗
            </button>
          </div>
        </div>

        <div className="header-right">
          <span className="user-name">{userInfo.username}</span>
          <span className="user-balance">¥{userInfo.apiBalance}</span>
          <button className="icon-btn" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn" onClick={onLogout}>
            🚪
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="main-content">
        <div className="chat-area">
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-item ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-avatar">
                  {message.sender === 'user' ? '👤' : (userInfo.botAvatar || '🤖')}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-item ai-message">
                <div className="message-avatar">{userInfo.botAvatar || '🤖'}</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* 底部输入区 */}
      <footer className="main-footer">
        <div className="input-container">
          <textarea
            className="chat-input"
            placeholder="输入消息... (Enter 发送)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}

export default MainApp
