import { useState } from 'react'
import './PaymentModal.css'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  sandboxBalance: number
  apiBalance: number
  onRecharge: (amount: number) => void
}

const PaymentModal = ({ isOpen, onClose, sandboxBalance, apiBalance, onRecharge }: PaymentModalProps) => {
  const [amount, setAmount] = useState(100)
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat')

  if (!isOpen) return null

  const handleRecharge = () => {
    onRecharge(amount)
    onClose()
  }

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>💰 账户充值</h2>
        
        <div className="balance-section">
          <div className="balance-item">
            <span className="balance-label">🧪 沙箱余额</span>
            <span className="balance-value">¥{sandboxBalance.toFixed(2)}</span>
          </div>
          <div className="balance-item">
            <span className="balance-label">🔑 API 余额</span>
            <span className="balance-value">¥{apiBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="recharge-section">
          <h3>充值金额</h3>
          <div className="amount-options">
            {[100, 200, 500, 1000, 2000, 5000].map(val => (
              <button
                key={val}
                className={`amount-btn ${amount === val ? 'active' : ''}`}
                onClick={() => setAmount(val)}
              >
                ¥{val}
              </button>
            ))}
          </div>
          
          <div className="custom-amount">
            <label>自定义金额：</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
              placeholder="请输入金额"
            />
          </div>
        </div>

        <div className="payment-method">
          <h3>支付方式</h3>
          <div className="method-options">
            <button
              className={`method-btn ${paymentMethod === 'wechat' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('wechat')}
            >
              💚 微信支付
            </button>
            <button
              className={`method-btn ${paymentMethod === 'alipay' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('alipay')}
            >
              💙 支付宝
            </button>
          </div>
        </div>

        <button className="recharge-btn" onClick={handleRecharge}>
          立即充值 ¥{amount}
        </button>

        <div className="payment-note">
          ℹ️ 充值后即时到账，可用于 API 调用和沙箱测试
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
