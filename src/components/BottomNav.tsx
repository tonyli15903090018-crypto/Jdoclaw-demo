import type { DeviceType } from '../types'
import './BottomNav.css'

export type BottomNavTab = 'chat' | 'deploy' | 'profile'

interface BottomNavProps {
  activeTab: BottomNavTab
  onTabChange: (tab: BottomNavTab) => void
  deviceType: DeviceType
}

const BottomNav = ({ activeTab, onTabChange, deviceType }: BottomNavProps) => {
  // 只在手机端显示
  if (deviceType !== 'mobile') {
    return null
  }

  const tabs = [
    { id: 'chat' as BottomNavTab, label: '聊天', icon: '💬' },
    { id: 'deploy' as BottomNavTab, label: '部署', icon: '🤖' },
    { id: 'profile' as BottomNavTab, label: '我的', icon: '👤' }
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
