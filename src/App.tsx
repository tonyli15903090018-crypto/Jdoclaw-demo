import { useState, useEffect, type ReactNode } from 'react'
import Login from './components/Login'
import CreateBot from './components/CreateBot'
import MainApp from './components/MainApp'
import Profile from './components/Profile'
import BotDeploy from './components/BotDeploy'
import BottomNav, { type BottomNavTab } from './components/BottomNav'
import DeviceSwitcher from './components/DeviceSwitcher'
import type { UserInfo, DeviceType } from './types'
import './App.css'
import './components/iPhone17Container.css'

type AppStage = 'login' | 'createBot' | 'main'

// iPhone17 容器组件（内联）
const iPhone17Container = ({ children, isDarkMode = false }: { children: ReactNode; isDarkMode?: boolean }) => {
  return (
    <div className="iphone17-wrapper">
      <div className={`iphone17-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="iphone17-notch" />
        <div className="iphone17-screen">
          {children}
        </div>
        <div className="iphone17-indicator" />
      </div>
    </div>
  )
}

function App() {
  const [stage, setStage] = useState<AppStage>('login')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile')
  const [activeBottomTab, setActiveBottomTab] = useState<BottomNavTab>('chat')
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '演示用户',
    email: 'demo@jdoclaw.ai',
    hasJoined: false,      // 第一层：未加入会员
    hasPurchased: false,   // 第二层：未购买沙箱
    apiBalance: 0          // 第三层：无余额
  })

  useEffect(() => {
    localStorage.clear()
    setStage('login')
    setDeviceType('mobile')
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : ''
  }, [isDarkMode])

  useEffect(() => {
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
      botAvatar,
      selectedModel: 'GPT-4'
    }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
    setStage('main')
    setActiveBottomTab('chat')
    localStorage.setItem('app_stage', 'main')
  }

  // 第一层：加入会员 (¥9.9)
  const handleJoinComplete = () => {
    const newUserInfo = { 
      ...userInfo, 
      hasJoined: true
    }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
  }

  // 第二层：购买沙箱套餐
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

  // 第三层：充值 API 余额
  const handleRechargeComplete = (amount: number) => {
    const newUserInfo = { ...userInfo, apiBalance: userInfo.apiBalance + amount }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
  }

  const handleLogout = () => {
    localStorage.clear()
    setStage('login')
    setActiveBottomTab('chat')
    setUserInfo({
      username: '演示用户',
      email: 'demo@jdoclaw.ai',
      hasJoined: false,
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

  const handleBottomTabChange = (tab: BottomNavTab) => {
    setActiveBottomTab(tab)
    localStorage.setItem('active_tab', tab)
  }

  const handleModelChange = (model: string) => {
    const newUserInfo = { ...userInfo, selectedModel: model }
    setUserInfo(newUserInfo)
    localStorage.setItem('user_info', JSON.stringify(newUserInfo))
  }

  const handleOpenProfile = () => {
    setActiveBottomTab('profile')
  }

  const handleRenew = () => {
    // 打开续费modal或跳转到购买页面
    alert('续费功能开发中...')
  }

  // 渲染主内容(login/createBot/main阶段)
  const renderMainContent = () => {
    if (stage === 'main') {
      // main阶段: 根据activeBottomTab和deviceType渲染不同内容
      if (deviceType === 'mobile') {
        // 手机端: 根据底部Tab显示不同页面
        switch (activeBottomTab) {
          case 'chat':
            return (
              <MainApp
                userInfo={userInfo}
                deviceType={deviceType}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                onJoinComplete={handleJoinComplete}
                onPurchaseComplete={handlePurchaseComplete}
                onRechargeComplete={handleRechargeComplete}
                onOpenProfile={handleOpenProfile}
              />
            )
          case 'deploy':
            return (
              <BotDeploy
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                deviceType={deviceType}
              />
            )
          case 'profile':
            return (
              <Profile
                userInfo={userInfo}
                onBack={() => setActiveBottomTab('chat')}
                onRenew={handleRenew}
                onModelChange={handleModelChange}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                deviceType={deviceType}
              />
            )
        }
      } else {
        // 电脑端和车机端: 默认显示聊天,通过按钮跳转
        return (
          <MainApp
            userInfo={userInfo}
            deviceType={deviceType}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onJoinComplete={handleJoinComplete}
            onPurchaseComplete={handlePurchaseComplete}
            onRechargeComplete={handleRechargeComplete}
            onOpenProfile={handleOpenProfile}
          />
        )
      }
    }

    return null
  }

  const renderContent = () => {
    switch (stage) {
      case 'login':
        return <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} deviceType={deviceType} />
      case 'createBot':
        return <CreateBot onComplete={handleCreateBot} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} deviceType={deviceType} />
      case 'main':
        return (
          <>
            {renderMainContent()}
            {/* 底部Tab导航(仅手机端+main阶段) */}
            {deviceType === 'mobile' && (
              <BottomNav
                activeTab={activeBottomTab}
                onTabChange={handleBottomTabChange}
                deviceType={deviceType}
              />
            )}
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <DeviceSwitcher deviceType={deviceType} onDeviceChange={handleDeviceChange} />
      
      {/* 根据设备类型决定是否使用 iPhone 容器 */}
      {deviceType === 'mobile' ? (
        <div className="iphone17-wrapper">
          <div className={`iphone17-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="iphone17-notch" />
            <div className="iphone17-screen">
              {renderContent()}
            </div>
            <div className="iphone17-indicator" />
          </div>
        </div>
      ) : (
        <div className="desktop-content">
          {renderContent()}
        </div>
      )}
    </div>
  )
}

export default App
