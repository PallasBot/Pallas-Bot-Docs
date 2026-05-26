# Pallas-Bot 文档

本项目是 [Pallas-Bot](https://github.com/PallasBot/Pallas-Bot) 的 **Web 文档站点**，基于 [VitePress](https://vitepress.dev/) 构建，通过 GitHub Pages 部署。

- **仓库**：[PallasBot/Pallas-Bot-Docs](https://github.com/PallasBot/Pallas-Bot-Docs)
- **在线文档**：https://PallasBot.github.io/Pallas-Bot-Docs/

## 本地开发

环境要求：Node.js ≥ 20、pnpm ≥ 9。

```bash
pnpm install
pnpm run dev      # 本地预览，默认 http://localhost:5173/Pallas-Bot-Docs/
pnpm run docs:build
pnpm run docs:preview
```

## 文档结构

| 目录 | 说明 |
| --- | --- |
| `src/guide/` | 快速开始、功能列表、AI 扩展 |
| `src/deploy/` | 部署、Docker、配置、FAQ |
| `src/plugins/` | 各插件说明（与主仓 `docs/plugins/` 对应） |
| `src/architecture/` | 项目结构、配置存储、分片等 |
| `src/common/` | WebUI、命令权限、语料联邦、消息清洗等通用能力 |
| `src/develop/` | 插件开发指南 |

内容以主仓 [`docs/`](https://github.com/PallasBot/Pallas-Bot/tree/main/docs) 为权威来源；`src/` 下 Markdown 由主仓 Actions 工作流 [`sync-docs-to-web.yml`](https://github.com/PallasBot/Pallas-Bot/blob/main/.github/workflows/sync-docs-to-web.yml) 自动同步，请勿在此仓库手改与主仓映射相同的页面（VitePress 配置、`src/guide/` 等非同步目录除外）。

## 贡献

**文档正文**：请在 [PallasBot/Pallas-Bot](https://github.com/PallasBot/Pallas-Bot) 的 `docs/` 修改并提 PR；合并后会自动同步到本仓库。

**站点结构 / VitePress 配置**：在本仓库 `src/.vitepress/` 等目录修改并提 PR。
