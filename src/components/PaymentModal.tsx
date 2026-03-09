import './PaymentModal.css'

interface PaymentModalProps {
  isOpen: boolean
  hasPurchased: boolean
  apiBalance: number
  packageType?: string
  packageExpiry?: string
  onClose: () => void
  onGoPurchase: () => void
  onGoRecharge: () => void
}

const PaymentModal = ({
  isOpen,
  hasPurchased,
  apiBalance,
  packageType,
  packageExpiry,
  onClose,
  onGoPurchase,
  onGoRecharge
}: PaymentModalProps) => {
  if (!isOpen) return null

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {!hasPurchased ? (
          // 未购买套餐
          <>
            <div className="modal-icon">📦</div>
            <h2>请先购买订阅套餐</h2>
            <p>购买后即可使用AI助手服务</p>
            <div className="modal-info">
              <p>✅ 独立沙箱环境</p>
              <p>✅ API接入服务</p>
              <p>✅ 多设备同步</p>
            </div>
            <button className="modal-button primary" onClick={onGoPurchase}>
              去购买套餐
            </button>
          </>
        ) : (
          // 已购买但余额不足
          <>
            <div className="modal-icon">💰</div>
            <h2>API余额不足</h2>
            <p>当前余额：¥{apiBalance.toFixed(2)}</p>
            <div className="modal-info">
              <p>📋 套餐类型：{packageType}</p>
              <p>⏰ 到期时间：{packageExpiry}</p>
            </div>
            <button className="modal-button primary" onClick={onGoRecharge}>
              立即充值
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
