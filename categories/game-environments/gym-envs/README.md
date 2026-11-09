# gym-envs · 研究环境 / 基准

> **第三批 P3 · 2026-11-09 · 教学环境协议 CI 通过**
>
> [返回本分类](../README.md) · [第三批证据与计划](../../../docs/PHASE3-EXECUTION.md) · [上游仓库](https://github.com/1998x-stack/gym-envs)

**简介：** Gymnasium 教学环境与小游戏

## 核实到的运行/维护边界

FrozenLake 与 Blackjack 两个教学环境已更新为 Gymnasium 五元组 step、独立随机源和完整回合/环境契约测试；其他示例未迁移。

**部署与许可：** 不属于网页试玩项目。收录索引不表示上游素材、游戏 ROM、模型或项目代码获得新的再分发许可。

## 可追溯证据

- [原始 GitHub Actions 工作流 1](https://github.com/1998x-stack/gym-envs/actions/runs/42620238372)

## 已有验收命令

在 [上游仓库](https://github.com/1998x-stack/gym-envs) 根目录执行：

```bash
python -m pip install "gymnasium>=1.0,<1.4" "numpy>=1.24,<3"
python -m unittest discover -s tests -v
```

上述命令只覆盖此次注明的模块，不代表其余全部应用功能与生产服务。

## 下一步最小验收

将其余 classic_control 示例单独迁移/验证；当前只验收两个 Toy Text 环境，另做教学说明与 API 对照。

**升档原则：** 需要可复现命令、适用系统和依赖版本、固定种子/测试条件、原始 CI/截图/日志及失败记录。仅阅读 README 或看到工作流配置不能把状态升级为“可用/可玩”。

[返回 35 项总目录](../../../README.md)
