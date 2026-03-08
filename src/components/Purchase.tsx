import './Purchase.css'

interface PurchaseProps {
  onPurchase: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Purchase = ({ onPurchase, isDarkMode, toggleDarkMode }: PurchaseProps) => {
  return (
    <div className="purchase-container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="purchase-card">
        <div className="purchase-header">
          <h1 className="purchase-title">选择您的套餐</h1>
          <p className="purchase-subtitle">一次购买，永久使用</p>
        </div>

        <div className="pricing-card">
          <div className="pricing-badge">推荐</div>
          <h2 className="pricing-name">Jdoclaw 专业版</h2>
          <div className="pricing-price">
            <span className="price-currency">¥</span>
            <span className="price-amount">99</span>
            <span className="price-period">/永久</span>
          </div>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>AI 智能对话（无限次）</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>智能家居设备控制</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>多设备同步（手机/电脑/车机）</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>语音助手功能</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>场景自动化配置</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>数据加密存储</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>7×24 技术支持</span>
            </li>
          </ul>

          <button className="btn btn-primary purchase-btn" onClick={onPurchase}>
            立即购买
          </button>

          <p className="purchase-note">
            * 这是演示版本，点击按钮即可体验所有功能
          </p>
        </div>
      </div>
    </div>
  )
}

export default Purchase
