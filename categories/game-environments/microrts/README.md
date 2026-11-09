# microrts · 研究环境 / 基准

> **第三批 P3 · 2026-11-09 · 运行待验证**
>
> [返回本分类](../README.md) · [第三批证据与计划](../../../docs/PHASE3-EXECUTION.md) · [上游仓库](https://github.com/1998x-stack/microrts)

**简介：** 面向 AI 研究的微型即时战略游戏

## 核实到的运行/维护边界

使用 Java 17 构建 8×8 WorkerRush/LightRush 完整一局，引擎正常终局，日志结果为 cycles=205、winner=0。尚缺多局胜率/重复种子分布，第三方 JAR 授权未经重新核验。

**部署与许可：** 属于研究环境/资源索引，不是已验证的浏览器游戏。上游 JAR/ROM/素材的权利不因 Games Atlas 收录而改变。

## 可追溯证据

- [成功的 GitHub Actions 工作流](https://github.com/1998x-stack/microrts/actions/runs/42622693078)

## 复现真实 AI 对局

在 [microrts](https://github.com/1998x-stack/microrts) 仓库根目录执行：

```bash
mkdir -p build/p3
javac -encoding UTF-8 -cp "lib/*:src" -d build/p3 src/ai/abstraction/WorkerRush.java src/ai/abstraction/LightRush.java src/tests/P3HeadlessMatch.java
java -Djava.awt.headless=true -cp "lib/*:build/p3" tests.P3HeadlessMatch
```

## 下一步最小验收

固定 Java 版本与仓库原有 JAR/地图来源，编译并执行一场有胜负或超时边界的本地对局。

**升档原则：** 需要可复现命令、适用系统和依赖版本、固定种子/测试条件、原始 CI/截图/日志及失败记录。仅阅读 README 或看到工作流配置不能把状态升级为“可用/可玩”。

[返回 35 项总目录](../../../README.md)
