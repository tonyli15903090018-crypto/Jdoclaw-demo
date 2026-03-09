import { useState } from 'react'
import { AVAILABLE_MODELS, type ModelInfo } from '../types'
import './RechargeModal.css'

interface RechargeModalProps {
  currentBalance: number
  onRecharge: (amount: number) => void
  onClose: () => void
  isDarkMode?: boolean
}

const AMOUNTS = [50, 100, 200, 500]

const RechargeModal = ({ currentBalance, onRecharge, onClose, isDarkMode = false }: RechargeModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(AVAILABLE_MODELS[0])

  const handleRecharge = () => {
    onRecharge(selectedAmount)
    onClose()
  }

  // 计算可调用次数（按100万token估算）
  const calculateCalls = (amount: number, pricePerMToken: number) => {
    return Math.floor((amount / pricePerMToken) * 100)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content recharge-modal ${isDarkMode ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-icon">💰</div>
          <h2 className="modal-title">充值 API 余额</h2>
          <p className="modal-subtitle">为您的 AI 助手充值使用额度</p>
        </div>

        <div className="balance-display">
          <div className="balance-label">当前余额</div>
          <div className="balance-value">¥{currentBalance.toFixed(2)}</div>
        </div>

        <div className="model-selector-section">
          <div className="section-title">选择模型（查看价格）</div>
          <div className="model-options">
            {AVAILABLE_MODELS.map((model) => (
              <div
                key={model.id}
                className={`model-option ${selectedModel.id === model.id ? 'active' : ''}`}
                onClick={() => setSelectedModel(model)}
              >
                <div className="model-info">
                  <div className="model-name">{model.name}</div>
                  <div className="model-provider">{model.provider}</div>
                </div>
                <div className="model-price">
                  <span className="price-value">¥{model.pricePerMToken}</span>
                  <span className="price-unit">/M tokens</span>
                </div>
                {selectedModel.id === model.id && (
                  <div className="model-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="amount-selector-section">
          <div className="section-title">选择充值金额</div>
          <div className="amount-options">
            {AMOUNTS.map((amount) => (
              <div
                key={amount}
                className={`amount-option ${selectedAmount === amount ? 'active' : ''}`}
                onClick={() => setSelectedAmount(amount)}
              >
                <div className="amount-value">¥{amount}</div>
                <div className="amount-calls">
                  ≈{calculateCalls(amount, selectedModel.pricePerMToken)}万次
                </div>
                {selectedAmount === amount && (
                  <div className="amount-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="recharge-summary">
          <div className="summary-row">
            <span className="summary-label">充值金额</span>
            <span className="summary-value">¥{selectedAmount}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">充值后余额</span>
            <span className="summary-value highlight">¥{(currentBalance + selectedAmount).toFixed(2)}</span>
          </div>
        </div>

        <div className="recharge-actions">
          <button className="btn btn-primary btn-large" onClick={handleRecharge}>
            立即充值 ¥{selectedAmount}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            取消
          </button>
        </div>

        <div className="recharge-note">
          * 以 {selectedModel.name} 为例，充值 ¥{selectedAmount} 约可调用 {calculateCalls(selectedAmount, selectedModel.pricePerMToken)} 万次
        </div>
      </div>
    </div>
  )
}

export default RechargeModal
