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
| `src/common/` | WebUI、命令权限、消息清洗等通用能力 |
| `src/develop/` | 插件开发指南 |

内容以主仓 [`docs/`](https://github.com/PallasBot/Pallas-Bot/tree/main/docs) 为权威来源；Web 文档侧重用户可读性，代码路径链接到 GitHub。

## 贡献

1. Fork [PallasBot/Pallas-Bot-Docs](https://github.com/PallasBot/Pallas-Bot-Docs)
2. 在 `src/` 下修改或新增 Markdown
3. 本地 `pnpm run docs:build` 确认无报错
4. 提交 PR

编辑链接指向 `PallasBot/Pallas-Bot-Docs` 的 `main` 分支。
