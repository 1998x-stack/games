# P3 · 研究环境、游戏生成工具与长期治理执行日志

> **2026-11-09 · 状态：进行中，12 项已完成初步证据审查和项目页更新。**
>
> 核心仍是 **可验证的游戏体验与可复现实验**，不是完成一轮大而全的“35 项都可在线玩”宣传。研发代码、历史环境和第三方受限平台必须区别对待。

## 本轮独立进度

| 口径 | 真实结果 |
|---|---:|
| 第三批计划项目 / 索引说明与下一步验收 | **12 / 12** |
| 已修改第三批上游源码且新 CI 成功 | **8 / 12** |
| 仅具历史成功 CI 记录、尚未复测 | **0 / 12**（ai-game 已进行本轮验证） |
| 无本轮成功运行或实验记录 | **4 / 12** |
| 真实公网生成器与完整训练性能验收 | **0**，不能由组件测试推断 |
| 全部 Games 项目已分配唯一阶段 | **35 / 35**（P1 10 + P2 13 + P3 12） |

## 八项项目的工程交付与扩展验证

**1. [AI-Game-Generator](https://github.com/1998x-stack/AI-Game-Generator)**：不受信任的生成 HTML 曾使用 `sandbox="allow-scripts allow-same-origin"`，可能使 srcdoc 脚本继承应用来源权限。现改为仅允许脚本、使用不透明源，校验 `postMessage` 的确切 iframe 发送者并限制错误消息长度。新增静态契约/TypeScript CI，并在原 Next.js 组件上执行 **2 项真实 Chromium 浏览器测试**，验证沙箱不能读取父 DOM/localStorage 及错误来源消息的拒绝。[Chromium 成功记录](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42623528980) · [静态契约记录](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42619929546)。**限制：** 此测试覆盖预览隔离边界，不能代表生成服务、密钥、沙箱子依赖或全平台安全审计。

**2. [gym-envs](https://github.com/1998x-stack/gym-envs)**：FrozenLake/Blackjack 两个教学环境转为现代 Gymnasium `reset(seed)` 与五元组 `step()`；替换全局 RNG、补终局后动作保护和完整回合、`check_env` 测试。[本轮成功记录](https://github.com/1998x-stack/gym-envs/actions/runs/42620238372)。**限制：** 没有宣称其余 classic_control/toy_text 全面兼容。

**3. [rainbow-is-all-you-need](https://github.com/1998x-stack/rainbow-is-all-you-need)**：修复 `segment_tree.py` 半开区间及 `retrieve` 采样边界，以固定随机种子、空树、零概率叶与权重分布单测验证。[本轮成功记录](https://github.com/1998x-stack/rainbow-is-all-you-need/actions/runs/42620461728)。**限制：** 未复现 Notebook 的 DQN/Rainbow 模型训练或 Atari 性能。

**4. [microrts](https://github.com/1998x-stack/microrts)**：Java 17 CI 编译反射加载的 WorkerRush、LightRush AI，并运行真实 8×8 引擎对局，**205 周期正常终局，winner=0**。[原始成功对局](https://github.com/1998x-stack/microrts/actions/runs/42622693078)。**限制：** 单局完整游戏结果不能代表模型强弱比较，AI JAR 的再分发权利需独立核对。

**5. [awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs)**：仅从上游 README 的 Games 章节提取 11 个链接为独立 JSON，使用固定解析、去重、HTTPS 检查和原文一致性 CI。[原始成功记录](https://github.com/1998x-stack/awesome-rl-envs/actions/runs/42623240121)。**限制：** 未对 11 个目的站进行联网健康度、安装、ROM 或授权检查，亦不增加 Games 35 项顶层计数。

**6. [Deep-Reinforcement-Learning-Hands-On](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On)**：保留原书旧版 Gym 代码，独立新增 Gymnasium 1.1.1 的 CPU-only FrozenLake 价值迭代对照。固定 4×4 slippery 地图、seed=2026、256 回合，价值迭代成功 **195/256（76.17%）**，随机策略成功 **2/256（0.78%）**，两次 JSON 结果一致。[原始实验与工件](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On/actions/runs/42630664159)。**边界：** 这是模型规划基线，不是书中神经网络训练或全部章节的运行验收。

**7. [ai-game](https://github.com/1998x-stack/ai-game)**：修复构建器读取符号链接脚本或素材时可能跨出游戏工作区的路径，增加外部临时文件/目录的拒绝回归测试和具体错误保留。完整 Verify CI 的类型检查、Lint、单测、生产构建及浏览器冒烟通过。[本轮完整验证](https://github.com/1998x-stack/ai-game/actions/runs/42631295419) · [既有历史记录](https://github.com/1998x-stack/ai-game/actions/runs/39938832001)。**边界：** 不代表完整服务端密钥、身份验证或其他生成流程均通过安全审计。


**8. [RL-Adventure-2](https://github.com/1998x-stack/RL-Adventure-2)**：保留原历史 A2C Notebook，新建 NumPy 线性 Actor-Critic + Gymnasium 1.1.1 的真实 CPU 策略/价值函数训练。三个预设独立种子 2026/2027/2028，每种子 480 局训练、64 局留出评估：训练后奖励均值 **382.109 / 410.953 / 484.156**，跨种子均值 **425.739**、样本标准差 **52.606**；随机策略均值 **23.234 / 21.734 / 21.688**，平均差距 **403.521**。验证训练权重变化、JSON 两次完全一致，并留存每种子结果。[成功训练工作流与 JSON 工件](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42634426202)。**限制：** 这是 NumPy 线性模型的算法教学基线，而不是原 PyTorch 深度 A2C 或 PPO 训练。

**9. [RL-Adventure-2 · 同环境模型对照](https://github.com/1998x-stack/RL-Adventure-2)**：加入 PyTorch CPU 双网络神经 Actor-Critic（5-32-2 actor、5-32-1 critic，共 483 个参数），与 NumPy 线性 Actor-Critic（15 个参数）使用相同 CartPole-v1、训练和测试种子、480 局训练预算、每种子 64 局独立留出集进行对照。预定三种子 2026/2027/2028：NumPy 线性模型测试奖励 **382.109 / 410.953 / 484.156**（跨种子均值 **425.739**，样本 SD **52.606**）；PyTorch 网络 **324.297 / 280.266 / 436.828**（均值 **347.130**，样本 SD **80.740**）。本次线性模型成绩较高。CI 同机顺序计时（每种子完整训练、验证和评估）：线性约 **4.54 秒**，网络约 **12.21 秒**；依赖安装不计时。两个完整对照 JSON 字节一致、3 项 PyTorch 真实梯度/环境回归测试通过。[成功 CI、实验与耗时 JSON](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42637469330)。**边界：** 架构、优化器、模型参数量和精度均不同，不能将差异解释为 NumPy 框架固有优势；并非历史 Notebook 的向量化 n-step A2C 复刻。历史 CI 初次失败（测试依赖隔离、概率归一化）已修正并保留记录。

**10. [RL-Adventure-2 · 原 Notebook n-step A2C 结构复现](https://github.com/1998x-stack/RL-Adventure-2)**：新增现代 PyTorch CPU 实现，保留原示例 **16 个环境、5 步折扣自举、独立 256-ReLU Actor/Critic 与熵正则**。按原 Notebook 的 20,000 个向量步训练（**320,000 次真实环境交互/种子**），使用 SAME_STEP 自动重置及正确的时间截断末状态自举。预定三种子 2026/2027/2028：在各 64 局独立留出集上的平均奖励为 **481.891 / 476.984 / 466.641**，跨种子均值 **475.172**，样本 SD **7.785**。**4 项测试通过，完整实验双重 JSON 字节一致**；原规模单种子 CI 耗时约 35 秒，依赖安装不计时。[成功 CI 与逐种子 JSON](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42640528466)。此前只有 25,600 次交互/种子的 smoke 得分均值 41.287，说明短预算并未充分评估学习能力，且本轮同时降低了验证频率，不能证明提升仅源于交互次数。**边界：** 新代码为 Gymnasium `SyncVectorEnv`，不是 2018 年原 `SubprocVecEnv` 的逐行复刻；早先线性模型、较小神经网络用 480 个完整训练回合作预算，不能据不同交互量直接排名。

**11. RL-Adventure-2 · 真实多进程向量后端等价性验收**：新建 Gymnasium 1.1.1 AsyncVectorEnv（spawn 独立工作进程）与已有 SyncVectorEnv 的严格对照。4 项自动测试检查子进程 PID/退出清理、SAME_STEP 时间截断的 final_obs、短训练 Actor/Critic 权重更新。对预设 seed=2026，双方使用相同 16 环境 × 5 步 × 4,000 更新 = **320,000 次真实环境交互/后端**；训练记录与 64 局留出评估 JSON 除后端标识外**逐字段完全一致**，均得 **481.891** 平均奖励。[完整成功 CI、对照与时间工件](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42646793026)。此次 GitHub 单机先同步后异步计时 **59.755 秒 vs 89.500 秒**（含验证/评估，不含依赖安装），不能据此概括跨硬件性能。**注意：** 这是现代 Gymnasium 的真实多进程替代方案，不是历史 common/multiprocessing_env.py 的旧 Gym 四元组源码逐行复现；三种不同算法的训练预算仍未统一为等环境交互量。


**12. RL-Adventure-2 · 三种算法严格等环境交互对照**：在同一 Gymnasium 1.1.1 CartPole-v1 上，按预先设定的三个训练种子（2026/2027/2028），分别对 NumPy 线性 MC Actor-Critic、PyTorch 小网络 MC Actor-Critic 和 16 环境 n-step A2C 执行**每种算法/每种子恰好 320,000 次训练交互**、64 局固定种子留出评估。结果均值分别 **496.943±1.651、497.453±2.900、480.391±2.957**（± 是三个种子均值的样本标准差）。完整三模型实验跑两遍，确定性 JSON 逐字节一致。[原始完整 CI 与分种子 JSON](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42650112154)。**限制：** CartPole 奖励上限 500，三个方法已接近饱和，线性与小网络均值相差仅 0.510；不同架构、优化器和更新频次不可据此得因果排名。单环境 MC 方法在训练预算末端人为截断且不自举，n-step 方法按批次自举，评价协议虽共享种子但训练轨迹不同。**另外发现跨工作流不一致**：n-step 种子 2028 在原独立 CI 为 466.641，本轮联合作业为 482.297；单独再现另一神经网络训练前后均为 466.641，[隔离审计 CI](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42653432398)，原因仍未确认。**因此只能声明同一完整工作流内部重跑一致，不能宣称任意调用顺序的跨工作流完全确定。**

## 12 项清单：证据、限制与下一步

| 项目 | 角色与当前验收等级 | 下一项最小独立验收 | 原始证据 |
|---|---|---|---|
| [RL-Adventure-2](https://github.com/1998x-stack/RL-Adventure-2) | 游戏 AI · **三算法等 320k 交互多种子对照 CI 成功** · 跨工作流 seed=2028 的 n-step 差异尚未解释 | 隔离调用路径和全局随机状态，进一步进行真实算法容量/优化器消融；不再按不同训练帧数比较。 | [等帧数三算法 CI](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42650112154) · [跨流程随机性审计](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42653432398) · [同步/多进程一致 CI](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42646793026) |
| [Arcade-Learning-Environment](https://github.com/1998x-stack/Arcade-Learning-Environment) | 研究环境 · **本轮未完成运行** · 第三方资源/平台受限 | 先核实 ROM 合法来源、ALE/Gymnasium 安装版本，再做单回合 step/reset；禁止打包任何第三方 ROM。 | 本轮暂无成功运行记录 |
| [awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs) | 教学资源 · **目录导出 CI 通过；目的站未核查** · 不是静态试玩产品 | 对 11 个目标网站做带日期的健康度与权利审查；只声明当前通过目录提取校验。 | [CI 1](https://github.com/1998x-stack/awesome-rl-envs/actions/runs/42623240121) |
| [gym-envs](https://github.com/1998x-stack/gym-envs) | 研究环境 · **两个教学环境协议测试通过** · 不是静态试玩产品 | 剩余经典控制示例逐个从旧 Gym 迁移；保持本轮仅两款 Toy Text 环境验收口径。 | [CI 1](https://github.com/1998x-stack/gym-envs/actions/runs/42620238372) |
| [hok_env](https://github.com/1998x-stack/hok_env) | 研究环境 · **本轮未完成运行** · 第三方资源/平台受限 | 确认 Windows gamecore、Linux actor、镜像、训练资源的许可证/系统依赖，建立权限和版本矩阵。 | 本轮暂无成功运行记录 |
| [microrts](https://github.com/1998x-stack/microrts) | 研究环境 · **真实 AI 对局 CI 通过** · 不是静态试玩产品 | 固定地图/AI 后补多组 seed 与双向对照，记录胜率、时长和离散性；单局不算性能基准。 | [CI 1](https://github.com/1998x-stack/microrts/actions/runs/42622693078) |
| [universe](https://github.com/1998x-stack/universe) | 研究环境 · **本轮未完成运行** · 历史依赖可能不兼容 | 建立隔离的历史运行矩阵；若不能运行，公开阻塞条件，不给“现代 Gym 兼容”标签。 | 本轮暂无成功运行记录 |
| [gym](https://github.com/1998x-stack/gym) | 研究环境 · **本轮未完成运行** · 历史依赖可能不兼容 | 核对旧 Gym 与 Gymnasium 的 API 差异，提供并行示例而不是迁移整个上游历史源码。 | 本轮暂无成功运行记录 |
| [ai-game](https://github.com/1998x-stack/ai-game) | 游戏创作工具 · **本轮打包安全回归与 Verify CI 成功** · 依赖服务端配置与密钥 | 继续审查会话隔离、无密钥失败/超时及整个生成服务的安全边界。 | [本轮完整 CI](https://github.com/1998x-stack/ai-game/actions/runs/42631295419) · [历史 CI](https://github.com/1998x-stack/ai-game/actions/runs/39938832001) |
| [AI-Game-Generator](https://github.com/1998x-stack/AI-Game-Generator) | 游戏创作工具 · **Chromium 预览隔离测试通过** · 依赖服务端配置与密钥 | 扩展跨域网络请求、构建超时和身份/密钥路径测试；现只认证预览来源隔离。 | [浏览器 CI](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42623528980) · [静态契约](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42619929546) |
| [Deep-Reinforcement-Learning-Hands-On](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On) | 教学资源 · **256 回合 CPU 规划/随机对照实验通过** · 其他章节仍为历史依赖 | 在保留原书代码的条件下验证其他无 ROM 章节，不把本实验等同深度 RL 训练。 | [固定种子评估 CI](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On/actions/runs/42630664159) |
| [rainbow-is-all-you-need](https://github.com/1998x-stack/rainbow-is-all-you-need) | 教学资源 · **优先经验回放组件测试通过** · 历史依赖可能不兼容 | 固定 DQN/Rainbow Notebook 的 Torch/Gym 组合，开展最小同种子训练并记录基线；不要继承过期依赖保证。 | [CI 1](https://github.com/1998x-stack/rainbow-is-all-you-need/actions/runs/42620461728) |

## 门户与 CI 同步

[站点](https://1998x-stack.github.io/games/) 把阶段状态放在公开 `data/phase1.json`、`data/phase2.json`、`data/phase3.json`，但 35 项基础目录始终独立保存在 `data/games.json`。新 CI `scripts/build_site.py --check` 强制验证：

- P1 = 10、P2 = 13、P3 = 12，集合**无重复且并集严格等于全部 35 项**；
- 阶段数据只包含公开白名单字段、状态/运行类型及 GitHub CI 链接，页面包含可追溯来源；
- 网站卡片为历史依赖、受限 ROM、服务端生成器和未验证项目展示差异化状态；
- P3 数据缺失时不把“暂无证据”误显示为“已在线可玩”；
- 浏览器验收继续覆盖响应式布局、深浅色主题、筛选器和安全外链。

## 关键外部约束

**ROM 与角色游戏素材：** ALE、Atari 相关项目、hok_env 的 gamecore 都可能需要额外授权；有环境源码并不代表有权传播游戏本身。**服务端 AI 工具：** `ai-game` 和 `AI-Game-Generator` 有后端和敏感配置，不应当作为纯静态 GitHub Pages 拷贝。**历史环境：** `gym`、`universe`、部分 DQN 教材依赖旧 API；需要版本矩阵或注明不可复现。

## 第三批验收条件

- [x] 全部 12 项的身份、公开上游链接、运行/版权风险、下一项验收已登记
- [x] 八项实际工程改进取得公开 CI 证据（含 RTS 对局、FrozenLake 256 回合对照、游戏打包安全回归和静态链接索引）
- [x] 全 35 项阶段数据与静态站点统一校验，阶段没有重复
- [x] microRTS 对局、FrozenLake 256 回合规划基线、RL-Adventure-2 三算法 320k 等交互三种子对照及真实 AsyncVectorEnv 子进程等价性（跨工作流 seed2028 复现差异仍待解释；旧源码兼容未验）
- [x] AI 生成器实际 Chromium 预览隔离检查（2 项测试）
- [ ] 生成器无密钥失败/超时路径及全服务隔离审查（仅 ai-game 打包输入的链接边界已完成）
- [ ] 受限资源的合法来源与系统矩阵审查
- [ ] Games 11 个外链目的站的联网健康度、许可与定期复核（静态提取 CI 已通过）
- [x] GitHub Pages 发布前 13 项 Playwright 测试、发布后公网六文件与 Git commit 字节一致性自动核查（不等于人工无障碍/触控验收）

本批任务只有达到对应的真实复现条件才可关闭；**35/35 状态登记不代表 35/35 项目质量验收完成。**

[返回目录](../README.md) · [三批计划](OPTIMIZATION-ROADMAP.md)
