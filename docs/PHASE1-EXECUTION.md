# P1 · 第一批深度优化执行与验收记录

> 记录日期：**2026-11-09** · **状态：进行中。**
>
> **唯一目标：可验证的游戏体验。** 本页基于真实 GitHub 源码提交与工作流结果，不以“构建成功”替代上线后的手工或自动化体验验收。

## 一、量化进度与严格口径

| 指标 | 当前结果 | 含义 |
|---|---:|---|
| 第一批覆盖 | **10 / 10** | 10 项均有分类页、可复核来源/启动说明和原始 CI 证据 |
| 已实际修改上游游戏源码/工作流 | **8 / 10** | 不为凑数字而修改另外两项已有较好测试的项目 |
| 有公开 CI 构建、规则或浏览器测试成功证据 | **10 / 10** | 其中部分是历史工作流，非本轮重新运行 |
| 已修改项目的完整工作流通过 | **6 / 8** | Go 与 Snake_Web 的测试/构建步骤成功，但完整 Pages 工作流失败，尚不能算部署成功 |
| 正式生产网页端到端玩法已独立验收 | **0 项** | 尚未完成生产浏览器交互与截图/录像证明 |
| 仓库 Pages 设置阻塞 | **2 项** | Go 与 Snake_Web；工作流无法代替仓库设置 |
| 目录 README 说明阅读状态 | **30 verified / 5 pending** | 仅表示 README 证据阅读，不代表实际运行通过 |

**明确区分：** 虚拟 SDL 单元测试、浏览器 CI、Pages 构建与生产网站实际可玩是不同层级。“已通过 CI”没有自动晋升为“正式可玩”。

## 二、逐项目实施与独立证据

