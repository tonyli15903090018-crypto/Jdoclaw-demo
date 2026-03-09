import { useState, useEffect } from 'react'
import Login from './components/Login'
import Purchase from './components/Purchase'
import Recharge from './components/Recharge'
import CreateBot from './components/CreateBot'
import MainApp from './components/MainApp'
import DeviceSwitcher from './components/DeviceSwitcher'
// @ts-ignore
import iPhone17Container from './components/iPhone17Container'
import type { UserInfo, DeviceType } from './types'
import './App.css'

type AppStage = 'login' | 'purchase' | 'recharge' | 'createBot' | 'main'

function App() {
  const [stage, setStage] = useState<AppStage>('login')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile')
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '演示用户',
    email: 'demo@jdoclaw.ai',
    hasPurchased: false,
    apiBalance: 0
  })

  useEffect(() => {
    // Demo 模式：刷新后清除所有状态，回到登录页
    const isDemoMode = true // 设为 false 可保留状态
    
    if (isDemoMode) {
      localStorage.clear()
      setStage('login')
      return
    }
    
    // 正常模式：检查本地存储
    const savedStage = localStorage.getItem('app_stage')
    const savedUserInfo = localStorage.getItem('user_info')
    const darkMode = localStorage.getItem('dark_mode') === 'true'
    const savedDeviceType = localStorage.getItem('device_type') as DeviceType
    
    if (savedStage) setStage(savedStage as AppStage)
    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo))
      } catch (e) {
        console.error('Failed to parse user info:', e)
      }
    }
    if (savedDeviceType) setDeviceType(savedDeviceType)
    setIsDarkMode(darkMode)
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])

  const handleLogin = (username: string, email: string) => {
    const newUserInfo = { ...userInfo, username, email }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    // 登录后先购买套餐
    setStage('purchase')
    localStorage.setItem('app_stage', 'purchase')
  }

  const handlePurchase = (packageType: 'monthly' | 'quarterly' | 'yearly') => {
    const expiry = new Date()
    if (packageType === 'monthly') {
      expiry.setMonth(expiry.getMonth() + 1)
    } else if (packageType === 'quarterly') {
      expiry.setMonth(expiry.getMonth() + 3)
    } else {
      expiry.setFullYear(expiry.getFullYear() + 1)
    }
    
    const packageNames = {
      monthly: '月付套餐',
      quarterly: '季付套餐',
      yearly: '年付套餐'
    }
    
    const newUserInfo = { 
      ...userInfo, 
      hasPurchased: true,
      subscriptionPlan: packageType,
      subscriptionExpiry: expiry.toLocaleDateString('zh-CN'),
      packageName: packageNames[packageType]
    }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    // 购买后充值API
    setStage('recharge')
    localStorage.setItem('app_stage', 'recharge')
  }

  const handleRecharge = () => {
    // 模拟充值100元
    const newUserInfo = { ...userInfo, apiBalance: userInfo.apiBalance + 100 }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    // 充值后创建机器人
    setStage('createBot')
    localStorage.setItem('app_stage', 'createBot')
  }

  const handleCreateBot = (botName: string, botAvatar: string) => {
    const newUserInfo = { 
      ...userInfo, 
      botName, 
      botAvatar
    }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    // 创建机器人后进入主界面
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

  const handleDeviceChange = (device: DeviceType) => {
    setDeviceType(device)
    localStorage.setItem('device_type', device)
  }

  const renderContent = () => {
    switch (stage) {
      case 'login':
        return <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} deviceType={deviceType} />
      case 'purchase':
        return <Purchase onComplete={handlePurchase} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      case 'recharge':
        return <Recharge onComplete={handleRecharge} isDarkMode={isDarkMode} currentBalance={userInfo.apiBalance} />
      case 'createBot':
        return <CreateBot onComplete={handleCreateBot} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} deviceType={deviceType} />
      case 'main':
        return (
          <MainApp
            userInfo={userInfo}
            deviceType={deviceType}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* 设备切换器（只在车端和移动端之间切换） */}
      <DeviceSwitcher deviceType={deviceType} onDeviceChange={handleDeviceChange} />
      
      {/* 根据设备类型决定是否使用 iPhone 容器 */}
      {deviceType === 'mobile' ? (
        <iPhone17Container isDarkMode={isDarkMode}>
          {renderContent()}
        </iPhone17Container>
      ) : (
        renderContent()
      )}
    </div>
  )
}

export default App
