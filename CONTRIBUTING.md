# Contributing / 贡献指南

欢迎提供可公开核对的游戏仓库链接、错别字修正、分类建议和失效链接报告。请在 Issue 或 PR 中说明来源与用途。

- 只收录确认为公开仓库的项目，简述应来自上游 README/代码证据；无证据则保守命名并标记 `pending`。
- 每个项目仅有一个主分类；条目名区分大小写，URL 必须是 https://github.com/1998x-stack/<name>。
- 新增/删除条目时同时改动 `data/games.json`、`categories/<category>/README.md` 与 `categories/<category>/<project>/README.md`。
- 运行 `python3 scripts/build_site.py --check` 检查，再运行 `python3 scripts/build_site.py` 刷新网站数据。
- 请勿提交原项目源码、二进制或未经授权的资源，也不要向本公开仓库复制私有目录记录或密钥。

项目不统一适用单一许可证；第三方源码版权请参阅其各自的许可文件。
