import { useState } from 'react'
import Chat from './Chat'
import Roadbook from './Roadbook'
import Tasks from './Tasks'
import Profile from './Profile'
import BotDeploy from './BotDeploy'
import Sidebar, { type SidebarTab } from './Sidebar'
import JoinModal from './JoinModal'
import PurchaseModal from './PurchaseModal'
import RechargeModal from './RechargeModal'
import type { UserInfo, DeviceType } from '../types'
import './MainApp.css'

interface MainAppProps {
  userInfo: UserInfo
  deviceType: DeviceType
  onLogout: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  onJoinComplete: () => void
  onPurchaseComplete: (packageType: 'monthly' | 'quarterly' | 'yearly') => void
  onRechargeComplete: (amount: number) => void
}

type ModalType = null | 'join' | 'purchase' | 'recharge'

const MainApp = ({ 
  userInfo, 
  deviceType, 
  onLogout,
  isDarkMode, 
  toggleDarkMode,
  onJoinComplete,
  onPurchaseComplete,
  onRechargeComplete
}: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('chat')
  const [modalType, setModalType] = useState<ModalType>(null)

  // 三层检查：发送消息时的检查逻辑
  const handleBalanceCheck = () => {
    // 第一层：检查是否加入会员
    if (!userInfo.hasJoined) {
      setModalType('join')
      return
    }
    
    // 第二层：检查是否购买沙箱
    if (!userInfo.hasPurchased) {
      setModalType('purchase')
      return
    }
    
    // 第三层：检查 API 余额
    if (userInfo.apiBalance <= 0) {
      setModalType('recharge')
      return
    }
  }

  // 处理加入会员
  const handleJoinComplete = () => {
    onJoinComplete()
    setModalType(null)
    // 加入后立即弹出购买沙箱弹窗
    setTimeout(() => setModalType('purchase'), 300)
  }

  // 处理购买沙箱
  const handlePurchaseComplete = (packageType: 'monthly' | 'quarterly' | 'yearly') => {
    onPurchaseComplete(packageType)
    setModalType(null)
    // 购买后立即弹出充值弹窗
    setTimeout(() => setModalType('recharge'), 300)
  }

  // 处理充值
  const handleRechargeComplete = (amount: number) => {
    onRechargeComplete(amount)
    setModalType(null)
  }

  // 渲染内容区域
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
      case 'botDeploy':
        return <BotDeploy isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} deviceType={deviceType} />
      case 'profile':
        return (
          <Profile
            userInfo={userInfo}
            deviceType={deviceType}
            isDarkMode={isDarkMode}
            onBack={() => setActiveTab('chat')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`main-app-wrapper ${isDarkMode ? 'dark' : ''} ${deviceType === 'mobile' ? 'mobile' : ''}`}>
      {deviceType === 'mobile' ? (
        <>
          {/* 手机端: content在前, Sidebar在后(底部) */}
          <div className="main-app-content">
            {renderContent()}
          </div>
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} deviceType={deviceType} />
        </>
      ) : (
        <>
          {/* 桌面端/车机端: Sidebar在前(左侧), content在后 */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} deviceType={deviceType} />
          <div className="main-app-content">
            {renderContent()}
          </div>
        </>
      )}
      {/* 三层弹窗 */}
      {modalType === 'join' && (
        <JoinModal
          onJoin={handleJoinComplete}
          onClose={() => setModalType(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {modalType === 'purchase' && (
        <PurchaseModal
          onPurchase={handlePurchaseComplete}
          onClose={() => setModalType(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {modalType === 'recharge' && (
        <RechargeModal
          currentBalance={userInfo.apiBalance}
          onRecharge={handleRechargeComplete}
          onClose={() => setModalType(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  )
}

export default MainApp
