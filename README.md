# 🎮 1998x Games Atlas

[![Pages](https://github.com/1998x-stack/games/actions/workflows/pages.yml/badge.svg)](https://github.com/1998x-stack/games/actions/workflows/pages.yml)
[![Catalog validation](https://github.com/1998x-stack/games/actions/workflows/validate.yml/badge.svg)](https://github.com/1998x-stack/games/actions/workflows/validate.yml)

**一个面向游戏作品、游戏 AI、强化学习环境与游戏创作工具的公开项目索引。**  
*A curated, searchable directory of games, game AI, environments and creation tools.*

> [!NOTE]
> 本仓库是**分类索引与项目占位符**，**不是** 35 个项目的源码镜像。每个项目都保留到原始仓库的跳转链接；可运行性、授权方式与项目成熟度请以其上游仓库为准。

## 🌐 在线目录

**网站：<https://1998x-stack.github.io/games/>**（GitHub Pages 工作流已部署；正式公网的人工视觉验收仍与自动测试区分）。

新版网站支持多维检索、项目运行形态/CI 证据区分、深浅主题、移动端布局和原仓库/证据独立链接。设计与自动化验收见 [UI/UX 设计规范](docs/UI-UX-2026.md)。源码位于 [`site/`](site/)，详见 [Pages 部署说明](docs/PAGES.md)。

## 📊 收录概览

**35 个公开 GitHub 项目 · 7 个专题分类 · 35 份独立项目占位 README。** 条目由 [1998x-stack-catalog](https://github.com/1998x-stack/1998x-stack-catalog) 的 **2026-11-03 历史快照**筛选而来；这是一次性人工整理，**不是实时同步或全面质量认证**。

| 分类 | 数量 | 内容 |
| --- | ---: | --- |
| [🕹️ 街机与动作](categories/arcade-action/README.md) | 7 | 贪吃蛇、飞鸟、跳跃、平台动作、太空射击与乒乓 |
| [🧩 益智与休闲](categories/puzzle-casual/README.md) | 4 | 2048、数学游戏、消除与迷宫 |
| [♟️ 棋类与卡牌](categories/board-card/README.md) | 7 | 围棋、五子棋、井字棋、斗地主及对弈环境 |
| [🤖 游戏 AI](categories/game-ai/README.md) | 6 | MCTS、DQN、Atari 与多智能体博弈 |
| [🧪 游戏环境与基准](categories/game-environments/README.md) | 7 | Atari、RTS、王者荣耀环境与 RL 测试工具 |
| [🛠️ 游戏创作工具](categories/game-creation/README.md) | 2 | 自然语言生成 HTML5 游戏 |
| [📚 教程与参考](categories/learning-resources/README.md) | 2 | 强化学习实战与算法实现资料 |
| **合计** | **35** | **均附公开上游链接** |

## 🎯 三批优化计划

已制定针对全部 **35 个项目**的 [优化路线图](docs/OPTIMIZATION-ROADMAP.md)：以**可验证的游戏体验**为唯一核心目标，按 **P1 体验入口与基础质量（10 项）→ P2 玩法与游戏 AI（13 项）→ P3 研究工具及长期治理（12 项）**推进。每项均有当前证据、具体行动与独立验收标准；计划不代表项目已经实际运行或测试通过。

## 🧪 第一批：深度优化进行中

截至 2026-11-09，**8/10 个 P1 上游项目已实施代码优化并获得相应的 CI/构建证据**：Snake_Web、Snake、Go、2048、TicTacToe、jump_jump、flying_bird、pingpong。另外两个项目 space_ship、paint-maze-lab 具有既有的 Pages/浏览器验收证据，仍须完成正式体验复验。

**[逐项执行日志与真实证据](docs/PHASE1-EXECUTION.md)** · **[验收任务 Issue #1](https://github.com/1998x-stack/games/issues/1)**。

第一批的 **10 份项目占位页均已补齐运行指令、CI 证据与未通过的验收项**。主页同时呈现每项的原仓库和原始 CI 记录，清晰区分“测试通过”与“正式线上已经可玩”。**Snake_Web 和 Go 的独立 Pages 部署仍被仓库设置阻断**，不能视为线上已验收。

## 🧠 第二批深度优化 · P2 进行中

第二批覆盖 **13 个游戏、规则环境与 AI 研究项目**。[逐项 P2 执行日志](docs/PHASE2-EXECUTION.md) 与 [公开阶段数据](data/phase2.json) 均已建立。当前在 **math_game、xiao_xiao_le_game、MarioGame、gomoku-exact5-env、gomoku_zero、go_gym** 实施修复并获得新 CI 成功证据（6/13）；ddz-rl-lab、ball-marl 有历史成功记录，happyLandlord 存在历史失败 CI，余下 4 项尚无本轮运行验收。go_gym 的 CPU 规则回归及固定种子短局已通过；大棋盘训练仍待验。

新版 UI 将“桌面游戏”“浏览器候选”“本地 Web”“游戏 AI/研究环境”分开呈现，新增 **P1/P2/P3 批次筛选、失败/待验优先排序、可分享筛选链接及可展开的验证限制**。自动验证不等于真实上线可玩。

## 🔬 第三批深度优化 · P3 进行中

第三批覆盖剩余 **12 个研究环境、游戏生成工具与教程资源**。已对 [AI-Game-Generator](https://github.com/1998x-stack/AI-Game-Generator)、[gym-envs](https://github.com/1998x-stack/gym-envs)、[rainbow-is-all-you-need](https://github.com/1998x-stack/rainbow-is-all-you-need)、[microrts](https://github.com/1998x-stack/microrts)、[awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs) 实施并通过相应 CI 的工程改进；另在 [ai-game](https://github.com/1998x-stack/ai-game) 完成打包输入的符号链接安全回归、在 [Deep-Reinforcement-Learning-Hands-On](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On) 完成固定种子 CPU FrozenLake 基线；[RL-Adventure-2](https://github.com/1998x-stack/RL-Adventure-2) 也已通过三种子 CPU Actor-Critic 真实策略训练（合计 **8/12** 项取得本轮新 CI 证据）。完整服务端安全和深度模型训练尚未验收。

其中 microRTS 已在 Java 17 CI 中完成一场真实 AI 对局；FrozenLake 256 回合实验的价值迭代成功 195 局、随机策略成功 2 局；RL-Adventure-2 三种子线性 Actor-Critic 的跨种子均值为 425.739（样本 SD 52.606），新增现代 PyTorch CPU 神经网络同条件对照均值为 347.130（样本 SD 80.740）；两者不同架构，不能断言框架因果优劣，也不代表原历史 A2C Notebook 已复现；awesome-rl-envs 的 11 条引用仅做静态提取，尚未核查外链可用性。 AI-Game-Generator 的预览隔离另通过了 [实际 Chromium 浏览器测试](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42623528980)，但不代表整体生成服务已完成安全审计。

**A2C 原规模复现实证：** [RL-Adventure-2](https://github.com/1998x-stack/RL-Adventure-2) 新增 16 环境 × 5 步 × 4,000 次更新的 PyTorch n-step A2C（每种子 320,000 次交互），三种子留出评估奖励均值 **475.172**、样本 SD **7.785**；[原始成功 CI 与 JSON](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42640528466)。原多进程 Notebook 尚未逐行迁移，且不能和此前不同训练交互预算的模型直接排名。

**真实多进程补充验收：** [RL-Adventure-2 同步与真实 AsyncVectorEnv 对照](https://github.com/1998x-stack/RL-Adventure-2/actions/runs/42646793026) 在完全相同的 320,000 环境交互和 seed=2026 下，训练/留出评估 JSON 除后端字段外完全一致，64 局平均奖励均 **481.891**。现代子进程已核验，2018 年旧 Gym SubprocVecEnv 源码未原样运行，跨算法等环境交互对照仍待完成。

已建立 **35/35 项唯一阶段归属及可追溯运行状态**，包括受限 ROM、遗留依赖和需服务端的生成器。状态登记不等于生产可玩或实验已成功；详见 **[第三批完整执行日志](docs/PHASE3-EXECUTION.md)** 和 [P3 状态 JSON](data/phase3.json)。

## 🗂️ 仓库结构

```text
games/
├── README.md                     # 仓库入口与分类目录
├── data/games.json               # 35 项公开基础元数据
├── data/phase{1,2,3}.json        # 三批共 35 项证据状态
├── categories/
│   ├── arcade-action/
│   ├── puzzle-casual/
│   ├── board-card/
│   ├── game-ai/
│   ├── game-environments/
│   ├── game-creation/
│   └── learning-resources/
│       ├── README.md             # 各类别独立导航
│       └── <project>/README.md   # 项目占位页，不包含上游源码
├── site/                         # 纯静态 GitHub Pages 站点
├── scripts/build_site.py         # 数据校验与站点数据生成
├── docs/SELECTION.md             # 收录范围、审查依据、边界
├── docs/OPTIMIZATION-ROADMAP.md  # 35 项目三批优化与验收计划
├── docs/PHASE1-EXECUTION.md      # 第一批执行日志与测试证据
├── docs/PHASE2-EXECUTION.md      # 第二批 13 项运行/研究验收
├── docs/PHASE3-EXECUTION.md      # 第三批 12 项研究环境与安全验收
├── docs/UI-UX-2026.md           # UI 信息架构、设计 Token 与验收标准
├── docs/PAGES.md                 # 发布与故障排查
└── .github/workflows/            # CI + Pages 自动部署
```

## 🚀 本地预览

无需 Node/npm、数据库或第三方前端依赖；需要 Python 3.10+。

```bash
git clone https://github.com/1998x-stack/games.git
cd games
python3 scripts/build_site.py --check
python3 scripts/build_site.py
python3 -m http.server 8000 --directory site
```

浏览器打开 <http://localhost:8000/>。修改 `data/games.json` 或 `data/phase*.json` 后重新运行 `build_site.py`，同步 `site/data/catalog.json` 和三个阶段 JSON。

## 🧭 筛选与标记原则

- **只公开已知为 public 的项目**；不复制来源目录中的私有仓库名称、内部记录、审查材料或其他非公开元数据。
- 按**主要用途**确定唯一分类，防止同一个项目重复计数；游戏 AI、RL 环境、游戏工具与可玩游戏保持区分。
- **“已核对公开 README”**只表示整理时读过上游说明，**不代表**代码审计、可运行性验证或持续维护承诺；其余条目标记为**“待进一步复核”**。
- 对通用 RL、机器人、搜索与软件工程仓库，不因名称中出现 `rl`、`engine` 等字眼就自动收录。边界说明请看 [SELECTION.md](docs/SELECTION.md)。
- 任何上游项目的源码、名称、标识与许可证仍归相应权利人；添加索引**不代表**获得复制、再分发或商用授权。

## 🤝 维护与贡献

发现漏收、误分类、失效链接或描述不准确？欢迎通过 [Issues](https://github.com/1998x-stack/games/issues) 反馈。增加条目需同时更新公开元数据和对应项目占位页，并运行校验。具体规范见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

**English:** This repository collects **35 publicly accessible game-related GitHub repositories** in **7 clearly separated categories**. It publishes navigation, original links and lightweight placeholder READMEs—not upstream source code. The source was a snapshot dated **2026-11-03**. Pages deployment instructions and curation criteria are included in this repository.