| 项目 | 实施 / 审查的最关键工作 | 原始证据 | 未完成的最终验收 |
|---|---|---|---|
| [Snake_Web](https://github.com/1998x-stack/Snake_Web) | [上游提交](https://github.com/1998x-stack/Snake_Web/commit/73bb7368bae050a80db40eb0d8daa2a52a4d451b)：规则与触控逻辑、浏览器冒烟、页面重开 | [运行 1](https://github.com/1998x-stack/Snake_Web/actions/runs/42540673921) | Pages 未启用，需要在仓库设置中选择 GitHub Actions 并重跑；随后完成正式 URL 实操 |
| [Snake](https://github.com/1998x-stack/Snake) | [上游提交](https://github.com/1998x-stack/Snake/commit/6344f604ebb11665e92a756759f5fde6a5aea80c)：单步增长、有限网格食物生成、碰撞与重开 | [运行 1](https://github.com/1998x-stack/Snake/actions/runs/42540848635) | 仍需真实物理桌面/输入/音频验收 |
| [Go](https://github.com/1998x-stack/Go) | [上游提交](https://github.com/1998x-stack/Go/commit/d5c3a7fd9b2f51fd5a260ebd74ebc3e684694360)：pygbag 非交互式构建及产物检查 | [运行 1](https://github.com/1998x-stack/Go/actions/runs/42541002385) · [运行 2](https://github.com/1998x-stack/Go/actions/runs/42541002361) | Pages 未启用，需要在仓库设置中选择 GitHub Actions 并重跑；随后完成正式 URL 实操 |
| [2048](https://github.com/1998x-stack/2048) | [上游提交](https://github.com/1998x-stack/2048/commit/868b27ad30a8dacfc6d8d3277391123fb5a7a006)：终局后 R 重新开局、两块初始砖的集成验证 | [运行 1](https://github.com/1998x-stack/2048/actions/runs/42548197692) | 仍需真实物理桌面/输入/音频验收 |
| [TicTacToe](https://github.com/1998x-stack/TicTacToe) | [上游提交](https://github.com/1998x-stack/TicTacToe/commit/66e864348ce696114063e9122f5ed861ef52e844)：状态重置、胜负保留、输入和退出、可选音频 | [运行 1](https://github.com/1998x-stack/TicTacToe/actions/runs/42547547540) | 仍需真实物理桌面/输入/音频验收 |
| [jump_jump](https://github.com/1998x-stack/jump_jump) | [上游提交](https://github.com/1998x-stack/jump_jump/commit/0d30eae5743da5e8a52bddef5f0e748a9b473a1c)：私有种子 RNG 与并行模拟确定性 | [运行 1](https://github.com/1998x-stack/jump_jump/actions/runs/42547633031) | 仍需真实物理桌面/输入/音频验收 |
| [flying_bird](https://github.com/1998x-stack/flying_bird) | [上游提交](https://github.com/1998x-stack/flying_bird/commit/7c4b68883778abb6056e7bd5cbcd4497d6854a92)：重开、无界面规则模拟、可选音频与图像初始化隔离 | [运行 1](https://github.com/1998x-stack/flying_bird/actions/runs/42547834922) | 仍需真实物理桌面/输入/音频验收 |
| [pingpong](https://github.com/1998x-stack/pingpong) | [上游提交](https://github.com/1998x-stack/pingpong/commit/7aa058e702c47f22b7423ac6f1d1bd74070f98dc)：真实 Box2D 左右球拍碰撞方向、一次施力、边界钳制 | [运行 1](https://github.com/1998x-stack/pingpong/actions/runs/42548050012) | 仍需真实物理桌面/输入/音频验收 |
| [space_ship](https://github.com/1998x-stack/space_ship) | 保留现有成功的 pygbag Pages 构建，不做无依据的大改 | [运行 1](https://github.com/1998x-stack/space_ship/actions/runs/42237371518) | 仍需正式 URL 开始/操作/结算/重开 E2E |
| [paint-maze-lab](https://github.com/1998x-stack/paint-maze-lab) | 保留已经通过的浏览器验收与 Python API 约束，不强行改为纯静态站点 | [运行 1](https://github.com/1998x-stack/paint-maze-lab/actions/runs/40991015829) | 仍需实际本地服务器和 API/浏览器一致性复测 |

## 三、门户与长期维护改动

- 对 [35 项公开目录](../data/games.json) 与 [10 项 P1 状态](../data/phase1.json) 分别建模；`review` 不复用为游戏可玩状态。
- P1 的每个项目页面都附上实际安装/启动命令、测试证据链接和仍需验证的范围。
- [Games 首页](https://1998x-stack.github.io/games/) 的卡片展示“桌面游戏/本地 Web/浏览器候选”等类型，并分别提供**上游仓库**和**原始验证记录**链接。
- `scripts/build_site.py --check` 验证 P1 类型、公开安全链接和项目页证据链接的一致性。
- `tests/site.spec.cjs` 以 Playwright 测试目录搜索、分类、状态和证据链接，并确保不会错误宣称上线可玩。
- Games Pages 的 Actions 构建和站点 CI 已成功；由于本次无法独立操作生产网站，这**不等于**已经通过公网浏览器端到端验证。

## 四、阻塞与优先队列

1. **Go / Snake_Web：** [Go Pages 设置](https://github.com/1998x-stack/Go/settings/pages) 与 [Snake_Web Pages 设置](https://github.com/1998x-stack/Snake_Web/settings/pages) 必须选择 **GitHub Actions** Source。既有 Actions 尝试自动创建 Pages site 曾返回 `Resource not accessible by integration`；提交代码无法绕过此仓库设置权限。
2. **space_ship：** [已有成功 Pages 构建记录](https://github.com/1998x-stack/space_ship/actions/runs/42237371518)，下一步在正式 URL 使用真实浏览器检查移动、攻击、波次、暂停/重开与错误恢复。
3. **paint-maze-lab：** [已有浏览器验收 CI](https://github.com/1998x-stack/paint-maze-lab/actions/runs/40991015829)；继续测生成/提示/重置与 Python API 的一致性，并明确本地服务器前置条件。
4. **全部桌面游戏：** CI 已有覆盖，但需按目标 OS/显示/输入/音频设备执行物理验收。先做低成本缺口测试，再决定是否需要网页移植。

## 五、批次完成条件

- [x] 十项均有明确项目身份、启动方式、证据或限制说明
- [x] 当前可获得的源码/规则缺陷已进行针对性的测试驱动改进
- [x] Games 门户的原仓库、CI 证据、状态展示同步
- [ ] Snake_Web 与 Go Pages 部署恢复成功
- [ ] 至少三款游戏的正式网页版本完成实际浏览器交互验收（原计划的努力目标；不预设必定能实现）
- [ ] 桌面项目完成目标环境输入/结算/重开抽样，并保留可复核记录
- [ ] 单项若受授权、硬件或服务阻塞，记录失败条件与替代运行方式，绝不假称通过

继续在 [P1 验收任务 Issue #1](https://github.com/1998x-stack/games/issues/1) 跟踪，不提前关闭。

[返回 README](../README.md) · [三批路线图](OPTIMIZATION-ROADMAP.md)
