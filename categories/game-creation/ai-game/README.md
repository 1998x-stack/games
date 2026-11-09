# ai-game · 需要服务器的 AI 游戏创作工具

> P3 · **本轮完整 Verify CI 成功；仅部分构建安全边界已测试**

[上游项目](https://github.com/1998x-stack/ai-game) · [P3 实证日志](../../../docs/PHASE3-EXECUTION.md) · [返回分类](../README.md)

原项目依赖 Next.js 服务端和可选 AI 服务配置，不能直接当作静态 GitHub Pages 应用交付。

## 本轮构建边界优化

游戏打包器拒绝 scripts、assets 目录及其中脚本/素材的符号链接，避免将工作区外文件打包进生成 HTML。外部临时文件、伪造素材与目录链接的回归测试成功；对无合法脚本的拒绝场景保留具体错误原因。

- [本轮 Verify：类型检查、Lint、单测、生产构建和 Chromium 冒烟成功](https://github.com/1998x-stack/ai-game/actions/runs/42631295419)
- [历史成功 CI](https://github.com/1998x-stack/ai-game/actions/runs/39938832001)

## 本地复核

    npm ci
    npm test -- __tests__/packager.test.ts
    npm run typecheck
    npm run build

**仍未验证：** 完整云端生成流程、密钥失效路径、会话隔离和全平台安全审计。成功 Pages 构建并不证明整个 Next.js 后端能够安全地静态部署。
