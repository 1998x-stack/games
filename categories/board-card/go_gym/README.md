# go_gym · 围棋 Gymnasium 环境

> **P2 第二批 · CPU 规则/环境/MCTS 回归 CI 通过（2026-11-09）**  
> [返回棋类与卡牌分类](../README.md) · [完整 P2 日志](../../../docs/PHASE2-EXECUTION.md)

**原始项目：** [1998x-stack/go_gym](https://github.com/1998x-stack/go_gym)。本目录仅提供索引，不镜像源码、模型或第三方素材。

## 本轮完成的真实工程改进

- **规则：** 规范执子方校验，并以固定棋形覆盖提子、禁自杀与普通劫禁。
- **Gymnasium 环境：** 测试 `reset(seed)`、`step`、4 通道观察、合法动作掩码、双停结算、非法动作的终局保护以及 max_steps 截断行为。
- **搜索：** 修正 PUCT 白方对已是本方视角的 Q 值再次取反的问题；避免普通劫历史和最后落子点不同但状态缓存误命中，超级劫绕开不完整键。
- **可复现性：** GitHub Actions 在 CPU 下编译、运行规则回归，并进行固定种子 3×3 UCT 无界面短局。

## 原始验证证据

- [PR 成功的 GitHub Actions（包含环境测试与实际短局）](https://github.com/1998x-stack/go_gym/actions/runs/42646215027)
- [分支最终提交成功的 GitHub Actions](https://github.com/1998x-stack/go_gym/actions/runs/42646131399)
- [已合并的上游修复 PR](https://github.com/1998x-stack/go_gym/pull/1)

**证据边界：** 这说明代码契约与轻量搜索通过自动化门禁，**不证明**完整 9×9/19×19 自对弈训练、棋力表现、完整中国规则人工裁决或在线可玩。时间上限返回 `truncated=True` 不是根据未完成棋局评胜。历史训练与规则语义变更的下游兼容性还需复核。

## 下一项验收

以固定多种子与相同搜索预算运行 9×9 双向执色评估，记录胜负、用时和置信区间；同时独立复核超级劫、死子协商与模型训练/恢复。保留实际日志才能升级为更高级别验证。

[返回 Games 总目录](../../../README.md)
