# awesome-rl-envs · 教学与资料

> **第三批 P3 · 2026-11-09 · 运行待验证**
>
> [返回本分类](../README.md) · [第三批证据与计划](../../../docs/PHASE3-EXECUTION.md) · [上游仓库](https://github.com/1998x-stack/awesome-rl-envs)

**简介：** 强化学习环境资源清单，含游戏

## 核实到的运行/维护边界

已从原 README Games 章节提取 11 个去重 HTTPS 外部环境链接，校验源文本一致性；并未检查链接实际健康状况或是否具备游戏/ROM 发布许可。

**部署与许可：** 属于研究环境/资源索引，不是已验证的浏览器游戏。上游 JAR/ROM/素材的权利不因 Games Atlas 收录而改变。

## 可追溯证据

- [成功的 GitHub Actions 工作流](https://github.com/1998x-stack/awesome-rl-envs/actions/runs/42623240121)

## 复现静态来源索引

在 [awesome-rl-envs](https://github.com/1998x-stack/awesome-rl-envs) 仓库根目录执行：

```bash
python scripts/export_game_links.py --check
python -m unittest discover -s tests -v
```

**重要：** 不会联网，不能认为导出的 11 个项目已经运行验证。

## 下一步最小验收

仅抽取 Games 子章节并对选定公开外链做状态检查与日期记录；不把列表当成可玩的游戏。

**升档原则：** 需要可复现命令、适用系统和依赖版本、固定种子/测试条件、原始 CI/截图/日志及失败记录。仅阅读 README 或看到工作流配置不能把状态升级为“可用/可玩”。

[返回 35 项总目录](../../../README.md)
