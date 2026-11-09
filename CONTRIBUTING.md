# Contributing / 贡献指南

欢迎提供可公开核对的游戏仓库链接、错别字修正、分类建议和失效链接报告。请在 Issue 或 PR 中说明来源与用途。

- 只收录确认为公开仓库的项目，简述应来自上游 README/代码证据；无证据则保守命名并标记 `pending`。
- 每个项目仅有一个主分类；条目名区分大小写，URL 必须是 https://github.com/1998x-stack/<name>。
- 新增/删除条目时同时改动 `data/games.json`、`categories/<category>/README.md` 与 `categories/<category>/<project>/README.md`。
- 运行 `python3 scripts/build_site.py --check` 检查，再运行 `python3 scripts/build_site.py` 刷新网站数据。
- 请勿提交原项目源码、二进制或未经授权的资源，也不要向本公开仓库复制私有目录记录或密钥。

项目不统一适用单一许可证；第三方源码版权请参阅其各自的许可文件。

## 第一批验证状态维护（P1）

`data/games.json` 中的 `review` 表示核对过上游说明，**不是运行状态**。
如需更新第一批 10 个游戏的运行/部署状态，应同时修改
`data/phase1.json` 与相关的 `categories/<category>/<name>/README.md`；
原始 GitHub Actions 运行链接、实际成功范围和失败原因必须保持可追溯。

`python scripts/build_site.py` 刷新 `site/data/*.json`；
`python scripts/build_site.py --check` 校验 JSON、项目页与证据 URL 同步。
不要将“构建成功”“虚拟 SDL 测试成功”写成“正式网页已验证可玩”。

## P3 完整目录治理

三批状态源为 `data/phase1.json`（10）、`data/phase2.json`（13）、`data/phase3.json`（12）。每个项目应**恰好出现一次**，且并集等于 `data/games.json` 的 35 项。运行 `python3 scripts/build_site.py` 同步静态 JSON；运行 `python3 scripts/build_site.py --check` 进行无损验证。更新任何成功/失败状态时，必须同步相关 `categories/<category>/<project>/README.md` 的证据链接。受限资源、历史环境和后端服务不应直接被宣传为线上可玩；未经核实的 ROM、角色资产和 API 密钥不得拷入门户。
