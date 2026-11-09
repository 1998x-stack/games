# Deep-Reinforcement-Learning-Hands-On · 强化学习教材实验

> P3 · **CPU FrozenLake 基线 CI 成功；原书全章节仍待验收**

[上游项目](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On) · [P3 实证日志](../../../docs/PHASE3-EXECUTION.md) · [返回分类](../README.md)

项目是强化学习教材的历史代码。原始 Gym/PyTorch 示例完整保留；本轮仅独立增加现代 Gymnasium 的无 ROM 基线。

## 实验结果与证据

- Python 3.11 / Gymnasium 1.1.1 / FrozenLake-v1 4×4 slippery / seed=2026。
- 256 局：价值迭代 195 局获胜（76.17%），随机动作 2 局获胜（0.78%）。
- 比较策略共享环境重置 seed；CI 两次导出 JSON 逐字节一致、完整回合/收敛与随机源测试通过。
- [原始 CI、详细日志与 JSON 工件](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On/actions/runs/42630664159)

## 复验

在原仓库根目录：

    python -m pip install gymnasium==1.1.1
    python -m unittest discover -s tests -p 'test_p3_*.py' -v
    python -m p3.frozenlake_baseline --seed 2026 --episodes 256 --output build/p3-frozenlake.json

**尚未完成：** 这是单组模型规划基线，不是神经网络模型训练或原书全部章节迁移；旧版依赖和 Atari ROM 许可仍需独立核查。
