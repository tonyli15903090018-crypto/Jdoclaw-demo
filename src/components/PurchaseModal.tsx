import { useState } from 'react'
import './PurchaseModal.css'

interface PurchaseModalProps {
  onPurchase: (packageType: 'monthly' | 'quarterly' | 'yearly') => void
  onClose: () => void
  isDarkMode?: boolean
}

type PackageType = 'monthly' | 'quarterly' | 'yearly'

const PACKAGES = {
  monthly: { name: '月付套餐', price: 33, period: '月', savings: '' },
  quarterly: { name: '季付套餐', price: 66, period: '季', savings: '省¥33' },
  yearly: { name: '年付套餐', price: 99, period: '年', savings: '省¥297' }
}

const PurchaseModal = ({ onPurchase, onClose, isDarkMode = false }: PurchaseModalProps) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('monthly')

  const handlePurchase = () => {
    onPurchase(selectedPackage)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content purchase-modal ${isDarkMode ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-icon">☁️</div>
          <h2 className="modal-title">购买沙箱套餐</h2>
          <p className="modal-subtitle">选择适合您的订阅周期</p>
        </div>

        <div className="package-options">
          {(Object.entries(PACKAGES) as [PackageType, typeof PACKAGES.monthly][]).map(([type, pkg]) => (
            <div
              key={type}
              className={`package-card ${selectedPackage === type ? 'active' : ''}`}
              onClick={() => setSelectedPackage(type)}
            >
              {pkg.savings && <div className="package-badge">{pkg.savings}</div>}
              <div className="package-name">{pkg.name}</div>
              <div className="package-price">
                <span className="price-symbol">¥</span>
                <span className="price-value">{pkg.price}</span>
                <span className="price-period">/{pkg.period}</span>
              </div>
              {selectedPackage === type && (
                <div className="package-check">✓</div>
              )}
            </div>
          ))}
        </div>

        <div className="purchase-features">
          <div className="feature-title">套餐包含：</div>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🏠</span>
              <span className="feature-text">独立沙箱环境</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span className="feature-text">数据完全隔离</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <span className="feature-text">三端实时同步</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <span className="feature-text">AI 机器人托管</span>
            </div>
          </div>
        </div>

        <div className="purchase-actions">
          <button className="btn btn-primary btn-large" onClick={handlePurchase}>
            立即购买 ¥{PACKAGES[selectedPackage].price}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            取消
          </button>
        </div>

        <div className="purchase-note">
          * 购买后需充值 API 余额才能使用服务
        </div>
      </div>
    </div>
  )
}

export default PurchaseModal
