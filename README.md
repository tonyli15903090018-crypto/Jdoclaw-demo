# Jdoclaw-demo

基于OpenClaw框架的多端AI助手演示项目。

## 项目简介

三个独立版本的AI对话助手:
- **小程序版**(手机端)
- **Web版**(桌面端)  
- **车机版**(车载中控屏)

## 技术栈

- React 19 + TypeScript
- Vite 7
- CSS Modules

## 核心功能

1. **聊天模块** - AI对话、语音通话(车机版)
2. **路书管理** - 旅行规划、景点推荐
3. **日程管家** - 每日任务、智能提醒
4. **机器人部署** - QQ/飞书/企微机器人配置
5. **个人中心** - 会员、沙箱、API充值

## 三端适配

- 手机端: `height: 100%` 适配容器,紧凑布局
- 车机端: `height: 100vh` 填满视口,大字号大按钮
- 桌面端: 标准Web布局

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

推送到master分支,GitHub Actions自动部署到GitHub Pages。

## 需求文档

详见 `/docs/REQUIREMENTS_FINAL.md`

## 项目地址

https://github.com/tonyli15903090018-crypto/homeassistant-ai-chat

---

**开发时间**: 2026-03-10  
**开发者**: 美丽龙虾 🦞
