import { useState, useEffect } from 'react'
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
  const [hasCheckedPayment, setHasCheckedPayment] = useState(false)

  // 首次进入时检查支付状态
  useEffect(() => {
    if (!hasCheckedPayment) {
      if (!userInfo.hasPurchased || userInfo.apiBalance === 0) {
        setShowPaymentModal(true)
      }
      setHasCheckedPayment(true)
    }
  }, [hasCheckedPayment, userInfo])

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <Chat
            onLogout={onLogout}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            deviceType={deviceType}
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
            onRenew={() => setShowPaymentModal(true)}
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

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          sandboxBalance={userInfo.hasPurchased ? 1 : 0}
          apiBalance={userInfo.apiBalance}
          onClose={() => setShowPaymentModal(false)}
          onRecharge={() => {}}
        />
      )}
    </div>
  )
}

export default MainApp
