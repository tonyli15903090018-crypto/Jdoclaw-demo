import { useState } from 'react'
import './Login.css'

interface LoginProps {
  onLogin: (token: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Login = ({ onLogin, isDarkMode, toggleDarkMode }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('demo@homeassistant.ai')
  const [password, setPassword] = useState('demo1234')
  const [username, setUsername] = useState('演示用户')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 保存用户信息到 localStorage
    const userInfo = {
      username: username || '演示用户',
      email: email || 'demo@homeassistant.ai'
    }
    localStorage.setItem('user_info', JSON.stringify(userInfo))
    
    // 直接登录
    const mockToken = `demo_token_${Date.now()}`
    onLogin(mockToken)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setEmail('')
    setPassword('')
    setUsername('')
  }

  return (
    <div className="login-container">
      {/* 暗黑模式切换按钮 */}
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* 左侧装饰面板 */}
      <div className="login-decoration">
        <div className="decoration-content">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <svg className="logo-icon" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
              <path d="M30 50 L45 35 L55 45 L70 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="45" cy="35" r="3" fill="currentColor" />
              <circle cx="55" cy="45" r="3" fill="currentColor" />
              <circle cx="70" cy="30" r="3" fill="currentColor" />
            </svg>
          </div>
          <h1 className="decoration-title">Home AI Assistant</h1>
          <p className="decoration-subtitle">智能家居 · AI 驱动 · 极简设计</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <span>AI 智能对话</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏠</span>
              <span>设备控制</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>实时响应</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧表单面板 */}
      <div className="login-form-panel">
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">{isLogin ? '欢迎回来' : '创建账户'}</h2>
            <p className="form-subtitle">
              {isLogin ? '登录以继续使用' : '注册开始体验'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username" className="form-label">用户名（可选）</label>
                <input
                  id="username"
                  type="text"
                  className="input"
                  placeholder="输入用户名（可选）"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">邮箱（可选）</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="your@email.com（可选）"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">密码（可选）</label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="••••••••（可选）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>记住我</span>
                </label>
                <a href="#" className="forgot-link">忘记密码？</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary submit-btn">
              {isLogin ? '立即登录' : '立即注册'}
            </button>
          </form>

          <div className="form-footer">
            <span className="footer-text">
              {isLogin ? '还没有账户？' : '已有账户？'}
            </span>
            <button onClick={toggleMode} className="toggle-btn">
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
