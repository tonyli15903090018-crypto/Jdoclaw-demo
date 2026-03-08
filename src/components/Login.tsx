import { useState } from 'react'
import type { DeviceType } from '../types'
import './Login.css'

interface LoginProps {
  deviceType: DeviceType
  onLogin: (username: string, email: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Login = ({ onLogin, isDarkMode, toggleDarkMode, deviceType }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [phone, setPhone] = useState('138****8888')
  const [code, setCode] = useState('123456')
  const [username, setUsername] = useState('演示用户')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username || '演示用户', phone || '138****8888')
  }

  return (
    <div className={`login-container ${deviceType}`}>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      

      <div className="login-card">
        <div className="login-header">
          <h1 className="brand-name">Jdoclaw</h1>
          <p className="brand-slogan">智能家居 AI 助手</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            登录
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            注册
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                className="input"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="tel"
              className="input"
              placeholder="手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="input"
              placeholder="验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isLogin ? '立即登录' : '立即注册'}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Demo 账号已自动填充，点击按钮即可体验
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
