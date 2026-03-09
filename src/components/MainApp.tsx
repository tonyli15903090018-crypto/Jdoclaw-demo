import { useState } from 'react'
import Chat from './Chat'
import Roadbook from './Roadbook'
import Tasks from './Tasks'
import Profile from './Profile'
import BotDeploy from './BotDeploy'
import Sidebar, { type SidebarTab } from './Sidebar'
import PaymentModal from './PaymentModal'
import type { UserInfo, DeviceType } from '../types'
import './MainApp.css'

interface MainAppProps {
  userInfo: UserInfo
  deviceType: DeviceType
  onLogout: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const MainApp = ({ 
  userInfo, 
  deviceType, 
  onLogout,
  isDarkMode, 
  toggleDarkMode 
}: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('chat')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Chat 组件会在发送消息时检查余额并触发此函数
  const handleBalanceCheck = () => {
    if (!userInfo.hasPurchased || userInfo.apiBalance <= 0) {
      setShowPaymentModal(true)
    }
  }

  const handleGoPurchase = () => {
    // TODO: 跳转到购买页面（这里暂时只关闭弹窗）
    setShowPaymentModal(false)
    alert('请返回购买套餐页面')
  }

  const handleGoRecharge = () => {
    // TODO: 跳转到充值页面（这里暂时只关闭弹窗）
    setShowPaymentModal(false)
    alert('请前往充值页面')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <Chat
            onLogout={onLogout}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            deviceType={deviceType}
            onBalanceCheck={handleBalanceCheck}
          />
        )
      case 'roadbook':
        return <Roadbook isDarkMode={isDarkMode} />
      case 'tasks':
        return <Tasks isDarkMode={isDarkMode} />
      case 'profile':
        return (
          <Profile
            userInfo={userInfo}
            deviceType={deviceType}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onBack={() => setActiveTab('chat')}
            onRenew={handleGoRecharge}
            onModelChange={() => {}}
          />
        )
      case 'botDeploy':
        return <BotDeploy isDarkMode={isDarkMode} />
      default:
        return null
    }
  }

  return (
    <div className={`main-app ${deviceType}`}>
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="main-content">
        {renderContent()}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        hasPurchased={userInfo.hasPurchased}
        apiBalance={userInfo.apiBalance}
        packageType={userInfo.packageName || '未购买'}
        packageExpiry={userInfo.subscriptionExpiry || ''}
        onClose={() => setShowPaymentModal(false)}
        onGoPurchase={handleGoPurchase}
        onGoRecharge={handleGoRecharge}
      />
    </div>
  )
}

export default MainApp
