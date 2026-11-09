# xiao_xiao_le_game · 桌面游戏

> **P2 第二批状态** · 2026-11-09 · **已有成功 CI**  
> [返回 益智与休闲 分类](../README.md) · [查看完整 P2 日志](../../../docs/PHASE2-EXECUTION.md)

**简介：** 10×10 三消游戏，支持连锁计分与重玩

**原始项目：** [1998x-stack/xiao_xiao_le_game](https://github.com/1998x-stack/xiao_xiao_le_game)。此目录仅是索引，不包含源仓库代码或第三方素材。

## 实际观察与限制

三消交换、连锁重力、计分、结束与重开已通过自动测试；旧炸弹机制不作可玩声明。

目前**没有完成正式设备上的游戏验收**，不能宣传为已验证在线可玩。

## 验证证据

- [GitHub 工作流证据 1](https://github.com/1998x-stack/xiao_xiao_le_game/actions/runs/42550036049)

## 可复现命令（需在上游仓库根目录执行）

```bash
python -m pip install "pygame>=2.5,<3"
python main.py
SDL_VIDEODRIVER=dummy SDL_AUDIODRIVER=dummy python -m unittest discover -s tests -v
```

以上是公开测试/运行入口；有自动 CI 证据，但尚需根据项目补充真实平台验收。

## 下一项工作与验收门槛

人工验证相邻交换、连续消除、无解重排与素材许可；旧炸弹机制待独立设计。

没有测试日志、环境版本和对应上游提交的升级，不得将本状态变更为“可玩”或“已完成”。

[返回 Games 总目录](../../../README.md)
