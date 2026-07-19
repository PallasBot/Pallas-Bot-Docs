# Docs P0：断链、入口与旧页

日期：2026-07-19  
状态：已落地  
前置：运维/开发冷手册文风、通览审计

## 已做

| 项 | 处理 |
| --- | --- |
| 相对断链（主仓路径） | 插件互链 → `/plugins/*`；`deploy/pg`、compose、API 深链 → GitHub |
| 首页 FAQ | 改为 VitePress markdown 链接（带 base） |
| `guidestart` / noobook | 指向 `/guide/quickstart`；侧栏增加「完整部署核对」`/guide/start` |
| 旧插件名 | `ollama` / `pallas_*` / `community_stats` → stub 到现行页 |
| `develop/plugin/*` | 归档入口，指向 `developer/plugin-development/*` |
| 侧栏 / 顶栏 | 补 `deploy/config`、`deployment`、`usage-admin`、社区商店；迁移归档标签 |
| Footer | `/plugins/pb_webui` |

## 续作（已落地）

| 项 | 处理 |
| --- | --- |
| WebUI API 进站 | `src/common/webui/api/*`；侧栏 + maintainer 链站内 |
| `develop/` 收拢 | 正文迁 `developer/{environment,workflow,webui,extension-pypi-publish}`；`develop/` 仅 stub |
| `ignoreDeadLinks` | 仅忽略外链 / localhost；`pnpm docs:build` 通过 |

## 续作 2（已落地）

| 项 | 处理 |
| --- | --- |
| 首页 feature | 8 → 6（去掉「文档齐全」「PostgreSQL」） |
| about 开篇 | 产品名 Pallas-Bot，牛牛作群昵称 |
| 插件同步 | 权威 `docs/plugins/<name>/README.md`；`sync --plugins-only`；扁平双份改指针；补 peer/guide 变换 |
| 约定说明 | 主仓 `docs/plugins/SYNC.md` |
