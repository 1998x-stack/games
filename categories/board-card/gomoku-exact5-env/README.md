# gomoku-exact5-env · 环境 / 基准

> **P2 第二批状态** · 2026-11-09 · **已有成功 CI**  
> [返回 棋类与卡牌 分类](../README.md) · [查看完整 P2 日志](../../../docs/PHASE2-EXECUTION.md)

**简介：** 恰好五连规则 Gymnasium 环境，含终局契约测试

**原始项目：** [1998x-stack/gomoku-exact5-env](https://github.com/1998x-stack/gomoku-exact5-env)。此目录仅是索引，不包含源仓库代码或第三方素材。

## 实际观察与限制

已测试恰好五连、六连不胜、非法落子与终局 step 保护；非在线可玩游戏。

研究项目不是可直接在线试玩的游戏，不能以 CI 成功替代完整算法训练复现。

## 验证证据

- [GitHub 工作流证据 1](https://github.com/1998x-stack/gomoku-exact5-env/actions/runs/42550184933)

## 可复现命令（需在上游仓库根目录执行）

```bash
python -m pip install -e ".[dev]"
python -m pytest -q tests/test_env.py tests/test_exact5_contract.py
```

以上是公开测试/运行入口；有自动 CI 证据，但尚需根据项目补充真实平台验收。

## 下一项工作与验收门槛

用同一棋盘/动作序列和 gomoku_zero 做跨项目规则与 reward 对照。

没有测试日志、环境版本和对应上游提交的升级，不得将本状态变更为“可玩”或“已完成”。

[返回 Games 总目录](../../../README.md)
