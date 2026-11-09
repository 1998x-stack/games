# P2 · 第二批深度优化执行日志

> **2026-11-09 · 进行中，不代表 13 项全部运行或验收。**
>
> 本批唯一核心优化点仍是**可验证的游戏体验**。对 AI 研究与规则环境，“体验”意味着可复现规则、动作/奖励及评估基线，不要求伪造网页试玩入口。

## 阶段基线

| 指标 | 事实 |
|---|---|
| P2 计划/状态记录 | **13 / 13**，一项一条独立状态 |
| 本轮实际修改上游代码并通过新 CI | **5 项**：math_game、xiao_xiao_le_game、MarioGame、gomoku-exact5-env、gomoku_zero |
| 其余有历史成功 CI 证据 | **2 项**：ddz-rl-lab、ball-marl（本轮未重跑） |
| 有历史失败 CI 记录 | **1 项**：happyLandlord 的安装检查，不隐去失败 |
| 本轮尚无 CI/运行实测 | **5 项** |
| 真实物理桌面 / 训练性能综合验收 | **未完成**，不推断来自单元测试 |

## 13 项逐项计划、进度与证据

| 项目 | 现状与分类 | 最有价值的下一项工作 | 独立证据 |
|---|---|---|---|
| [math_game](https://github.com/1998x-stack/math_game) | 桌面游戏 · **已有成功 CI**。新版 Pygame 游戏入口、规则/计时/重开与虚拟 SDL 测试通过；实机尚待验收。 | 实机键盘输入、倒计时与三次失误结算验收；不把虚拟 SDL 视为真人体验测试。 | [工作流 1](https://github.com/1998x-stack/math_game/actions/runs/42549793772) |
| [xiao_xiao_le_game](https://github.com/1998x-stack/xiao_xiao_le_game) | 桌面游戏 · **已有成功 CI**。三消交换、连锁重力、计分、结束与重开已通过自动测试；旧炸弹机制不作可玩声明。 | 人工验证相邻交换、连续消除、无解重排与素材许可；旧炸弹机制待独立设计。 | [工作流 1](https://github.com/1998x-stack/xiao_xiao_le_game/actions/runs/42550036049) |
| [MarioGame](https://github.com/1998x-stack/MarioGame) | 桌面游戏 · **已有成功 CI**。Pygame 平台游戏已补 README、资源绝对路径、无声卡兼容与 R 重开，虚拟 SDL 场景 CI 通过；实际设备与受保护素材授权仍待核验。 | 在真实设备测试关卡与输入，并核查已包含素材来源/授权。 | [新 CI](https://github.com/1998x-stack/MarioGame/actions/runs/42551808329) |
| [go_gym](https://github.com/1998x-stack/go_gym) | 环境 / 基准 · **本轮未完成运行验收**。围棋 Gymnasium 环境；本轮未跑规则及动作掩码测试。 | 核查 reset/step/seed、动作掩码、非法动作、双停与胜负奖励。 | 尚无执行记录 |
| [gomoku_zero](https://github.com/1998x-stack/gomoku_zero) | 游戏 AI 研究 · **已有成功 CI**。GameState 非法/终局动作保护和与 pinned Exact-5 环境一致性脚本通过轻量 CPU CI；完整训练模型及性能仍未验证。 | 完成 CPU 小规模 selfplay→训练→评估流水线，不以规则一致性代替训练效果。 | [新 CI](https://github.com/1998x-stack/gomoku_zero/actions/runs/42552039262) |
| [gomoku-exact5-env](https://github.com/1998x-stack/gomoku-exact5-env) | 环境 / 基准 · **已有成功 CI**。已测试恰好五连、六连不胜、非法落子与终局 step 保护；非在线可玩游戏。 | 用同一棋盘/动作序列和 gomoku_zero 做跨项目规则与 reward 对照。 | [工作流 1](https://github.com/1998x-stack/gomoku-exact5-env/actions/runs/42550184933) |
| [happyLandlord](https://github.com/1998x-stack/happyLandlord) | 游戏 AI 研究 · **历史 CI 失败**。历史安装与文档 CI 失败；须先验证依赖、合法牌型和最小训练入口。 | 先定位历史安装 CI 失败原因，建立可复现的基础牌型/非法动作/整局结算测试。 | [工作流 1](https://github.com/1998x-stack/happyLandlord/actions/runs/36802001764) |
| [ddz-rl-lab](https://github.com/1998x-stack/ddz-rl-lab) | 游戏 AI 研究 · **已有成功 CI**。有历史单测成功记录；未在本轮复现完整自对弈训练。 | 固定环境版本、种子、训练批次验证模型存档/恢复、对局与评价。 | [工作流 1](https://github.com/1998x-stack/ddz-rl-lab/actions/runs/39978510070) |
| [MCTS-SNAKE](https://github.com/1998x-stack/MCTS-SNAKE) | 游戏 AI 研究 · **本轮未完成运行验收**。MCTS/DQN 贪吃蛇研究项目，尚未建立同条件随机策略基准。 | 固定随机种子、搜索预算和回合数比较 MCTS 与随机策略，记录平均分和方差。 | 尚无执行记录 |
| [TetrominoDQN](https://github.com/1998x-stack/TetrominoDQN) | 游戏 AI 研究 · **本轮未完成运行验收**。俄罗斯方块 DQN 训练；规则与随机基线未在本轮测试。 | 完善旋转/行消除/终局奖励单测，建立同 seed 随机策略对比。 | 尚无执行记录 |
| [Deep-RL-Arcade-Game](https://github.com/1998x-stack/Deep-RL-Arcade-Game) | 游戏 AI 研究 · **本轮未完成运行验收**。Atari 研究项目含历史版本依赖；ROM 来源与运行环境待核实。 | 在合法 ROM 前提下隔离历史 TensorFlow/Gym，执行单局 Atari 冒烟。 | 尚无执行记录 |
| [ball-marl](https://github.com/1998x-stack/ball-marl) | 环境 / 基准 · **已有成功 CI**。上游发布门禁 CI 曾成功；本轮未重新运行公平性及策略复测。 | 在相同版本和种子下测试动作约束、奖励守恒和策略切换。 | [工作流 1](https://github.com/1998x-stack/ball-marl/actions/runs/41018092336) |
| [Single-Player-MCTS](https://github.com/1998x-stack/Single-Player-MCTS) | 游戏 AI 研究 · **本轮未完成运行验收**。单人 MCTS 研究代码；未用已知最优解基准验证。 | 构造已知最优解的小搜索图，验证选择/扩展/回传与预算终止。 | 尚无执行记录 |

## 本轮已实施的代码变化

**Math Game**：历史 `old/` 的游戏入口函数与题目生成签名不一致，无法正常启动。现有根目录 `main.py`、无图形依赖的 `mathgame/core.py` 和虚拟 SDL 单元/冒烟 CI，覆盖题目正确性、错误输入、计时、重开、随机种子隔离。

**消消乐**：旧主程序与不完整炸弹机制相互耦合，部分连锁积分未计算、缺乏可用结算画面。新增纯规则 `engine.py` 和重建的 Pygame 主游戏，测试匹配、交换、重力、连锁与重开。**炸弹暂不作为可用玩法**，待完善视觉与规则后再引入。

**MarioGame**：根 README 从空内容补齐，修复音频设备缺失时启动失败、任意工作目录的素材路径和游戏结束后的重开；新增 Pygame 虚拟窗口回归。素材授权与关卡通关仍需另行验证。

**gomoku_zero**：增加轻量 CPU 规则契约 CI，固定 exact5 环境提交验证动作序列、终局和非法动作。未执行 PyTorch 训练或效果基准。

**五子棋 Exact-5**：补齐规则环境在非法落子/胜负终局后仍可继续 `step` 的状态保护，增加横竖斜五连、六连不胜与 Gymnasium 观察/动作掩码测试。下一步仍要与 gomoku_zero 交叉对齐。

## UI/UX 与第二批的共同交付

新 [Games Atlas](https://1998x-stack.github.io/games/) 采用分类 → 运行形态 → 验证状态的检索路径。其 P2 状态来自 [公开 phase2.json](../data/phase2.json)，与 P1/目录数据分离。卡片同时显示**原仓库**和**原始 CI 证据**；失败的工作流会独立标示，未验证项目不会自动显示“已可玩”。

真实浏览器 CI 覆盖多维筛选、深浅主题、键盘搜索、外链安全和移动端溢出检查；截图作为该工作流的产物供人工视觉复核。完整设计标准见 [UI 深度优化设计与验收](UI-UX-2026.md)。

## 不提前宣称完成的事项

- [ ] MarioGame 的素材使用权及真实关卡/键盘验收
- [ ] go_gym 与两个五子棋项目的跨环境规则一致性
- [ ] 斗地主规则引擎最小对局与 happyLandlord 安装修复
- [ ] MCTS、DQN 在相同种子、相同环境条件下的公开基线结果
- [ ] P2 13 项的全部运行实测及真实设备/平台验收

**执行原则：** 不复制第三方受限图像、ROM 或训练模型；每项升档必须有环境版本、具体命令、日志和可复核链接。不能只因为看到了 README 就标注可运行。

[返回仓库](../README.md) · [三批路线图](OPTIMIZATION-ROADMAP.md)
