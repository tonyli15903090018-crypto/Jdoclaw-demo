// 设备类型
export type DeviceType = 'desktop' | 'mobile' | 'car'

// 用户状态
export interface UserInfo {
  username: string
  email: string
  hasPurchased: boolean
  apiBalance: number
  botName?: string
  botAvatar?: string
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly'
  subscriptionExpiry?: string
  selectedModel?: string
}

// 消息类型
export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

// 消费记录
export interface UsageRecord {
  id: string
  timestamp: Date
  model: string
  tokens: number
  cost: number
  type: string
}
