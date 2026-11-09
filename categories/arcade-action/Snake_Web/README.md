# Snake_Web

> **第一批（P1）体验证据卡 · 2026-11-09**
>
> **分类：** [街机与动作](../README.md) · **角色：** 浏览器版候选  
> **状态：** 浏览器自动化测试通过，但**尚未验证正式生产 URL**

> [!WARNING]
> 本项目 GitHub Pages 部署在仓库设置阶段遇到阻塞；不要将构建成功视为已上线。

**项目介绍：** 网页版贪吃蛇。

## 获取项目

[访问独立上游源码仓库](https://github.com/1998x-stack/Snake_Web)。本页面**只提供导航和验收信息**，不复制游戏源代码，也不声明任何上游软件的统一许可证。

## 启动方式（参照上游公开文档及当前实现）

在克隆该项目后的仓库根目录执行：

```bash
python3 -m http.server 8000
# http://localhost:8000
```

此处的运行命令用于帮助复验；已有 CI 证据不代表在所有物理设备上都测试过。

## 可追溯验证记录

**观察结果：** 9 项规则与 Chromium 冒烟通过；Pages 未启用导致部署失败

- [CI / 部署证据 1](https://github.com/1998x-stack/Snake_Web/actions/runs/42540673921)

## 下一步验收

在仓库 Settings → Pages 启用 GitHub Actions；验证正式 URL 的 Chromium/触控行为。

**验收原则：** 只有在真实目标环境完成可复现的输入、规则、结束/重开测试并留存记录后，才能将其标记为“已验证可玩”。

[⬅ 返回分类](../README.md) · [⬆ 返回总目录](../../../README.md) · [P1 执行日志](../../../docs/PHASE1-EXECUTION.md)
