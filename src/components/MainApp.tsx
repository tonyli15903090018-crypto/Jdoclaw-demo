import { useState, useRef, useEffect } from 'react'
import Chat from './Chat'
import Roadbook from './Roadbook'
import Tasks from './Tasks'
import Profile from './Profile'
import BotDeploy from './BotDeploy'
import Sidebar from './Sidebar'
import PaymentModal from './PaymentModal'
import type { UserInfo, DeviceType, Message } from '../types'
import './MainApp.css'

interface MainAppProps {
  userInfo: UserInfo
  deviceType: DeviceType
  onDeviceChange: (device: DeviceType) => void
  onLogout: () => void
  onOpenProfile: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

type ActiveTab = 'chat' | 'roadbook' | 'tasks' | 'profile' | 'botdeploy'

const MainApp = ({ 
  userInfo, 
  deviceType, 
  onDeviceChange, 
  onLogout, 
  onOpenProfile,
  isDarkMode, 
  toggleDarkMode 
}: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasCheckedPayment, setHasCheckedPayment] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `你好${userInfo.username}！我是${userInfo.botName || 'Jdoclaw AI'} 助手，有什么可以帮助你的吗？`,
      sender: 'ai',
      timestamp: new Date()
    }
  ])

  // 首次对话时检查支付状态
  useEffect(() => {
    if (!hasCheckedPayment && messages.length > 1) {
      // 检查是否购买沙箱和充值
      if (!userInfo.hasPurchased || userInfo.apiBalance === 0) {
        setShowPaymentModal(true)
      }
      setHasCheckedPayment(true)
    }
  }, [messages, hasCheckedPayment, userInfo])

  const handleSendMessage = (newMessages: Message[]) => {
    setMessages(newMessages)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            userInfo={userInfo}
            deviceType={deviceType}
            isDarkMode={isDarkMode}
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
            onLogout={onLogout}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )
      case 'botdeploy':
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
        isDarkMode={isDarkMode}
      />
      
      <div className="main-content">
        {renderContent()}
      </div>

      {showPaymentModal && (
        <PaymentModal
          userInfo={userInfo}
          onClose={() => setShowPaymentModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  )
}

export default MainApp
