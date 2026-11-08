# GitHub Pages 发布说明

## 发布流程

此仓库使用 **GitHub Actions → Pages** 部署，源码放在 `site/`，无需 Jekyll、Node/npm 或外部 CDN。自动发布仅在 `main` 推送且 CI 构建通过后触发。

1. 打开 <https://github.com/1998x-stack/games/settings/pages>。
2. 在 **Build and deployment → Source** 选择 **GitHub Actions**（这是仓库设置，不能仅通过提交 YAML 代替）。
3. 检查 <https://github.com/1998x-stack/games/actions/workflows/pages.yml> 是否成功执行。
4. 访问 <https://1998x-stack.github.io/games/>；首次发布如未完成，应先查看工作流和 Pages 设置。

## 工作流设计

`validate.yml` 在 push/PR 上执行数据与文件的一致性检查。
`pages.yml` 在 `main` 和手工调度时运行：checkout → Python 校验与生成 → upload-pages-artifact → deploy-pages；部署步骤需要 `pages: write` 与 `id-token: write`。

## 安全边界

只上传 `site/` 静态目录；不克隆、读取、缓存私有来源目录；不需要访问私有仓库的令牌。公开 JSON 仅包含列于 `data/games.json` 的公开条目。修改目录前请检查公开边界。

## 本地预览与排查

```bash
python3 scripts/build_site.py --check
python3 scripts/build_site.py
python3 -m http.server 8000 --directory site
```

如果页面为空，检查浏览器开发者工具中 `data/catalog.json` 是否加载成功，以及 `site/data/catalog.json` 是否生成。若 Actions 显示 Pages 未启用或权限不够，先检查 Pages Source、Actions 权限和仓库策略。
