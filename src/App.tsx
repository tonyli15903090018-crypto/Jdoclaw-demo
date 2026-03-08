import { useState, useEffect } from 'react'
import Login from './components/Login'
import Chat from './components/Chat'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // 检查本地存储的认证状态
    const token = localStorage.getItem('auth_token')
    if (token) {
      setIsAuthenticated(true)
    }

    // 检查暗黑模式偏好
    const darkMode = localStorage.getItem('dark_mode') === 'true'
    setIsDarkMode(darkMode)
  }, [])

  useEffect(() => {
    // 更新 body 类名以应用暗黑模式
    document.body.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])

  const handleLogin = (token: string) => {
    localStorage.setItem('auth_token', token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    setIsAuthenticated(false)
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('dark_mode', String(newMode))
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      ) : (
        <Chat onLogout={handleLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </div>
  )
}

export default App
