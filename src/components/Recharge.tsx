import { useState } from 'react'
import DeviceSwitcher from './DeviceSwitcher'
import type { DeviceType } from '../types'
import './Recharge.css'

interface RechargeProps {
  onRecharge: (amount: number) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Recharge = ({ onRecharge, isDarkMode, toggleDarkMode }: RechargeProps) => {
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  const amounts = [50, 100, 200, 500]

  return (
    <div className="recharge-container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <DeviceSwitcher deviceType={deviceType} onDeviceChange={setDeviceType} />
      <div className="recharge-card">
        <div className="recharge-header">
          <h1 className="recharge-title">API 充值</h1>
          <p className="recharge-subtitle">充值后即可开始使用 AI 服务</p>
        </div>

        <div className="balance-display">
          <span className="balance-label">当前余额</span>
          <span className="balance-amount">¥ 0.00</span>
        </div>

        <div className="amount-options">
          {amounts.map(amount => (
            <button
              key={amount}
              className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
              onClick={() => setSelectedAmount(amount)}
            >
              <span className="amount-value">¥{amount}</span>
              {amount === 100 && <span className="amount-badge">推荐</span>}
            </button>
          ))}
        </div>

        <div className="recharge-info">
          <div className="info-item">
            <span className="info-label">充值金额：</span>
            <span className="info-value">¥{selectedAmount}</span>
          </div>
          <div className="info-item">
            <span className="info-label">API 调用次数：</span>
            <span className="info-value">约 {selectedAmount * 10} 次</span>
          </div>
        </div>

        <button
          className="btn btn-primary recharge-btn"
          onClick={() => onRecharge(selectedAmount)}
        >
          确认充值
        </button>

        <p className="recharge-note">
          * 这是演示版本，点击按钮即可获得体验额度
        </p>
      </div>
    </div>
  )
}

export default Recharge
