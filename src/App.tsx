import { useState, useEffect } from 'react'
import Login from './components/Login'
import Purchase from './components/Purchase'
import Recharge from './components/Recharge'
import CreateBot from './components/CreateBot'
import MainApp from './components/MainApp'
import type { UserInfo, DeviceType } from './types'
import './App.css'

type AppStage = 'login' | 'purchase' | 'recharge' | 'createBot' | 'main'

function App() {
  const [stage, setStage] = useState<AppStage>('login')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '演示用户',
    email: 'demo@jdoclaw.ai',
    hasPurchased: false,
    apiBalance: 0
  })

  useEffect(() => {
    // 检查本地存储
    const savedStage = localStorage.getItem('app_stage')
    const savedUserInfo = localStorage.getItem('user_info')
    const darkMode = localStorage.getItem('dark_mode') === 'true'
    
    if (savedStage) setStage(savedStage as AppStage)
    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo))
      } catch (e) {
        console.error('Failed to parse user info:', e)
      }
    }
    setIsDarkMode(darkMode)
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])

  const handleLogin = (username: string, email: string) => {
    const newUserInfo = { ...userInfo, username, email }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    setStage('purchase')
    localStorage.setItem('app_stage', 'purchase')
  }

  const handlePurchase = () => {
    const newUserInfo = { ...userInfo, hasPurchased: true }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    setStage('recharge')
    localStorage.setItem('app_stage', 'recharge')
  }

  const handleRecharge = (amount: number) => {
    const newUserInfo = { ...userInfo, apiBalance: userInfo.apiBalance + amount }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    setStage('createBot')
    localStorage.setItem('app_stage', 'createBot')
  }

  const handleCreateBot = (botName: string, botAvatar: string) => {
    const newUserInfo = { ...userInfo, botName, botAvatar }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    setStage('main')
    localStorage.setItem('app_stage', 'main')
  }

  const handleLogout = () => {
    localStorage.clear()
    setStage('login')
    setUserInfo({
      username: '演示用户',
      email: 'demo@jdoclaw.ai',
      hasPurchased: false,
      apiBalance: 0
    })
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('dark_mode', String(newMode))
  }

  return (
    <div className="app">
      {stage === 'login' && (
        <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {stage === 'purchase' && (
        <Purchase onPurchase={handlePurchase} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {stage === 'recharge' && (
        <Recharge onRecharge={handleRecharge} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {stage === 'createBot' && (
        <CreateBot onComplete={handleCreateBot} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {stage === 'main' && (
        <MainApp
          userInfo={userInfo}
          deviceType={deviceType}
          onDeviceChange={setDeviceType}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  )
}

export default App
