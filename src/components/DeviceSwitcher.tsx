import type { DeviceType } from '../types'
import './DeviceSwitcher.css'

interface DeviceSwitcherProps {
  deviceType: DeviceType
  onDeviceChange: (device: DeviceType) => void
}

const DeviceSwitcher = ({ deviceType, onDeviceChange }: DeviceSwitcherProps) => {
  return (
    <div className="device-switcher-fixed">
      <button
        className={`device-btn ${deviceType === 'desktop' ? 'active' : ''}`}
        onClick={() => onDeviceChange('desktop')}
        title="电脑端"
      >
        💻
      </button>
      <button
        className={`device-btn ${deviceType === 'mobile' ? 'active' : ''}`}
        onClick={() => onDeviceChange('mobile')}
        title="手机端"
      >
        📱
      </button>
      <button
        className={`device-btn ${deviceType === 'car' ? 'active' : ''}`}
        onClick={() => onDeviceChange('car')}
        title="车机端"
      >
        🚗
      </button>
    </div>
  )
}

export default DeviceSwitcher
