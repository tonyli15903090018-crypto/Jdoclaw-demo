import type { DeviceType } from '../types'
import './Sidebar.css'

export type SidebarTab = 'chat' | 'roadbook' | 'tasks' | 'profile' | 'botDeploy'

interface SidebarProps {
  activeTab: SidebarTab
  onTabChange: (tab: SidebarTab) => void
  deviceType: DeviceType
}

const Sidebar = ({ activeTab, onTabChange, deviceType }: SidebarProps) => {
  const tabs = [
    { id: 'chat' as SidebarTab, icon: '💬', label: '聊天室' },
    { id: 'roadbook' as SidebarTab, icon: '📖', label: '路书' },
    { id: 'tasks' as SidebarTab, icon: '📅', label: '日程管家' },
    { id: 'botDeploy' as SidebarTab, icon: '🤖', label: '机器人部署' },
    { id: 'profile' as SidebarTab, icon: '👤', label: '我的' }
  ]

  return (
    <div className={`sidebar ${deviceType}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          title={tab.label}
        >
          <span className="sidebar-tab-icon">{tab.icon}</span>
          <span className="sidebar-tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
