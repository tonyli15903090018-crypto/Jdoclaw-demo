import { useState } from 'react'
import './Purchase.css'

type PackageType = 'monthly' | 'quarterly' | 'yearly'

interface PurchaseProps {
  onComplete: (packageType: PackageType) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const Purchase = ({ onComplete, isDarkMode, toggleDarkMode }: PurchaseProps) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('quarterly')
  const [autoRenew, setAutoRenew] = useState(false)

  const packages = [
    {
      type: 'monthly' as PackageType,
      name: '月付套餐',
      price: 33,
      period: '1个月',
      desc: '按月订阅',
      popular: false
    },
    {
      type: 'quarterly' as PackageType,
      name: '季付套餐',
      price: 66,
      period: '3个月',
      desc: '省17%，推荐',
      popular: true
    },
    {
      type: 'yearly' as PackageType,
      name: '年付套餐',
      price: 99,
      period: '12个月',
      desc: '最划算',
      popular: false
    }
  ]

  const handlePurchase = () => {
    // 模拟支付成功
    onComplete(selectedPackage)
  }

  return (
    <div className={`purchase-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="purchase-header">
        <h1>选择订阅套餐</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="purchase-description">
        <p>购买沙箱配置服务，享受以下权益：</p>
        <ul>
          <li>✅ 独立沙箱环境创建与维护</li>
          <li>✅ API接入服务（无需自行购买API）</li>
          <li>✅ 多设备同步服务</li>
          <li>✅ 数据加密存储</li>
          <li>✅ 技术支持</li>
        </ul>
        <p className="note">💡 注意：API调用费用独立计费，需单独充值。</p>
      </div>

      <div className="package-list">
        {packages.map((pkg) => (
          <div
            key={pkg.type}
            className={`package-card ${selectedPackage === pkg.type ? 'selected' : ''} ${
              pkg.popular ? 'popular' : ''
            }`}
            onClick={() => setSelectedPackage(pkg.type)}
          >
            {pkg.popular && <div className="popular-badge">推荐</div>}
            <div className="package-header">
              <h3>{pkg.name}</h3>
              <div className="package-price">
                <span className="currency">¥</span>
                <span className="amount">{pkg.price}</span>
                <span className="period">/{pkg.period}</span>
              </div>
            </div>
            <p className="package-desc">{pkg.desc}</p>
            <div className="package-radio">
              {selectedPackage === pkg.type && <span className="checkmark">✓</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="auto-renew">
        <label>
          <input
            type="checkbox"
            checked={autoRenew}
            onChange={(e) => setAutoRenew(e.target.checked)}
          />
          <span>开启自动续费（到期前3天提醒）</span>
        </label>
      </div>

      <button className="purchase-button" onClick={handlePurchase}>
        立即购买 ¥{packages.find((p) => p.type === selectedPackage)?.price}
      </button>

      <div className="purchase-footer">
        <p>支付后自动创建独立沙箱环境</p>
        <p>支持微信支付、支付宝</p>
      </div>
    </div>
  )
}

export default Purchase
