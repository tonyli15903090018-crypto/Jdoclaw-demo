import './Sidebar.css'

export type SidebarTab = 'chat' | 'roadbook' | 'tasks' | 'profile' | 'botDeploy'

interface SidebarProps {
  activeTab: SidebarTab
  onTabChange: (tab: SidebarTab) => void
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="sidebar">
      <button
        className={`sidebar-tab ${activeTab === 'chat' ? 'active' : ''}`}
        onClick={() => onTabChange('chat')}
        title="聊天"
      >
        💬
        <span>聊天</span>
      </button>
      <button
        className={`sidebar-tab ${activeTab === 'roadbook' ? 'active' : ''}`}
        onClick={() => onTabChange('roadbook')}
        title="路书"
      >
        🗺️
        <span>路书</span>
      </button>
      <button
        className={`sidebar-tab ${activeTab === 'tasks' ? 'active' : ''}`}
        onClick={() => onTabChange('tasks')}
        title="任务"
      >
        ✅
        <span>任务</span>
      </button>
      <button
        className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
        title="个人中心"
      >
        👤
        <span>个人中心</span>
      </button>
      <button
        className={`sidebar-tab ${activeTab === 'botDeploy' ? 'active' : ''}`}
        onClick={() => onTabChange('botDeploy')}
        title="机器人部署"
      >
        🤖
        <span>机器人部署</span>
      </button>
    </div>
  )
}

export default Sidebar
