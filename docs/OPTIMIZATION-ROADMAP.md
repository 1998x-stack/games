# Games Atlas · 35 项目优化路线图

> **版本：2026-11-09 · 状态：P1、P2、P3 均在推进；分别见 [P1](PHASE1-EXECUTION.md)、[P2](PHASE2-EXECUTION.md)、[P3](PHASE3-EXECUTION.md) 实证执行日志**
>
> **唯一核心优化点：可验证的游戏体验（Verifiable Playability）。**
> 不以“收录数、界面动画或 AI 宣称”替代用户实际能够找到、启动、操作与复现的结果。

## 1. 目标与当前事实

**终极用户路径：** 进入 [Games Atlas](../README.md) → 找到游戏 → 看懂其运行方式与限制 → 一键进入已验证的在线游戏，或按照经验证的本地命令运行 → 反馈问题。

### 当前基线（核查于 2026-11-09）

| 核查项 | 已核实结果 | 证据/限制 |
|---|---|---|
| 公开索引 | 35 个条目，分 7 类；每项有占位 README | [公开条目单一数据源](../data/games.json) |
| 分类规模 | 街机 7 / 益智 4 / 棋类 7 / 游戏 AI 6 / 环境 7 / 创作 2 / 教程 2 | 现有分类，主类唯一 |
| 文档标记 | 35 个 `verified`、0 个 `pending`（初建时为 28/7；仅说明阅读，不代表运行验收） | **verified 仅表示曾核对 README，非运行测试** |
| GitHub Pages | 最新 Actions 发布运行显示成功 | [成功运行](https://github.com/1998x-stack/games/actions/runs/42501165543)；未在此轮完成独立浏览器端到端访问验证 |
| 游戏可运行率 | **尚无可信基线** | 不把 README 的功能声明或 CI 配置当作实测运行 |
| 试玩链接与截图 | 未建立逐项、定期复核的公开证据记录 | 需要先做 P1 体验审计 |
| 异常样例 | Snake README 只有标题；Snake_Web 无根 README；MarioGame README 为空；math_game 的主入口位于 `old/`；数个已有 README 的项目仍显示 pending | 基于本轮上游公开文件与树结构检查；不是全面代码审计 |

**边界：** Games 仓库是门户，不是其他 35 个仓库的源码副本。若需要实际修改游戏逻辑，应在其各自原仓库发起独立提交/PR；此处管理元数据、入口、质量证据、展示和跨项目约束。不得从私有 catalog 目录同步未获批准的记录。

## 2. 唯一核心优化点：可验证的游戏体验

把泛化的“游戏链接”拆为互斥、基于证据的体验状态：

1. **已验证在线可玩**：正式 URL 实际可访问；在真实浏览器完成开始、输入、结算/重开（依项目玩法）并留存访问日期与截图/录屏或自动化报告。
2. **已验证本地运行**：在干净环境按公开 README 安装并启动；有真实命令、平台/版本与一次成功操作的测试记录。
3. **可复现实验/工具**：没有可玩 UI，但规则、训练、环境或生成链路有固定种子与可重复执行的最小实例。
4. **待核查/暂不可用**：证据缺失、环境无法搭建、版权前置未核查或上游入口失效，必须说明原因；禁止贴“可玩”标签。

一个项目只能凭**实际验证**提升状态，不能依赖仓库名、README 自述、静态代码扫描自动升档。体验状态与现有 `review`（仅文档核对）是两套独立概念。

### 统一最小交付标准（Definition of Done）

- **来源**：公开 GitHub URL、主类、真实运行入口、仓库默认分支或对应 commit、核对时间。
- **运行**：记录平台与命令；在线项目需浏览器 E2E；桌面项目需实际启动/关键路径；研究项目需最小可复现实验与固定 seed。
- **质量**：规则边界测试、失败与重开路径；核心玩法至少有冒烟测试。深度学习项目对比基线采用**相同环境版本、种子与回合数**，公开统计而非只晒单次最高分。
- **体验**：清晰的玩法/操作、运行成本、状态、限制及返回目录的导航。
- **安全/合规**：不得外泄密钥、私有数据或受限素材；原作品、ROM、音频及模型权利需独立核实。没有许可证不能推断可复制或重新部署。
- **审核证据**：每项任务要有链接到上游 commit/PR、测试日志或可复核记录；未执行时写“未验证”，失败时写“阻塞原因”。

## 3. 分批策略与优先级

| 批次 | 收录数 | 本批交付重点 | 进入下一批的门槛 |
|---|---:|---|---|
| **P1：体验入口与基础质量** | **10** | 以游戏本身为中心，纠正文档与入口、实测浏览器/桌面路径，先形成少量可信示范 | 10/10 有运行方式或阻塞说明；至少 **3 个经过真实浏览器验证的在线入口**作为努力目标；不得将未验证链接标可玩 |
| **P2：玩法完整性与游戏 AI 可信度** | **13** | 补齐剩余可玩项目，建立多智能体与博弈环境的规则/训练基准 | 13/13 有规则/实验最小验收或明确阻塞；五子棋跨项目判定一致；AI 对比有固定实验协议，不预设模型必须超越基线 |
| **P3：研究生态、创作工具与持续治理** | **12** | 固化环境、教程和生成工具的复现方式，将整个目录质量状态结构化 | 35/35 都有独立、可追溯的状态记录；无虚假可玩/性能宣传；CI 验证目录一致性与有证据的入口 |

> P1/P2/P3 是**执行优先级**，不是既成成果或承诺日期。允许因外部依赖、授权及平台限制调整顺序，但必须保留阻塞与变更记录。

## 第一批：体验入口与基础质量（10 项）

用户可直接找到并验证的核心游戏；优先处理纯静态网页与已有浏览器版本，避免在没有测试证据时承诺 Web 可玩。

| 项目 | 当前证据（未执行运行测试） | 优化行动 | 独立验收证据 |
|---|---|---|---|
| [space_ship](https://github.com/1998x-stack/space_ship) <small>（街机与动作）</small> | README 提及 pygbag / Pages 的太空射击 | 核验上游 Pages 真实访问，检查开始、键盘控制、波次切换和重新开始；失败时修复上游构建，再添加已验证入口。 | 真实浏览器完成一次开始→游戏→结束/重开，记录部署 URL、验证日期和截图。 |
| [Go](https://github.com/1998x-stack/Go) <small>（棋类与卡牌）</small> | 有围棋规则引擎、测试和浏览器构建工作流 | 核对 Web 版运行，优先复核禁入点、劫/超劫、双停终局和落子反馈；给目录提供明确的规则说明与可玩入口。 | 规则测试通过，浏览器落子、Pass、计分路径可复现；没有完成的规则要显式标注。 |
| [Snake_Web](https://github.com/1998x-stack/Snake_Web) <small>（街机与动作）</small> | 存在 index.html、style.css、js/，未找到根 README | 添加最小 README、操作说明和静态部署；检查触摸/键盘输入、食物生成、碰撞、计分与重新开始。 | 纯静态站点可打开，浏览器自动化覆盖启动、移动、碰撞及重启。 |
| [paint-maze-lab](https://github.com/1998x-stack/paint-maze-lab) <small>（益智与休闲）</small> | Python 本地服务 + Canvas；前端与求解器测试已存在 | 验证生成、提示、重置、求解和难度参数；区分必须由 Python API 提供的功能与可独立静态部署部分。 | 本地 HTTP、JS/Python 规则一致性和浏览器操作测试通过；未具备静态能力的功能不伪称 Pages 可玩。 |
| [2048](https://github.com/1998x-stack/2048) <small>（益智与休闲）</small> | Pygame 8×8 变体；已有纯逻辑测试 | 强化有效移动、一次合并、生成与终局边界用例；跑完整窗口冒烟测试；评估浏览器移植收益，但不作为首轮硬要求。 | 规则单测与启动/方向键/胜负反馈冒烟测试通过，提供真实本地启动命令。 |
| [TicTacToe](https://github.com/1998x-stack/TicTacToe) <small>（棋类与卡牌）</small> | 已有完整 README 与 unittest，但目录标记仍为 pending | 纠正项目元数据；覆盖轮换、非法落子、胜利、平局、重开，核对 README 与实际运行命令。 | 原仓库测试通过且能本地完成对局；目录状态与证据一致。 |
| [jump_jump](https://github.com/1998x-stack/jump_jump) <small>（街机与动作）</small> | 纯 Python headless 核心 + Pygame 视图及测试 | 固定随机种子测试重力、跳台碰撞、计分和失败/重启；再核对帧率无关的渲染行为。 | 固定场景轨迹可重放，headless 与实际窗口各通过一个冒烟场景。 |
| [Snake](https://github.com/1998x-stack/Snake) <small>（街机与动作）</small> | 仓库包含游戏代码及单测，但 README 只有标题 | 补齐安装、启动、操控和测试说明；验证蛇身增长、碰撞、自咬、计分和音频资源降级。 | README 命令可复现，现有核心单测通过，无音频设备环境下能明确诊断失败或正常运行。 |
| [flying_bird](https://github.com/1998x-stack/flying_bird) <small>（街机与动作）</small> | Pygame 飞鸟游戏，同时包含 DQN 实验代码 | 解耦可玩游戏与训练入口，验证点击/按键、障碍生成、碰撞、重置和资源加载。 | 桌面模式完成一轮游戏；基础碰撞与重置测试可自动执行。 |
| [pingpong](https://github.com/1998x-stack/pingpong) <small>（街机与动作）</small> | Pygame + Box2D 双人乒乓；有渲染测试 | 固化依赖安装，检查双人控制、球拍/边界碰撞、得分与重开，以及音频缺失时行为。 | 两名玩家的输入与至少一轮计分路径可复现；测试和启动命令有执行记录。 |

## 第二批：玩法完整性与游戏 AI 可信度（13 项）

补齐剩余玩法项目与专项游戏 AI 的基础工程质量，要求规则正确、实验可复现；不以模型宣传替代基准。

| 项目 | 当前证据（未执行运行测试） | 优化行动 | 独立验收证据 |
|---|---|---|---|
| [math_game](https://github.com/1998x-stack/math_game) <small>（益智与休闲）</small> | 仅发现 old/ 下的 Pygame 脚本，缺少仓库根入口和 README | 整理入口与包导入，明确题目生成、输入、计时、难度与错误反馈；视许可证情况保留旧目录作为历史版本。 | 从根目录按文档启动，固定题目种子下答案判定和超时逻辑测试通过。 |
| [xiao_xiao_le_game](https://github.com/1998x-stack/xiao_xiao_le_game) <small>（益智与休闲）</small> | 存在 main.py、game.py、素材及小写 readme.md | 规范 README 命名和依赖说明；测试三消匹配、连锁、计分与重开，审查图片/音频素材再分发条件。 | 可本地启动且完成消除回合；素材许可检查有记录。 |
| [MarioGame](https://github.com/1998x-stack/MarioGame) <small>（街机与动作）</small> | 有 Pygame 游戏源码与图片音效，README 为空 | 补足玩法、安装和测试；检查跳跃/碰撞/敌人/关卡终点，尤其核对角色及素材使用授权。 | 启动与关卡冒烟测试通过；版权不明确的素材不得自动发布到公开 Pages。 |
| [go_gym](https://github.com/1998x-stack/go_gym) <small>（棋类与卡牌）</small> | 围棋 Gymnasium 环境，含 selfplay_uct.py | 检查 reset/step/seed 的返回协议、合法落子掩码和终局奖励；与 Go 的规则测试做交叉比对。 | 固定种子两次轨迹一致，非法行动和双停终局有单测。 |
| [gomoku_zero](https://github.com/1998x-stack/gomoku_zero) <small>（棋类与卡牌）</small> | 已有较完整的 Exact-5 自对弈/训练 README，目录状态滞后 | 修正目录核对状态；对接 gomoku-exact5-env 并复核 MCTS、数据回放、模型 promotion 的最小流水线。 | 固定棋盘集上双方胜负与训练环境判定一致，CPU 小样本 pipeline 冒烟通过。 |
| [gomoku-exact5-env](https://github.com/1998x-stack/gomoku-exact5-env) <small>（棋类与卡牌）</small> | 有完整 README、规则模块和测试，目录仍标 pending | 同步元数据；针对 5 连胜、6 连不胜、非法落子和终局奖励加入边界/性质测试。 | 固定棋盘样例和随机种子测试可重复，和 gomoku_zero 的规则契约一致。 |
| [happyLandlord](https://github.com/1998x-stack/happyLandlord) <small>（棋类与卡牌）</small> | README 描述 2v2 斗地主强化学习 | 分离规则/牌型与训练层，检查合法动作、出牌轮转、结束判定、协作奖励。 | 固定牌局可重演，完整对局在 CPU 上结束并记录合法动作检查。 |
| [ddz-rl-lab](https://github.com/1998x-stack/ddz-rl-lab) <small>（棋类与卡牌）</small> | 独立无赌注斗地主环境、模型管理和本地 Arena | 复核 README 的具体分支/安装命令；验证本地竞技场与训练任务的超时、重试、保存恢复。 | 最小训练/对局任务成功或给出可复现阻塞记录；不宣称模型已收敛。 |
| [MCTS-SNAKE](https://github.com/1998x-stack/MCTS-SNAKE) <small>（游戏 AI）</small> | 含贪吃蛇 Gym 环境、MCTS 与监控 | 先验证与 Snake 规则一致，再固定种子比较 MCTS 与随机策略的存活/得分分布。 | 公布环境版本、种子、回合数和原始结果；未超过基线则如实呈现。 |
| [TetrominoDQN](https://github.com/1998x-stack/TetrominoDQN) <small>（游戏 AI）</small> | 俄罗斯方块 DQN 训练系统，支持人工操作 | 验证旋转、落块、行消除、奖励；建立随机策略与 DQN 的同条件评估脚本。 | 同组种子、同回合数输出平均分与方差；训练/推理/人工模式互不混淆。 |
| [Deep-RL-Arcade-Game](https://github.com/1998x-stack/Deep-RL-Arcade-Game) <small>（游戏 AI）</small> | Atari Breakout Dueling DQN，README 依赖旧版 TensorFlow/Gym | 隔离历史依赖，明确 Atari 环境/ROM 获取与授权，建立最小单回合训练及推理测试。 | 容器或受控环境中复现实验冒烟；ROM 不随仓库或 Pages 分发。 |
| [ball-marl](https://github.com/1998x-stack/ball-marl) <small>（游戏 AI）</small> | 球类多智能体环境，README 已说明不是正式游戏复现 | 验证 deterministic snapshot、奖励/质量守恒与动作约束；可选安装官方 PettingZoo 依赖执行合规测试。 | 环境一致性检查与预定 seed 轨迹通过，明确区分本地接口与正式 PettingZoo 认证。 |
| [Single-Player-MCTS](https://github.com/1998x-stack/Single-Player-MCTS) <small>（游戏 AI）</small> | 单玩家 MCTS 算法实现 | 补造可手工求最优解的极小搜索问题，测试选择/扩展/回传和终止条件。 | 固定搜索预算下找到已知最优解，给出随机基线与失败情况。 |

## 第三批：研究生态、创作工具与持续治理（12 项）

让研究型项目、创作工具和教程同样能被正确发现、复现或明确标注限制；将维护流程固化为轻量 CI。

| 项目 | 当前证据（未执行运行测试） | 优化行动 | 独立验收证据 |
|---|---|---|---|
| [RL-Adventure-2](https://github.com/1998x-stack/RL-Adventure-2) <small>（游戏 AI）</small> | 通用 RL 算法实现，不等同于可玩游戏 | 选择一个最小环境案例，固定 Python/PyTorch 版本，跑 CPU 端训练/评估 smoke。 | 保留可复现命令、版本与结果；仅作为游戏 AI 参考。 |
| [Arcade-Learning-Environment](https://github.com/1998x-stack/Arcade-Learning-Environment) <small>（游戏环境与基准）</small> | Atari 2600 游戏智能体环境 | 核实 ALE 安装、Gymnasium 适配与示例 episode，明确 ROM 权利边界。 | 接口 reset/step 能跑一轮，并记录实际所用环境/ROM 来源。 |
| [awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs) <small>（游戏环境与基准）</small> | 包含游戏及其他 RL 环境的大型资源列表 | 整理真正游戏相关子章节与外链健康度，区分直接可用和历史项目。 | 已选择的游戏链接有检查报告，不把整份目录当成游戏成品。 |
| [gym-envs](https://github.com/1998x-stack/gym-envs) <small>（游戏环境与基准）</small> | Gymnasium classic_control / toy_text 教学示例 | 选 FrozenLake、Blackjack 等场景检查 reset/step、seed 和奖励说明。 | 至少两个教材案例可重复运行，示例环境版本明确。 |
| [hok_env](https://github.com/1998x-stack/hok_env) <small>（游戏环境与基准）</small> | 王者荣耀 1v1 训练环境，Windows gamecore + Linux 交互 | 先调查平台、镜像及许可限制，再提供环境搭建矩阵；无授权/依赖时保留研究索引。 | 明确可复现实验前置条件与不可公开部署部分；不虚构在线试玩。 |
| [microrts](https://github.com/1998x-stack/microrts) <small>（游戏环境与基准）</small> | 面向 AI 研究的 Java 微型 RTS | 核查 Java 版本、运行入口、最小 AI 对局与单位行为，记录构建依赖。 | 单场本地对局可完整结束并产生结果。 |
| [universe](https://github.com/1998x-stack/universe) <small>（游戏环境与基准）</small> | 跨游戏、网站和应用的历史智能体平台 | 复核维护状态与现代依赖适配，标为历史/受限环境时解释原因。 | 能验证的最小例子附运行记录；无法运行的条目提供明确阻塞说明。 |
| [gym](https://github.com/1998x-stack/gym) <small>（游戏环境与基准）</small> | 通用 RL 环境 API，并非游戏本身 | 说明与 Gymnasium 版本差异，避免引导用户使用过时接口；提供最小兼容案例。 | 标准环境 reset/step 案例可运行，兼容性声明有版本依据。 |
| [ai-game](https://github.com/1998x-stack/ai-game) <small>（游戏创作工具）</small> | Next.js 游戏生成工作室，包含服务端 API 与测试 | 验证从输入→生成→沙箱预览的闭环；关注密钥、生成代码隔离和浏览器端安全。 | 测试通过且演示环境不暴露 API 密钥；不把服务端应用误当纯静态 Pages。 |
| [AI-Game-Generator](https://github.com/1998x-stack/AI-Game-Generator) <small>（游戏创作工具）</small> | Next.js 游戏生成与预览工具 | 测试提示词→生成→预览→修改循环，补充无密钥本地演示或录屏方案。 | 至少一个生成样例经浏览器测试，失败/超时/权限路径可复现。 |
| [Deep-Reinforcement-Learning-Hands-On](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On) <small>（教程与参考）</small> | 深度强化学习实战书籍配套代码 | 选一个面向游戏的最小案例核对安装与运行指令，并注明原书版本。 | CPU 或公开可用环境可复现一个案例，依赖差异有记录。 |
| [rainbow-is-all-you-need](https://github.com/1998x-stack/rainbow-is-all-you-need) <small>（教程与参考）</small> | DQN 到 Rainbow 的教学仓库 | 跑通基础 DQN 最小实验，核对示例、依赖及超参数与文字是否一致。 | 用固定 seed 复现基本运行，注明性能只作教学、不做泛化声称。 |

## 4. 具体执行顺序与产物

### P1 内部执行顺序

1. **先校准数据，不改游戏功能：** 逐项检查 10 项的入口、运行依赖、README、license、公开 URL 与现有 CI。给目录加明确的“在线/本地/研究/未验证”区分（初始状态默认未验证）。
2. **优先验证现成浏览器候选：** `space_ship`、`Go`、`Snake_Web`。前两者上游 README/工作流提及浏览器构建，后者存在纯静态 HTML/JS；这些只是**优先验证候选**，不等于本计划确认它们已在线可玩。
3. **再验证本地游戏与核心规则：** `2048`、`paint-maze-lab`、`TicTacToe`、`jump_jump`、`Snake`、`flying_bird`、`pingpong`，优先完善启动路径、关键规则和错误恢复，不把全部 Pygame 游戏强行移植为网页。
4. **门户只展示有证据的能力：** 游戏卡片展示类别、真实玩法/运行方式、验证日期、上游链接；已验证在线试玩按钮只在状态确认后出现。所有外链 `rel=noopener noreferrer`。

### P2 内部执行顺序

先修复 `math_game`、`xiao_xiao_le_game`、`MarioGame` 的文档/启动阻塞；随后同步 `gomoku-exact5-env` ↔ `gomoku_zero` 和 `go_gym` 的规则契约，再验证斗地主、贪吃蛇搜索、俄罗斯方块与 Atari AI 的基线。GPU、大型训练与专有 ROM 不列为默认 CI 前置条件。

### P3 内部执行顺序

研究环境先识别“能运行、历史环境、外部资源受限”的差别；生成工具先完成秘钥与沙箱安全核查；最后收敛目录字段与 CI，不擅自引入运行用户代码的在线服务或在 Pages 上部署需服务端密钥的 Next.js 应用。

## 5. 测量与验收看板

| 指标 | 口径 | 当前可证据值 | 目标/门槛 |
|---|---|---|---|
| 索引完整性 | 类别计数 = 条目总数；无重复条目 | 35 项 / 7 类，目录结构已存在 | 100% 一致，任何 PR 必须校验 |
| 体验状态覆盖率 | 已分配证据级别和运行限制的项目 / 35 | **35/35 已登记，但并非全已运行验证** | P1 完成后 10/35；P3 完成后 35/35 |
| 在线试玩有效数 | 浏览器完成真实玩法 E2E 的不同项目数 | 尚未独立验证 | P1 优先争取 ≥3；结果以证据为准 |
| 运行/实验复现数 | 全新环境中通过声明的 smoke / 有效项目数 | 已有 microRTS 单场完整对局和 FrozenLake 256 回合对照，但未覆盖所有项目 | P2 / P3 逐项统计，失败公开记录 |
| 失效/错误可玩声明 | 标称可玩但实际未验证或失败的链接 | 尚未审计 | 发布前 0 项 |
| CI 与 Pages | 目录一致性检查、Pages 工作流成功及真实网页访问 | 校验通过，最近 Pages 工作流成功；浏览器访问未独立确认 | 发布流水线保持绿灯并加站点 HTTP/E2E 冒烟 |

**验证分层：** 目录 JSON schema/一致性（快速 CI）→ GitHub 链接检查（低频避免 API 限流）→ 本地/模型 smoke（项目仓库自身 CI）→ 实际浏览器验证（Playwright 等，记录平台和测试日期）→ 发布后的访问抽样。任何一项失败时不覆盖掉历史失败记录。

**防止指标游戏化：** 不把点击次数、链接数量、Stars、README 字数或“模型训练已启动”当成游戏质量；AI 性能至少公布环境版本、种子集合、episode 数、基线与均值/方差，必要时说明置信范围。

## 6. 工作管理与风险处理

- **单一任务粒度：** 一项上游项目的最小可验证优化一个 PR；一个 Games 门户展示/元数据 PR 可合并多个纯文档变更。切勿在一次 PR 中混改多个无关的游戏引擎。
- **状态推进：** `未开始 → 证据核对中 → 实施中 → 待复验 → 已验收`；可随时进入 `阻塞` 并附环境/资源/授权原因。三批均已开始推进，部分上游修改已有 CI 证据；仍需按项目逐项完成最终运行和权限验收。
- **优先级依据：** 真实用户玩法价值 × 现有可运行证据 × 修复成本 × 版权和部署风险。优先低风险、可迅速核查的游戏入口；依赖 GPU/ROM/专有服务的平台不拖垮整个路线图。
- **权限边界：** 不复制第三方完整源码到 Games、不转储私有目录、不暴露 API 密钥、不随意公开游戏品牌素材；仅以公开链接和授权内容展示。
- **建议的最小持续维护：** 每个 PR 跑目录一致性检查；每次正式部署后复核网站；定期抽查已验证试玩链接，变更后重做关键路径。频率可以在实际维护资源确定后固化。

## 7. 接下来的优先改进

**继续缩小未验证项目范围，优先补非 ROM 的最小环境实验、生成服务无密钥/超时恢复以及 Pages 生产 URL 的独立访问检查。** 已验证的组件级 CI、单场对局和模型规划基线都保留明确范围，不升级为全项目可玩、深度模型性能或整体安全结论。

---

**本文件为三批总体计划，P1 / P2 / P3 都已启动。执行事实、失败和阻塞分别以 [P1](PHASE1-EXECUTION.md)、[P2](PHASE2-EXECUTION.md)、[P3](PHASE3-EXECUTION.md) 为准。** 以上“现状”基于当前公开 GitHub 文件、目录与工作流信息；尚未对 35 个项目进行逐个干净环境的实际运行、性能基准或完整授权审查。
