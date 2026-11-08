# 🎮 1998x Games Atlas

[![Pages](https://github.com/1998x-stack/games/actions/workflows/pages.yml/badge.svg)](https://github.com/1998x-stack/games/actions/workflows/pages.yml)
[![Catalog validation](https://github.com/1998x-stack/games/actions/workflows/validate.yml/badge.svg)](https://github.com/1998x-stack/games/actions/workflows/validate.yml)

**一个面向游戏作品、游戏 AI、强化学习环境与游戏创作工具的公开项目索引。**  
*A curated, searchable directory of games, game AI, environments and creation tools.*

> [!NOTE]
> 本仓库是**分类索引与项目占位符**，**不是** 35 个项目的源码镜像。每个项目都保留到原始仓库的跳转链接；可运行性、授权方式与项目成熟度请以其上游仓库为准。

## 🌐 在线目录

**GitHub Pages 预期地址：<https://1998x-stack.github.io/games/>**（首次启用时需在 **Settings → Pages → Source** 选择 **GitHub Actions**；以实际部署状态为准）。

网站支持中文分类导航、搜索、类型筛选、响应式卡片与原仓库直达。源码位于 [`site/`](site/)，详见 [Pages 部署说明](docs/PAGES.md)。

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

## 🗂️ 仓库结构

```text
games/
├── README.md                     # 仓库入口与分类目录
├── data/games.json               # 单一可信来源：公开项目元数据
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

浏览器打开 <http://localhost:8000/>。修改 `data/games.json` 后重新运行 `build_site.py`，生成 `site/data/catalog.json`。

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
