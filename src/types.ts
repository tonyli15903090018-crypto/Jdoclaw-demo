// 设备类型
export type DeviceType = 'mobile' | 'car'

// 用户状态
export interface UserInfo {
  username: string
  email: string
  phone?: string
  
  // 三层支付状态
  hasJoined: boolean        // 第一层：是否加入会员 (¥9.9)
  hasPurchased: boolean     // 第二层：是否购买沙箱套餐
  apiBalance: number        // 第三层：API 余额
  
  botName?: string
  botAvatar?: string
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly'
  subscriptionExpiry?: string
  packageName?: string
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

// 模型信息
export interface ModelInfo {
  id: string
  name: string
  provider: string
  pricePerMToken: number  // 每百万 token 的价格（元）
}

// 可用模型列表
export const AVAILABLE_MODELS: ModelInfo[] = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', pricePerMToken: 30 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', pricePerMToken: 2 },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', pricePerMToken: 15 },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', pricePerMToken: 0.5 },
]

