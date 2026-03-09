# UI 修复清单

## 当前问题
1. ✅ 车机端错误地显示在 iPhone 容器内 - **已修复**
2. ❌ 多个页面布局错乱
3. ❌ 红白配色不够统一

## 需要检查的所有页面

### 登录/注册流程
- [x] Login.tsx - 登录页
- [ ] CreateBot.tsx - 创建机器人页

### 主应用
- [ ] MainApp.tsx - 主容器
- [ ] Chat.tsx - 聊天界面
- [ ] Sidebar.tsx - 侧边栏

### 功能页面
- [ ] Profile.tsx - 个人中心
- [ ] Purchase.tsx - 购买订阅
- [ ] Recharge.tsx - 充值
- [ ] Roadbook.tsx - 路书
- [ ] Tasks.tsx - 任务
- [ ] BotDeploy.tsx - 机器人部署

### 通用组件
- [ ] PaymentModal.tsx - 支付弹窗
- [ ] DeviceSwitcher.tsx - 设备切换器

## 修复策略

### 1. 统一组件结构
每个页面组件应该：
```tsx
<div className={`page-container ${deviceType}`}>
  {/* 内容 */}
</div>
```

### 2. CSS 类命名规范
- `.page-container` - 页面容器
- `.page-container.mobile` - 手机端样式
- `.page-container.car` - 车机端样式
- `.page-container.desktop` - 桌面端样式（暂时不用）

### 3. 红白配色检查
确保所有颜色使用 CSS 变量：
- `var(--primary-red)` - 主红色 #FF3B3B
- `var(--bg-primary)` - 白色背景
- `var(--bg-secondary)` - 浅灰背景

## 优先级
1. **高优先级**：Chat, MainApp, Purchase, Recharge（核心流程）
2. **中优先级**：Profile, CreateBot（常用功能）
3. **低优先级**：Roadbook, Tasks, BotDeploy（辅助功能）

## 下一步
从 Chat 开始，逐个检查和修复。
