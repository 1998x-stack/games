# P3 · 研究环境、游戏生成工具与长期治理执行日志

> **2026-11-09 · 状态：进行中，12 项已完成初步证据审查和项目页更新。**
>
> 核心仍是 **可验证的游戏体验与可复现实验**，不是完成一轮大而全的“35 项都可在线玩”宣传。研发代码、历史环境和第三方受限平台必须区别对待。

## 本轮独立进度

| 口径 | 真实结果 |
|---|---:|
| 第三批计划项目 / 索引说明与下一步验收 | **12 / 12** |
| 已修改第三批上游源码且新 CI 成功 | **5 / 12** |
| 仅具历史成功 CI 记录、尚未复测 | **1 / 12**（ai-game） |
| 无本轮成功运行或实验记录 | **6 / 12** |
| 真实公网生成器与完整训练性能验收 | **0**，不能由组件测试推断 |
| 全部 Games 项目已分配唯一阶段 | **35 / 35**（P1 10 + P2 13 + P3 12） |

## 五项新工程交付与测试边界

**1. [AI-Game-Generator](https://github.com/1998x-stack/AI-Game-Generator)**：不受信任的生成 HTML 曾使用 `sandbox="allow-scripts allow-same-origin"`，可能使 srcdoc 脚本继承应用来源权限。现改为仅允许脚本、使用不透明源，校验 `postMessage` 的确切 iframe 发送者并限制错误消息长度。新增静态契约/TypeScript CI，并在原 Next.js 组件上执行 **2 项真实 Chromium 浏览器测试**，验证沙箱不能读取父 DOM/localStorage 及错误来源消息的拒绝。[Chromium 成功记录](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42623528980) · [静态契约记录](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42619929546)。**限制：** 此测试覆盖预览隔离边界，不能代表生成服务、密钥、沙箱子依赖或全平台安全审计。

**2. [gym-envs](https://github.com/1998x-stack/gym-envs)**：FrozenLake/Blackjack 两个教学环境转为现代 Gymnasium `reset(seed)` 与五元组 `step()`；替换全局 RNG、补终局后动作保护和完整回合、`check_env` 测试。[本轮成功记录](https://github.com/1998x-stack/gym-envs/actions/runs/42620238372)。**限制：** 没有宣称其余 classic_control/toy_text 全面兼容。

**3. [rainbow-is-all-you-need](https://github.com/1998x-stack/rainbow-is-all-you-need)**：修复 `segment_tree.py` 半开区间及 `retrieve` 采样边界，以固定随机种子、空树、零概率叶与权重分布单测验证。[本轮成功记录](https://github.com/1998x-stack/rainbow-is-all-you-need/actions/runs/42620461728)。**限制：** 未复现 Notebook 的 DQN/Rainbow 模型训练或 Atari 性能。

**4. [microrts](https://github.com/1998x-stack/microrts)**：Java 17 CI 编译反射加载的 WorkerRush、LightRush AI，并运行真实 8×8 引擎对局，**205 周期正常终局，winner=0**。[原始成功对局](https://github.com/1998x-stack/microrts/actions/runs/42622693078)。**限制：** 单局完整游戏结果不能代表模型强弱比较，AI JAR 的再分发权利需独立核对。

**5. [awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs)**：仅从上游 README 的 Games 章节提取 11 个链接为独立 JSON，使用固定解析、去重、HTTPS 检查和原文一致性 CI。[原始成功记录](https://github.com/1998x-stack/awesome-rl-envs/actions/runs/42623240121)。**限制：** 未对 11 个目的站进行联网健康度、安装、ROM 或授权检查，亦不增加 Games 35 项顶层计数。

## 12 项清单：证据、限制与下一步

| 项目 | 角色与当前验收等级 | 下一项最小独立验收 | 原始证据 |
|---|---|---|---|
| [RL-Adventure-2](https://github.com/1998x-stack/RL-Adventure-2) | 游戏 AI · **本轮未完成运行** · 历史依赖可能不兼容 | 选取无需 ROM 的 CPU 案例，固定 Python/Torch/Gym 与 seed，跑通小训练并报告均值/方差。 | 本轮暂无成功运行记录 |
| [Arcade-Learning-Environment](https://github.com/1998x-stack/Arcade-Learning-Environment) | 研究环境 · **本轮未完成运行** · 第三方资源/平台受限 | 先核实 ROM 合法来源、ALE/Gymnasium 安装版本，再做单回合 step/reset；禁止打包任何第三方 ROM。 | 本轮暂无成功运行记录 |
| [awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs) | 教学资源 · **目录导出 CI 通过；目的站未核查** · 不是静态试玩产品 | 对 11 个目标网站做带日期的健康度与权利审查；只声明当前通过目录提取校验。 | [CI 1](https://github.com/1998x-stack/awesome-rl-envs/actions/runs/42623240121) |
| [gym-envs](https://github.com/1998x-stack/gym-envs) | 研究环境 · **两个教学环境协议测试通过** · 不是静态试玩产品 | 剩余经典控制示例逐个从旧 Gym 迁移；保持本轮仅两款 Toy Text 环境验收口径。 | [CI 1](https://github.com/1998x-stack/gym-envs/actions/runs/42620238372) |
| [hok_env](https://github.com/1998x-stack/hok_env) | 研究环境 · **本轮未完成运行** · 第三方资源/平台受限 | 确认 Windows gamecore、Linux actor、镜像、训练资源的许可证/系统依赖，建立权限和版本矩阵。 | 本轮暂无成功运行记录 |
| [microrts](https://github.com/1998x-stack/microrts) | 研究环境 · **真实 AI 对局 CI 通过** · 不是静态试玩产品 | 固定地图/AI 后补多组 seed 与双向对照，记录胜率、时长和离散性；单局不算性能基准。 | [CI 1](https://github.com/1998x-stack/microrts/actions/runs/42622693078) |
| [universe](https://github.com/1998x-stack/universe) | 研究环境 · **本轮未完成运行** · 历史依赖可能不兼容 | 建立隔离的历史运行矩阵；若不能运行，公开阻塞条件，不给“现代 Gym 兼容”标签。 | 本轮暂无成功运行记录 |
| [gym](https://github.com/1998x-stack/gym) | 研究环境 · **本轮未完成运行** · 历史依赖可能不兼容 | 核对旧 Gym 与 Gymnasium 的 API 差异，提供并行示例而不是迁移整个上游历史源码。 | 本轮暂无成功运行记录 |
| [ai-game](https://github.com/1998x-stack/ai-game) | 游戏创作工具 · **历史工作流成功；本轮未复测** · 依赖服务端配置与密钥 | 保持原有 CI 不变；后续检验服务端密钥、会话隔离、沙箱预览与无密钥生成失败路径。 | [CI 1](https://github.com/1998x-stack/ai-game/actions/runs/39938832001) |
| [AI-Game-Generator](https://github.com/1998x-stack/AI-Game-Generator) | 游戏创作工具 · **Chromium 预览隔离测试通过** · 依赖服务端配置与密钥 | 扩展跨域网络请求、构建超时和身份/密钥路径测试；现只认证预览来源隔离。 | [浏览器 CI](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42623528980) · [静态契约](https://github.com/1998x-stack/AI-Game-Generator/actions/runs/42619929546) |
| [Deep-Reinforcement-Learning-Hands-On](https://github.com/1998x-stack/Deep-Reinforcement-Learning-Hands-On) | 教学资源 · **本轮未完成运行** · 历史依赖可能不兼容 | 选择 FrozenLake 等无需第三方 ROM 的章节，固定最小依赖与 RNG，验证 CPU 完整回合。 | 本轮暂无成功运行记录 |
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
- [x] 五项实际工程改进取得公开 CI 证据（含真实 RTS 对局及仅静态链接索引检查）
- [x] 全 35 项阶段数据与静态站点统一校验，阶段没有重复
- [x] 至少一个原始环境完整回合：microRTS 205 周期 AI 对局（并非多次统计基准）
- [x] AI 生成器实际 Chromium 预览隔离检查（2 项测试）
- [ ] 生成器无密钥失败/超时路径及全服务隔离审查
- [ ] 受限资源的合法来源与系统矩阵审查
- [ ] Games 11 个外链目的站的联网健康度、许可与定期复核（静态提取 CI 已通过）
- [ ] 正式生产 Pages 网页路径的独立访问抽样

本批任务只有达到对应的真实复现条件才可关闭；**35/35 状态登记不代表 35/35 项目质量验收完成。**

[返回目录](../README.md) · [三批计划](OPTIMIZATION-ROADMAP.md)
