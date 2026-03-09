# 修复清单

## 问题
1. ❌ 流程错误：应该是 login → createBot → chat (发送消息时弹窗)
2. ❌ 页面没有UI样式

## 正确流程
1. 注册/登录
2. 创建机器人
3. 进入聊天页面
4. 发送消息 → 检测未购买/余额不足 → 弹窗
5. 点击弹窗按钮 → 跳转购买页面
6. 购买套餐 → 充值API → 返回聊天

## 修复步骤
1. 修改 App.tsx 流程：login → createBot → main
2. 删除中间的 purchase/recharge stage
3. Purchase 和 Recharge 作为独立页面，由 PaymentModal 触发
4. 检查所有 CSS 文件是否正确加载
