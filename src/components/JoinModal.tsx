import './JoinModal.css'

interface JoinModalProps {
  onJoin: () => void
  onClose: () => void
  isDarkMode?: boolean
}

const JoinModal = ({ onJoin, onClose, isDarkMode = false }: JoinModalProps) => {
  const handleJoin = () => {
    // 模拟支付成功
    onJoin()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content join-modal ${isDarkMode ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-icon">🎉</div>
          <h2 className="modal-title">欢迎加入 Jdoclaw</h2>
          <p className="modal-subtitle">开启您的智能家居 AI 助手之旅</p>
        </div>

        <div className="join-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">✅</span>
            <span className="benefit-text">终身会员资格</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🤖</span>
            <span className="benefit-text">创建专属 AI 机器人</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">☁️</span>
            <span className="benefit-text">独立沙箱环境</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📱</span>
            <span className="benefit-text">多端同步使用</span>
          </div>
        </div>

        <div className="join-price-section">
          <div className="price-badge">会员价</div>
          <div className="price-main">
            <span className="price-currency">¥</span>
            <span className="price-amount">9.9</span>
          </div>
          <div className="price-desc">一次付费，终身使用</div>
        </div>

        <div className="join-actions">
          <button className="btn btn-primary btn-large" onClick={handleJoin}>
            立即加入
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            稍后再说
          </button>
        </div>

        <div className="join-note">
          * 加入后可购买沙箱套餐和充值 API 余额使用服务
        </div>
      </div>
    </div>
  )
}

export default JoinModal
