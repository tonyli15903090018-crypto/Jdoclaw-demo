import { type ReactNode } from 'react'
import './iPhone17Container.css'

interface iPhone17ContainerProps {
  children: ReactNode
  isDarkMode?: boolean
}

const iPhone17Container = ({ children, isDarkMode = false }: iPhone17ContainerProps) => {
  return (
    <div className="iphone17-wrapper">
      <div className={`iphone17-container ${isDarkMode ? 'dark' : 'light'}`}>
        {/* 顶部刘海/Dynamic Island */}
        <div className="iphone17-notch" />
        
        {/* 屏幕内容 */}
        <div className="iphone17-screen">
          {children}
        </div>
        
        {/* 底部指示条 */}
        <div className="iphone17-indicator" />
      </div>
    </div>
  )
}

export default iPhone17Container
