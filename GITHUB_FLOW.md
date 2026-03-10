# GitHub 发布流程 (自动化参考)

## 仓库信息
- **GitHub URL**: https://github.com/tonyli15903090018-crypto/homeassistant-ai-chat
- **分支**: master

---

## 标准发布流程

### 1. 检查工作状态
```bash
cd /root/.openclaw/workspace/homeassistant-ai-chat
git status
```

### 2. 拉取远程最新代码
```bash
git pull origin master
```
- 如果有冲突,优先使用远程版本: `git reset --hard origin/master`
- 然后重新应用本地改动

### 3. 添加所有改动
```bash
git add -A
```

### 4. 提交改动 (规范化commit message)
```bash
git commit -m "feat: 功能描述

新增功能:
- 功能点1
- 功能点2

优化:
- 优化点1
- 优化点2

文档:
- 文档更新点"
```

**Commit类型规范:**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

### 5. 推送到远程
```bash
git push origin master
```

- 如果被拒绝(remote有新提交): 回到步骤2重新pull

---

## 快捷命令 (一键发布)

```bash
cd /root/.openclaw/workspace/homeassistant-ai-chat && \
git pull origin master && \
git add -A && \
git commit -m "feat: 更新描述" && \
git push origin master
```

---

## 常见问题

### 问题1: push被拒绝 (remote有更新)
```bash
# 方案A: 拉取并rebase
git pull origin master --rebase
git push origin master

# 方案B: 拉取并merge
git pull origin master
git push origin master

# 方案C: 强制使用远程版本(谨慎!)
git reset --hard origin/master
# 重新应用改动
```

### 问题2: 有未提交的改动
```bash
# 暂存当前改动
git stash

# 拉取远程
git pull origin master

# 恢复暂存
git stash pop
```

### 问题3: 需要回滚
```bash
# 查看提交历史
git log --oneline -10

# 回滚到指定commit
git reset --hard <commit-hash>
git push origin master --force  # 强制推送(谨慎!)
```

---

## 自动化脚本

创建 `publish.sh`:
```bash
#!/bin/bash
set -e

cd /root/.openclaw/workspace/homeassistant-ai-chat

echo "📥 拉取远程最新代码..."
git pull origin master || {
  echo "⚠️  拉取失败,尝试重置..."
  git reset --hard origin/master
}

echo "📦 添加所有改动..."
git add -A

echo "📝 提交改动..."
if [ -z "$1" ]; then
  git commit -m "chore: 自动更新 $(date +'%Y-%m-%d %H:%M:%S')"
else
  git commit -m "$1"
fi

echo "🚀 推送到远程..."
git push origin master

echo "✅ 发布成功!"
```

使用方法:
```bash
chmod +x publish.sh
./publish.sh "feat: 添加新功能"
```

---

## 当前工作目录结构
```
/root/.openclaw/workspace/homeassistant-ai-chat/
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx         # 底部Tab导航 (手机端)
│   │   ├── BotDeploy.tsx         # 机器人部署页面
│   │   ├── MainApp.tsx           # 主聊天界面
│   │   ├── Profile.tsx           # 个人中心
│   │   └── ...
│   ├── App.tsx                    # 主应用路由
│   └── types.ts                   # TypeScript类型定义
├── WORKLOG.md                     # 工作日志 (每日更新)
├── ISSUES.md                      # 问题分析文档
├── GITHUB_FLOW.md                 # 本文档
└── package.json
```

---

## 注意事项

1. **先pull后push** - 避免冲突
2. **commit message规范化** - 方便追踪历史
3. **每日更新WORKLOG.md** - 记录工作进度
4. **测试后再发布** - 确保代码可运行
5. **冲突优先远程** - 除非本地改动特别重要

---

## 自动化检查清单

发布前检查:
- [ ] 代码编译通过 (`npm run build`)
- [ ] 本地测试OK (`npm run dev`)
- [ ] 已更新WORKLOG.md
- [ ] commit message清晰
- [ ] 已拉取远程最新代码

---

**最后更新**: 2026-03-10
