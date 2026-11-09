# P1 · 第一批深度优化执行日志

> **核查：2026-11-09 · 状态：进行中，10 项中已有 3 项上游代码变更，7 项仍待推进。**
>
> 目标是 **可验证的游戏体验**，不是十项仓库都换一个 README。所有项目保留独立源仓库，本门户负责汇总证据和准确导航。

## 当前实际进度

| 项目 | 上游实际改动 / 基础证据 | 测试证据 | 尚存问题 / 下一步 |
|---|---|---|---|
| [Snake_Web](https://github.com/1998x-stack/Snake_Web) | [贪吃蛇规则与触控重构](https://github.com/1998x-stack/Snake_Web/commit/fac9a0edc5e900bcfea6c8f075e28238f12e1860)，[Chromium E2E](https://github.com/1998x-stack/Snake_Web/commit/73bb7368bae050a80db40eb0d8daa2a52a4d451b) | [9 个规则用例 + 2 个真实浏览器用例通过](https://github.com/1998x-stack/Snake_Web/actions/runs/42540673921) | **仓库 Pages 尚未启用，configure-pages 失败**；需设置 Source=GitHub Actions 并重跑，且最终线上 URL 仍需实操核验 |
| [Snake](https://github.com/1998x-stack/Snake) | [增长/碰撞/重开/尺寸修复和新 CI](https://github.com/1998x-stack/Snake/commit/6344f604ebb11665e92a756759f5fde6a5aea80c) | [unittest + 虚拟 SDL CI 成功](https://github.com/1998x-stack/Snake/actions/runs/42540848635) | 暂无真实物理桌面的输入和音频验收；历史 AdvancedGame 模式另行测试 |
| [Go](https://github.com/1998x-stack/Go) | [pygbag 改为 --build，限定超时，增加产物检查](https://github.com/1998x-stack/Go/commit/d5c3a7fd9b2f51fd5a260ebd74ebc3e684694360) | [新构建/产物检查已成功，Pages 配置失败](https://github.com/1998x-stack/Go/actions/runs/42541002385)，[规则 CI 成功](https://github.com/1998x-stack/Go/actions/runs/42541002361) | 仓库 Pages 未启用；启用后需验证落子、双停、计分及 WebAssembly 实际运行 |
| [space_ship](https://github.com/1998x-stack/space_ship) | 上游已有 pygbag Pages 工作流，未修改核心游戏 | [Pages 发布工作流成功](https://github.com/1998x-stack/space_ship/actions/runs/42237371518) | **部署成功不等于完成玩法 E2E**；需要在正式页面测试开始、移动、射击、波次、结算和重开 |
| [paint-maze-lab](https://github.com/1998x-stack/paint-maze-lab) | 已有基于本地 Python 服务的 Canvas 游戏、API 和求解器 | [浏览器验收 CI 成功](https://github.com/1998x-stack/paint-maze-lab/actions/runs/40991015829) | 检查服务依赖与算法/浏览器交互的一致性；不可擅自宣传为独立静态站点 |
| [2048](https://github.com/1998x-stack/2048) | 已有 Pygame 2048 与纯 Python 棋盘测试 | [Python checks CI 成功](https://github.com/1998x-stack/2048/actions/runs/35679406201) | 在干净桌面环境实测启动、移动、合并、输赢及退出 |
| [TicTacToe](https://github.com/1998x-stack/TicTacToe) | 有 README 和既有单测，之前目录状态滞后 | 本轮未执行 | 运行胜负/平局/重开测试，核对实际安装入口与元数据 |
| [jump_jump](https://github.com/1998x-stack/jump_jump) | 有 headless 引擎、Pygame 视图和文档 | 本轮未执行 | 固定随机种子回归碰撞、跳跃和重开，并执行窗口冒烟 |
| [flying_bird](https://github.com/1998x-stack/flying_bird) | Pygame 游戏和 DQN 训练逻辑共存 | 本轮未执行 | 游戏入口与训练依赖分离，验证碰撞、管道、音频和计分 |
| [pingpong](https://github.com/1998x-stack/pingpong) | Pygame + Box2D 双人乒乓，已有局部测试 | 本轮未执行 | 验证安装版本、双人控制、物理碰撞、计分与重新开始 |

**已修改 3 个上游仓库，不能据此宣称 10/10 完成。** 对需要服务端、桌面音频、专有素材或真实人机对局的项目，记录实测所需环境而不是硬改成 Pages。

## 本轮门户结构改进

公开索引 [35 项 JSON](../data/games.json) 与 [10 项阶段状态 JSON](../data/phase1.json) 独立维护，职责不同：

- 原 `review` 字段只说明是否看过项目 README；**不代表实际运行**。
- `validation` 记录最高已观察到的证据层级：`browser-ci`、`unit-ci`、`build-ci`、`not-verified`。
- `availability` 明确记录正式生产环境尚未验证，或已知 Pages 部署被设置阻断。
- 附对应 GitHub Actions/commit 原始链接，且**当前没有任何项目被标记为“生产页面已验证可玩”**。

`scripts/build_site.py --check` 检查 10 项与 35 项清单一致性、类型、安全 URL 前缀及公开数据同步；首页卡片按证据等级展示，不会因为读取不到 phase1 JSON 就默认宣布可玩。

## 本批接下来的实际优先顺序

1. **解决在线发布权限/设置阻塞：** 在 [Snake_Web Pages 设置](https://github.com/1998x-stack/Snake_Web/settings/pages) 与 [Go Pages 设置](https://github.com/1998x-stack/Go/settings/pages) 选择 GitHub Actions Source。当前 Actions token 无法自动创建 Pages Site（`Resource not accessible by integration`）。设置后重新运行各自 Pages 工作流并检查实际浏览器交互。
2. **验证现成上线候选：** 在 `space_ship` 已成功构建的 Pages 页面实际测试玩家操作，记录所用浏览器、URL、日期与关键画面。
3. **处理尚未运行的四个桌面项目：** `2048`、`TicTacToe`、`jump_jump`、`flying_bird`、`pingpong` 中优先做低成本启动/控制/碰撞冒烟，发现失败时提交最小修复。
4. **核验 paint-maze-lab 全链路：** 保持 Python API 和 Canvas 规则的一致性，避免宣称无需后端。
5. **最后才发“已在线玩”标签：** 必须有正式 URL、真实浏览器截图/录屏或 E2E 运行证据，不由 CI 构建成功推断。

## 通过条件

- 10/10 有当前运行方式、真实证据或明确阻塞；不捏造实测结果。
- 重点网页游戏在本地测试中通过开始/输入/失败/重开，正式上线仍独立核验。
- 所有新状态有原始来源链接；35 项清单无重复，网站和状态 JSON 与源数据一致。
- GitHub Actions 与 Pages 运行结果保持真实报告；有失败就记录失败，不改标签掩盖。

另见 [35 项三批优化计划](OPTIMIZATION-ROADMAP.md)。
