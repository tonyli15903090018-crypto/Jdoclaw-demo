import { useState } from 'react'
import './Purchase.css'

interface PurchaseProps {
  onPurchase: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

type PlanType = 'monthly' | 'quarterly' | 'yearly'

const Purchase = ({ onPurchase, isDarkMode, toggleDarkMode }: PurchaseProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly')
  const [autoRenew, setAutoRenew] = useState(true)

  const plans = [
    { type: 'monthly' as PlanType, name: '月付', price: 33, period: '月' },
    { type: 'quarterly' as PlanType, name: '季付', price: 66, period: '季', badge: '省 17%' },
    { type: 'yearly' as PlanType, name: '年付', price: 99, period: '年', badge: '最划算' }
  ]

  const currentPlan = plans.find(p => p.type === selectedPlan)!
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

        <div className="differentiator">
          <div className="diff-badge">🚀 核心优势</div>
          <h2 className="diff-title">买服务，不买 API</h2>
          <p className="diff-desc">
            <strong>¥99 购买的是沙箱一键配置服务</strong>，让您告别繁琐的 API 对接！
            <br />
            后续 AI 调用费用独立计费，清晰透明，您可以：
          </p>
          <ul className="benefit-list">
            <li>✅ 查看详细账单明细</li>
            <li>✅ 自由切换 AI 模型</li>
            <li>✅ 按实际用量付费</li>
          </ul>
          <div className="comparison">
            <div className="comparison-item other">
              <span className="comparison-label">❌ 其他产品</span>
              <span className="comparison-text">购买API → 配置参数 → 对接软件 → 调试测试</span>
            </div>
            <div className="comparison-item ours">
              <span className="comparison-label">✅ Jdoclaw</span>
              <span className="comparison-text">购买服务 → 充值 → 使用，全程 3 分钟</span>
            </div>
          </div>
        </div>

        <div className="pricing-card">
          <div className="pricing-badge">推荐</div>
          <h2 className="pricing-name">Jdoclaw 沙箱配置服务</h2>

          <div className="plan-selector">
            {plans.map((plan) => (
              <button
                key={plan.type}
                className={`plan-option ${selectedPlan === plan.type ? 'active' : ''}`}
                onClick={() => setSelectedPlan(plan.type)}
              >
                {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                <span className="plan-name">{plan.name}</span>
                <span className="plan-price">¥{plan.price}/{plan.period}</span>
              </button>
            ))}
          </div>

          <div className="pricing-price">
            <span className="price-currency">¥</span>
            <span className="price-amount">{currentPlan.price}</span>
            <span className="price-period">/{currentPlan.period}</span>
          </div>

          <div className="auto-renew">
            <label className="renew-checkbox">
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
              />
              <span>自动续费（可随时取消）</span>
            </label>
          </div>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>沙箱环境一键配置</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>无需对接飞书/QQ/微信</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>多设备同步（手机/电脑/车机）</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon">✅</span>
              <span>智能家居设备控制</span>
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
              <span className="feature-icon">💰</span>
              <span>API 费用独立计费，明细清晰</span>
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
