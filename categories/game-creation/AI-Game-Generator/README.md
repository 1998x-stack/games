# AI-Game-Generator · AI 游戏创作工具

> **第三批 P3 · 2026-11-09 · 预览隔离安全契约 CI 通过**
>
> [返回本分类](../README.md) · [第三批证据与计划](../../../docs/PHASE3-EXECUTION.md) · [上游仓库](https://github.com/1998x-stack/AI-Game-Generator)

**简介：** 自然语言生成与预览 HTML5 游戏

## 核实到的运行/维护边界

生成 HTML 预览已移除 allow-same-origin 并校验 postMessage 来源，静态安全契约及 TypeScript CI 通过；不是整个平台的安全认证。

**部署与许可：** 需要后端服务器，不适合直接作为静态 Pages 运行。收录索引不表示上游素材、游戏 ROM、模型或项目代码获得新的再分发许可。

## 可追溯证据

- [原始 GitHub Actions 工作流 1](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42619929546)

## 已有验收命令

在 [上游仓库](https://github.com/1998x-stack/AI-Game-Generator) 根目录执行：

```bash
npm ci
node --test tests/sandbox-security.test.mjs
npx tsc --noEmit
```

上述命令只覆盖此次注明的模块，不代表其余全部应用功能与生产服务。

## 下一步最小验收

再用真实浏览器测试跨源 iframe 隔离、失败/超时与无密钥演示；服务端密钥永不放入 GitHub Pages。

**升档原则：** 需要可复现命令、适用系统和依赖版本、固定种子/测试条件、原始 CI/截图/日志及失败记录。仅阅读 README 或看到工作流配置不能把状态升级为“可用/可玩”。

[返回 35 项总目录](../../../README.md)
