import { useState } from 'react'
import './Recharge.css'

interface RechargeProps {
  onComplete: () => void
  isDarkMode: boolean
  currentBalance: number
}

const Recharge = ({ onComplete, isDarkMode, currentBalance }: RechargeProps) => {
  const [selectedAmount, setSelectedAmount] = useState(100)

  const amounts = [
    { value: 50, label: '¥50', desc: '' },
    { value: 100, label: '¥100', desc: '推荐', popular: true },
    { value: 200, label: '¥200', desc: '' },
    { value: 500, label: '¥500', desc: '' }
  ]

  const handleRecharge = () => {
    // 模拟充值成功
    onComplete()
  }

  return (
    <div className={`recharge-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="recharge-header">
        <h1>API余额充值</h1>
        <div className="current-balance">
          <span>当前余额：</span>
          <span className="balance-amount">¥{currentBalance.toFixed(2)}</span>
        </div>
      </div>

      <div className="recharge-description">
        <p>💡 API调用采用按token计费模式</p>
        <p>不同AI模型的token单价不同，具体价格在模型切换界面查看</p>
        <p className="note">余额永久有效，可跨设备使用</p>
      </div>

      <div className="amount-list">
        {amounts.map((amount) => (
          <div
            key={amount.value}
            className={`amount-card ${selectedAmount === amount.value ? 'selected' : ''} ${
              amount.popular ? 'popular' : ''
            }`}
            onClick={() => setSelectedAmount(amount.value)}
          >
            {amount.popular && <div className="popular-badge">推荐</div>}
            <div className="amount-label">{amount.label}</div>
            {amount.desc && <div className="amount-desc">{amount.desc}</div>}
            <div className="amount-radio">
              {selectedAmount === amount.value && <span className="checkmark">✓</span>}
            </div>
          </div>
        ))}
      </div>

      <button className="recharge-button" onClick={handleRecharge}>
        确认充值 ¥{selectedAmount}
      </button>

      <div className="recharge-footer">
        <p>支付后余额立即到账</p>
        <p>支持微信支付、支付宝</p>
      </div>
    </div>
  )
}

export default Recharge
