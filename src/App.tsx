import { useState, useEffect } from 'react'
import Login from './components/Login'
import CreateBot from './components/CreateBot'
import MainApp from './components/MainApp'
import DeviceSwitcher from './components/DeviceSwitcher'
// @ts-ignore
import iPhone17Container from './components/iPhone17Container'
import type { UserInfo, DeviceType } from './types'
import './App.css'

type AppStage = 'login' | 'createBot' | 'main'

function App() {
  const [stage, setStage] = useState<AppStage>('login')
  const [isDarkMode, setIsDarkMode] = useState(false)
  // 强制设置为 mobile，确保显示 iPhone 容器
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile')
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '演示用户',
    email: 'demo@jdoclaw.ai',
    hasPurchased: false,
    apiBalance: 0
  })

  useEffect(() => {
    // Demo 模式：刷新后清除状态，但保持 mobile 设备类型
    localStorage.clear()
    setStage('login')
    setDeviceType('mobile') // 确保是 mobile
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])

  useEffect(() => {
    // 调试：在控制台打印 deviceType
    console.log('Current deviceType:', deviceType)
  }, [deviceType])

  const handleLogin = (username: string, email: string) => {
    const newUserInfo = { ...userInfo, username, email }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
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
    setStage('main')
    localStorage.setItem('app_stage', 'main')
  }

  const handlePurchaseComplete = (packageType: 'monthly' | 'quarterly' | 'yearly') => {
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
  }

  const handleRechargeComplete = (amount: number) => {
    const newUserInfo = { ...userInfo, apiBalance: userInfo.apiBalance + amount }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
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
    console.log('Changing device to:', device)
    setDeviceType(device)
    localStorage.setItem('device_type', device)
  }

  const renderContent = () => {
    switch (stage) {
      case 'login':
        return <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} deviceType={deviceType} />
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
            onPurchaseComplete={handlePurchaseComplete}
            onRechargeComplete={handleRechargeComplete}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* 设备切换器 - 固定在底部 */}
      <DeviceSwitcher deviceType={deviceType} onDeviceChange={handleDeviceChange} />
      
      {/* 根据设备类型决定是否使用 iPhone 容器 */}
      {deviceType === 'mobile' ? (
        <iPhone17Container isDarkMode={isDarkMode}>
          {renderContent()}
        </iPhone17Container>
      ) : (
        <div className="desktop-content">
          {renderContent()}
        </div>
      )}
    </div>
  )
}

export default App
