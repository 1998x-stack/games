# RL-Adventure-2 · CPU Actor-Critic 策略训练

> **P3 · 2026-11-09 · 三算法等帧数 CI 成功；跨工作流复现差异待查**
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

## Notebook 风格 16 环境 n-step A2C 原规模实验

新增 `p3/vector_nstep_a2c.py`，使用 Gymnasium 1.1.1 的同步向量环境与 SAME_STEP 自动重置、真实 5 步自举回报、独立 256-ReLU 策略和价值网络，并在时间限制截断时使用实际最终观测而非重置观测。原 Notebook 是历史多进程实现；算法结构复现成功**不等于旧源代码逐行运行**。

每种子训练预算：**16 环境 × 5 步 × 4,000 更新 = 320,000 个环境交互**（等于原 Notebook 的 20,000 个向量步）。每个种子使用 64 局未参与 checkpoint 选择的留出测试：

| 训练种子 | 向量化 n-step A2C 留出奖励均值 |
|---|---:|
| 2026 | 481.891 |
| 2027 | 476.984 |
| 2028 | 466.641 |
| 跨种子均值 | **475.172** |
| 种子均值样本 SD | 7.785 |

[原始 CI、4 项契约测试及双重一致的完整结果 JSON](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42640528466)。原 25,600 次交互的短测跨种子均值为 41.287；两次预算和验证频率都不同，不能只把提升归因于更多交互，也不能和上文 480 完成训练回合预算的模型直接排名。

```bash
python -m pip install "gymnasium==1.1.1" "numpy==1.26.4"
python -m pip install "torch==2.5.1+cpu" --index-url https://download.pytorch.org/whl/cpu
python -m unittest discover -s tests -p "vector_a2c_contract_test.py" -v
python -m p3.vector_nstep_a2c --updates 4000 --eval-episodes 64
```

**后续缺口：** 原历史 `SubprocVecEnv` 并行实现复现、严格匹配所有方法的环境交互预算、多种子稳定性扩展与训练成本独立机器复测。

## 现代真实多进程 n-step A2C 对照

加入 AsyncVectorEnv 的独立子进程后端，与 SyncVectorEnv 共用同一套 16 环境、5 步 A2C 优势/梯度训练代码。测试真实子进程 PID、退出回收、时间截断 final_obs、SAME_STEP 重置与策略价值权重更新。

| 指标 | 同步后端 | 真实多进程后端 |
|---|---:|---:|
| 训练预算（seed 2026） | 320,000 环境交互 | 320,000 环境交互 |
| 64 局留出评估平均奖励 | **481.891** | **481.891** |
| 完整训练及评估耗时（单次 CI） | 59.755 秒 | 89.500 秒 |

除后端标识外，同步与多进程的训练/留出评估 JSON 字段完全一致；4 项进程/语义/权重测试成功。耗时是同一 GitHub CPU 机器顺序测量，不代表普遍多进程更慢。

[查看 GitHub Actions 成功记录与完整 JSON 工件](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42646793026)。

复现命令（原仓库根目录）：

    python -m unittest discover -s tests -p 'subprocess_a2c_contract_test.py' -v
    python -m p3.compare_vector_backends --seed 2026 --updates 4000 --eval-episodes 64

**边界：** 新后端是 Gymnasium AsyncVectorEnv，是真实进程但不是旧 Notebook 中依赖 Gym 四元组的 SubprocVecEnv 原样运行。两种执行后端已实现等交互预算；不同训练算法目前没有匹配环境交互预算，不应据现有均值排名。


## 三算法精确 320,000 训练帧对照

这次将原先按 **480 个完成回合** 训练的线性/小网络模型，统一改为按 **320,000 次真实环境交互** 训练，并与 16 环境 n-step A2C 使用相同 CartPole-v1、三训练种子和每种子 64 局留出评估。短预算契约测试覆盖硬截止、最终未完成回合标记、Actor/Critic 真实更新；完整实验在 CI 中执行两遍，结果 JSON 逐字节相同。

| 训练种子 | NumPy 线性 MC | PyTorch 小网络 MC | PyTorch 16 环境 n-step |
|---|---:|---:|---:|
| 2026 | 497.531 | 500.000 | 481.891 |
| 2027 | 495.078 | 498.062 | 476.984 |
| 2028 | 498.219 | 494.297 | 482.297 |
| 三种子均值 | **496.943** | **497.453** | **480.391** |
| 样本 SD | 1.651 | 2.900 | 2.957 |

[成功的等帧数工作流和原始工件](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42650112154)。

**解释边界：** CartPole 每局封顶 500，三种方法成绩接近上限。模型容量、优化器、更新次数仍不同；MC 方法在精确帧数终点强制截断并将余下回报当 0，n-step 则持续自举。0.510 分的均值差不能证明神经网络优于线性模型。所有计时仅为单次 GitHub CPU Runner 观察，不代表硬件标准化速度。

**跨工作流复现限制：** 历史单独的 n-step 种子 2028 平均奖励 **466.641**，而本次合并对照为 **482.297**；在另一小网络完整训练前后单独重复 n-step 仍是 **466.641**，[隔离 CI](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42653432398)。原因尚未查明，不能把“本工作流内重复一致”等同于跨训练顺序、跨作业上下文绝对一致。

```bash
python -m unittest discover -s tests -p "equal_frame_contract_test.py" -v
python -m p3.equal_frame_comparison --frames 320000 --eval-episodes 64
```

## 跨工作流可复现性：四组独立验证

历史等帧数工作流内的 n-step 种子 2028 曾给出 **482.297**，而独立训练 CI 为 **466.641**。两组结果各自重复一致，不能删除任一组来制造一致性。

| 审计范围 | 种子 2028 的实测结果 | CI |
|---|---|---|
| 同 Runner：独立调用 vs 联合入口（仅该种子） | 466.641 / 466.641，完整记录相同 | [调用路径](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42738486096) |
| 同 Runner：训练此前种子 2026、2027 后重复 2028 | 466.641 / 466.641，完整记录相同 | [种子顺序](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42739164734) |
| 同 Runner：完整三算法×三种子联合执行，2028 前后单独运行 | 三种调用均 466.641，完整记录相同 | [完整顺序](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42739564261) |
| 三个独立 Runner 运行同一 2028 | 三次均 466.641，完整记录相同 | [跨 Runner](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42739770887) |

后者三台 Runner 全部为 AMD EPYC 7763，同机完整顺序审计使用 AMD EPYC 9V45；所以这**不是完整的异构 CPU 对照**。旧记录差异原因未证实；PyTorch 确定性设置本身并不保证不同 CPU 指令集或运行平台上全部浮点操作逐位相同。

所有审计保留机器信息、原始结果和对照字段；项目卡“验证范围与限制”内新增可展开的 CI 历史链接。**后续任务：** 异构硬件测试、必要的数值算子轨迹差异定位；在完成前，保留“跨流程复现待查”标签。

## 运行

在原仓库根目录：

```bash
python -m pip install "gymnasium==1.1.1" "numpy==1.26.4"
python -m unittest discover -s tests -p "test_p3_*.py" -v
python -m p3.cartpole_actor_critic --seed 2026 --train-episodes 480 --eval-episodes 64 --output build/p3-single.json
python -m p3.benchmark --output build/p3-multiseed.json
```

**限制：** 三种子的样本标准差仅用于描述训练结果波动，不提供泛化性能保证或统计显著性声明；本项目其他 Notebook、GPU 训练及原历史多进程 A2C 还未逐行运行；现代 PyTorch n-step 教学实现已单独完成原规模环境交互测试。

[返回 Games 总目录](../../../README.md)
