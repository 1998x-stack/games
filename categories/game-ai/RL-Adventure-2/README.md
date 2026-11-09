# RL-Adventure-2 · CPU Actor-Critic 策略训练

> **P3 · 2026-11-09 · 现代 PyTorch/NumPy 同种子对照 CI 成功；原历史 n-step A2C 待验**
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

## 现代 PyTorch 神经网络对照（新增）

本轮另外加入 `p3/torch_actor_critic.py` 与 `p3/compare_models.py`，在相同 CartPole-v1、预设三种子、每种子 480 局训练和 64 局留出评估下比较两套真实学习实现：

| 种子 | NumPy 线性平均奖励 | PyTorch 神经网络平均奖励 |
|---|---:|---:|
| 2026 | 382.109 | 324.297 |
| 2027 | 410.953 | 280.266 |
| 2028 | 484.156 | 436.828 |
| 跨种子均值 | **425.739** | **347.130** |
| 种子均值样本 SD | 52.606 | 80.740 |

模型参数量分别 **15** 和 **483**；同一 CI 运行环境的顺序单种子计时约 **4.54 秒** 和 **12.21 秒**（包括训练、验证、测试，不包括安装依赖）。对照 JSON 执行两次完全一致、PyTorch 梯度测试通过。

[真实 PyTorch 与 NumPy 对照 / 耗时 JSON / 完整 CI](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42637469330) · [此前 NumPy-only 训练成功记录](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42634426202)

**注意：** PyTorch 网络使用隐藏层和 Adam，线性模型另有学习率与更新方法。这里的差异不能归因于语言/框架，不能当作模型公平消融或统计显著性；历史 Notebook 的向量化 n-step A2C 仍需单独迁移验收。

### 对照复验命令

```bash
python -m pip install "gymnasium==1.1.1" "numpy==1.26.4"
python -m pip install "torch==2.5.1+cpu" --index-url https://download.pytorch.org/whl/cpu
python -m unittest discover -s tests -p "neural_contract_test.py" -v
python -m p3.compare_models --output build/p3-model-comparison.json --timing-output build/p3-model-timing.json
```

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
