# RL-Adventure-2 · CPU Actor-Critic 策略训练

> **P3 · 2026-11-09 · 三种子真实训练 CI 成功，原深度 Notebook 待验**
>
> [原始项目](https://github.com/1998x-stack/RL-Adventure-2) · [P3 日志](../../../docs/PHASE3-EXECUTION.md) · [返回分类](../README.md)

此项目原有 A2C、PPO、SAC 等 PyTorch Notebook。此次保留原始源码，新增 `p3/cartpole_actor_critic.py` 与 `p3/benchmark.py`，在现代 Gymnasium CartPole-v1 中训练 **NumPy 线性 Actor-Critic**。包含 Monte Carlo 优势、真实 actor 和 critic 参数更新、固定种子及留出集评估；**不是深度 PyTorch A2C 复现**。

## 三种子完整实验

| 预设训练种子 | 训练后平均奖励 | 随机策略平均奖励 |
|---|---:|---:|
| 2026 | 382.109 | 23.234 |
| 2027 | 410.953 | 21.734 |
| 2028 | 484.156 | 21.688 |

每种子 480 局训练、64 局未用于 checkpoint 选择的独立评估；使用固定 12 局验证集选取模型。训练后跨种子均值 **425.739**，种子均值的样本 SD **52.606**，平均差距 **403.521**。依赖 Python 3.11、Gymnasium 1.1.1 和 NumPy 1.26.4。

**证据：** [完整 GitHub Actions 日志及多种子 JSON 工件](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42634426202)。5 项单测验证参数更新、随机数隔离与汇总逻辑；全部实验独立重跑并比对 JSON 一致。

## 运行

在原仓库根目录：

```bash
python -m pip install "gymnasium==1.1.1" "numpy==1.26.4"
python -m unittest discover -s tests -p "test_p3_*.py" -v
python -m p3.cartpole_actor_critic --seed 2026 --train-episodes 480 --eval-episodes 64 --output build/p3-single.json
python -m p3.benchmark --output build/p3-multiseed.json
```

**限制：** 三种子的样本标准差仅用于描述训练结果波动，不提供泛化性能保证或统计显著性声明；本项目其他 Notebook、深度网络、GPU 训练及原 PyTorch A2C 仍未完成现代环境复现。

[返回 Games 总目录](../../../README.md)
