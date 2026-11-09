# Go

> **第一批（P1）体验证据卡 · 2026-11-09**
>
> **分类：** [棋类与卡牌](../README.md) · **角色：** 浏览器版候选  
> **状态：** 构建或发布工作流获得成功证据，但**不等于已通过在线玩法验收**

> [!WARNING]
> 本项目 GitHub Pages 部署在仓库设置阶段遇到阻塞；不要将构建成功视为已上线。

**项目介绍：** 围棋规则引擎、界面与 AI。

## 获取项目

[访问独立上游源码仓库](https://github.com/1998x-stack/Go)。本页面**只提供导航和验收信息**，不复制游戏源代码，也不声明任何上游软件的统一许可证。

## 启动方式（参照上游公开文档及当前实现）

在克隆该项目后的仓库根目录执行：

```bash
python -m pip install 'pygame>=2.5,<3'
python main.py
```

此处的运行命令用于帮助复验；已有 CI 证据不代表在所有物理设备上都测试过。

## 可追溯验证记录

**观察结果：** 修复 pygbag --build 后静态产物构建成功；configure-pages 因 Pages 尚未启用而失败。规则 CI 成功。

- [CI / 部署证据 1](https://github.com/1998x-stack/Go/actions/runs/42541002385)
- [CI / 部署证据 2](https://github.com/1998x-stack/Go/actions/runs/42541002361)

## 下一步验收

在仓库 Settings → Pages 启用 GitHub Actions，然后验证 Web 版落子、Pass、终局计分。

**验收原则：** 只有在真实目标环境完成可复现的输入、规则、结束/重开测试并留存记录后，才能将其标记为“已验证可玩”。

[⬅ 返回分类](../README.md) · [⬆ 返回总目录](../../../README.md) · [P1 执行日志](../../../docs/PHASE1-EXECUTION.md)
