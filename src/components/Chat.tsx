import { useState, useRef, useEffect } from 'react'
import type { DeviceType } from '../types'
import './Chat.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ChatProps {
  onLogout: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  deviceType?: DeviceType
  onBalanceCheck?: () => void
}

const Chat = ({ onLogout, isDarkMode, toggleDarkMode, deviceType = 'mobile', onBalanceCheck }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是你的智能家居助手，有什么可以帮助你的吗？',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState('演示用户')
  const [isVoiceCalling, setIsVoiceCalling] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 从 localStorage 读取用户信息
    const userInfoStr = localStorage.getItem('user_info')
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr)
        setUserName(userInfo.username || '演示用户')
      } catch (e) {
        console.error('Failed to parse user info:', e)
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // 发送消息前检查余额
    if (onBalanceCheck) {
      onBalanceCheck()
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // 模拟 AI 响应
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '我已收到你的消息。这是一个示例回复，实际使用时会连接真实的 AI 服务。',
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

  const handleVoiceCall = () => {
    setIsVoiceCalling(!isVoiceCalling)
  }

  return (
    <div className={`chat-container ${deviceType}`}>
      {/* 顶部导航栏 */}
      <header className="chat-header">
        <div className="header-left">
          <div className="header-logo">
            <div className="status-dot"></div>
            <span className="header-title">AI 助手</span>
          </div>
        </div>
        
        <div className="header-right">
          <span className="user-name">{userName}</span>
          {deviceType === 'car' && (
            <button 
              className={`icon-btn voice-call-btn ${isVoiceCalling ? 'calling' : ''}`}
              onClick={handleVoiceCall} 
              title={isVoiceCalling ? '结束通话' : '语音通话'}
            >
              {isVoiceCalling ? '📞' : '☎️'}
            </button>
          )}
          <button className="icon-btn" onClick={toggleDarkMode} title="切换主题">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn" onClick={onLogout} title="退出登录">
            🚪
          </button>
        </div>
      </header>

      {/* 聊天消息区域 */}
      <main className="chat-messages">
        <div className="messages-wrapper">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? '👤' : '🤖'}
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
              <div className="message-avatar">🤖</div>
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
      </main>

      {/* 底部输入栏 */}
      <footer className="chat-input-area">
        <div className="input-container">
          <button className="icon-btn attach-btn" title="附件">
            📎
          </button>
          
          <textarea
            className="chat-input"
            placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"
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

export default Chat
