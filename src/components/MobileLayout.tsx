import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import type { SidebarTab } from './Sidebar'
import type { DeviceType } from '../types'
import './MobileLayout.css'

interface MobileLayoutProps {
  children: ReactNode
  activeTab: SidebarTab
  onTabChange: (tab: SidebarTab) => void
  deviceType: DeviceType
}

const MobileLayout = ({ children, activeTab, onTabChange, deviceType }: MobileLayoutProps) => {
  return (
    <div className="mobile-layout">
      <div className="mobile-content">
        {children}
      </div>
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} deviceType={deviceType} />
    </div>
  )
}

export default MobileLayout
