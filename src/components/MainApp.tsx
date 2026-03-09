import { useState } from 'react'
import Chat from './Chat'
import Roadbook from './Roadbook'
import Tasks from './Tasks'
import Profile from './Profile'
import BotDeploy from './BotDeploy'
import Purchase from './Purchase'
import Recharge from './Recharge'
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
  onPurchaseComplete: (packageType: 'monthly' | 'quarterly' | 'yearly') => void
  onRechargeComplete: (amount: number) => void
}

type ViewMode = 'main' | 'purchase' | 'recharge'

const MainApp = ({ 
  userInfo, 
  deviceType, 
  onLogout,
  isDarkMode, 
  toggleDarkMode,
  onPurchaseComplete,
  onRechargeComplete
}: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('chat')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('main')

  // Chat 组件发送消息时检查余额
  const handleBalanceCheck = () => {
    if (!userInfo.hasPurchased || userInfo.apiBalance <= 0) {
      setShowPaymentModal(true)
    }
  }

  const handleGoPurchase = () => {
    setShowPaymentModal(false)
    setViewMode('purchase')
  }

  const handleGoRecharge = () => {
    setShowPaymentModal(false)
    setViewMode('recharge')
  }

  const handlePurchaseComplete = (packageType: 'monthly' | 'quarterly' | 'yearly') => {
    onPurchaseComplete(packageType)
    // 购买后跳转到充值页面
    setViewMode('recharge')
  }

  const handleRechargeComplete = () => {
    onRechargeComplete(100) // 默认充值100元
    // 充值后返回聊天
    setViewMode('main')
    setActiveTab('chat')
  }

  // 如果在购买或充值页面，直接渲染对应页面
  if (viewMode === 'purchase') {
    return (
      <Purchase
        onComplete={handlePurchaseComplete}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    )
  }

  if (viewMode === 'recharge') {
    return (
      <Recharge
        onComplete={handleRechargeComplete}
        isDarkMode={isDarkMode}
        currentBalance={userInfo.apiBalance}
      />
    )
  }

  // 正常的主界面
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
