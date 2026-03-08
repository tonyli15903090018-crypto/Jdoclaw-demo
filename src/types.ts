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
}

// 消息类型
export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}
