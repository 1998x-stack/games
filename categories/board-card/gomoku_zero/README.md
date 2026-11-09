# gomoku_zero · 游戏 AI 研究

> **第二批 P2 · 2026-11-09 · CI 成功，但仍有验收缺口**
>
> [原始项目](https://github.com/1998x-stack/gomoku_zero) · [P2 完整日志](../../../docs/PHASE2-EXECUTION.md) · [返回分类](../README.md)

**项目简介：** 五子棋智能体项目

## 本轮实际证据

GameState 非法/终局动作保护和与 pinned Exact-5 环境一致性脚本通过轻量 CPU CI；完整训练模型及性能仍未验证。

- [GitHub CI / 运行证据 1](https://github.com/1998x-stack/gomoku_zero/actions/runs/42552039262)

## 复验命令

在原仓库根目录运行：

```bash
# 先安装固定版本 gomoku-exact5-env 的公开规则包
python -m pip install "numpy>=1.23" "gymnasium>=0.29" 
python -m pip install "git+https://github.com/1998x-stack/gomoku-exact5-env.git@b390b3c3077362ad103d4135413b0796039cd34b"
PYTHONPATH=src python scripts/check_exact5_contract.py
```

## 下一项验收

使用固定棋盘集合跨 gomoku_zero / gomoku-exact5-env 对比，进一步执行 CPU 小规模自对弈→训练→评估，记录种子、环境版本和性能基线。**规则契约测试不代表深度学习模型已收敛。**

当前尚未获得全部真实目标环境体验或实验验收，不显示“生产可玩”标签。
