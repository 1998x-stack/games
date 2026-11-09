# TetrominoDQN · 俄罗斯方块游戏 AI 研究

> **P2 第二批 · 2026-11-09 · 玩法规则与随机策略基线 CI 通过；DQN 训练未验收**  
> [返回游戏 AI 分类](../README.md) · [P2 逐项日志](../../../docs/PHASE2-EXECUTION.md)

**原始仓库：** [1998x-stack/TetrominoDQN](https://github.com/1998x-stack/TetrominoDQN)。本页仅提供可追溯链接，不镜像源码、角色素材或模型文件。

## 本轮实测内容

修复了 `_move` 只检查碰撞、不更新方块位置的错误（影响左右移动、下落和重力）；将多行消除改为一次性移除/补行，避免边删除边插入导致索引错位；同时防止硬降落后误动新方块、终局后继续操作，并增加 `reset(seed)` 独立 RNG。

新增真实 Pygame 规则环境的 CPU 回归：移动、墙边旋转、硬降落、两行同时消除、观察空间、非法动作、步数终止与种子一致。**额外执行随机动作策略**，使用固定三种子、每种子三回合、每回合最多 400 步，重复两次 JSON 字节一致，不涉及 PyTorch 模型。

## 原始成功证据

- [PR 最终 CI：完整游戏规则测试与两次确定性基线](https://github.com/1998x-stack/TetrominoDQN/actions/runs/42649593846)
- [分支 CI：完整玩法门禁](https://github.com/1998x-stack/TetrominoDQN/actions/runs/42649556998)
- [已合并的上游 PR #2](https://github.com/1998x-stack/TetrominoDQN/pull/2)

**边界：** 原环境沿用旧 Gym 四元组 API；暂未完成 Gymnasium 五元组迁移、真实显示器/键盘验收、DQN 训练奖励曲线、模型复现或智能体相对随机策略的公平对照。随机策略基线不等于训练成功，也不代表项目现已网页可玩。

## 下一轮验收

同种子、同动作和相同回合/步数预算下，运行至少一个 DQN 实际训练→存档→恢复→留出评估流程；报告训练预算、奖励分布与失败率，再审查端侧可玩体验和许可边界。

[返回 Games 总目录](../../../README.md)
