# MarioGame · 桌面游戏

> **第二批 P2 · 2026-11-09 · CI 成功，但仍有验收缺口**
>
> [原始项目](https://github.com/1998x-stack/MarioGame) · [P2 完整日志](../../../docs/PHASE2-EXECUTION.md) · [返回分类](../README.md)

**项目简介：** 马里奥主题游戏项目

## 本轮实际证据

Pygame 平台游戏已补 README、资源绝对路径、无声卡兼容与 R 重开，虚拟 SDL 场景 CI 通过；实际设备与受保护素材授权仍待核验。

- [GitHub CI / 运行证据 1](https://github.com/1998x-stack/MarioGame/actions/runs/42551808329)

## 复验命令

在原仓库根目录运行：

```bash
python -m pip install "pygame>=2.5,<3"
python main.py
SDL_VIDEODRIVER=dummy SDL_AUDIODRIVER=dummy python -m unittest discover -s tests -v
```

## 下一项验收

完整验证物理桌面的移动/跳跃/敌人碰撞、关卡终点和重新开始；对原仓库已有角色、图像、声音逐项确认使用/再分发许可。**未核实授权前，不把素材镜像到 Games Atlas Pages。**

当前尚未获得全部真实目标环境体验或实验验收，不显示“生产可玩”标签。
