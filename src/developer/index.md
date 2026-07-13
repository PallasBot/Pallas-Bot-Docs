# Developer

Pallas-Bot 开发者契约入口。维护者部署见 [`docs/maintainer/`](/maintainer/quickstart)。深度设计稿见 [`docs/architecture/`](../architecture/)（非主入口）。

## 读者分流

| 角色 | 必读顺序 |
| --- | --- |
| 社区 / 站点插件作者 | [入门](/developer/plugin-development/getting-started) → [Golden Plugin](/developer/plugin-development/golden-plugin) → [pallas.api](/developer/plugin-development/pallas-api-cookbook) → [配置](/developer/plugin-development/config-and-webui) → [发布](/developer/plugin-development/publishing) |
| 官方扩展作者 | [Core vs 扩展](/developer/architecture/core-vs-extensions) → [Golden Plugin](/developer/plugin-development/golden-plugin) → [元数据](/developer/plugin-development/metadata) → [Reload / Activation](/developer/plugin-development/reload-and-activation) → [发布](/developer/plugin-development/publishing) |
| 主仓 / 平台维护者 | [架构总览](/developer/architecture/overview) → [分片](/developer/architecture/shard-runtime) → [配置存储](/developer/architecture/config-storage) → [治理](/developer/architecture/plugin-governance) → [仓库布局](/developer/reference/repo-layout) |

按作者身份整理的短索引：[Author](/developer/author/index)。

## 稳定边界（事实）

| 边界 | 约定 |
| --- | --- |
| 能力分层 | `core` / `official extension` / `community extension` |
| 插件公开 API | 仅 `pallas.api.*`（社区扩展强制） |
| WebUI | 源码在 `Pallas-Bot-WebUI`；主仓 `data/pb_webui/public/` 为运行产物 |
| AI | `Pallas-Bot-AI` 为可选 runtime；产品语义与记忆边界在主仓 |
| 配置合并 | `pallas.toml` → 遗留 `.env` → `webui.json`（后者覆盖） |
| 分片 | hub / worker / Redis 职责分离；消息处理默认在 worker |

## 目录

| 区 | 内容 |
| --- | --- |
| [architecture/](/developer/architecture/overview) | 运行时、分层、分片、配置、治理 |
| [plugin-development/](/developer/plugin-development/getting-started) | 骨架、元数据、配置、测试、发布 |
| [reference/](/developer/reference/repo-layout) | 仓库布局、API 分层、控制台约定 |
