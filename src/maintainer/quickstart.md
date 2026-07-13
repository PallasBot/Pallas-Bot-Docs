# 运维入口

第一次装、只想本机跑通？直接去 **[五分钟跑起来](/guide/quickstart)**。  
这页只给运维指路：部署形态、升级、排障、配置——**不再重复**装本体步骤。

## 你要做什么

| 目标 | 打开 |
| --- | --- |
| 本机第一次跑通 | [五分钟跑起来](/guide/quickstart) |
| 装决斗 / MAA / 协议端 / AI | [把玩法 / AI 也装上](/guide/4.0-start) |
| Docker | [Docker 部署](/maintainer/deploy/docker) |
| 单进程长跑 | [单进程部署](/maintainer/deploy/single-process) |
| 多账号 / 分片 | [分片部署](/maintainer/deploy/sharded) |
| 从旧版升级 | [升级](/maintainer/deploy/upgrade) · [从 3.x 迁到现行版本](/guide/4.0-migration) |
| 新装验收走查 | [安装验收 Checklist](/maintainer/install/ga-install-checklist) |
| 排障 | [排障](/maintainer/operate/troubleshooting) |
| 闲聊 / 记忆不生效 | [LLM 与 AI](/maintainer/operate/llm-and-ai) |
| 查配置键 | [配置参考](/maintainer/reference/config) |

## 安装与组件（按需细读）

| 组件 | 文档 |
| --- | --- |
| 本体 | [本体安装](/maintainer/install/bot) |
| WebUI | [WebUI](/maintainer/install/webui) |
| 协议端 | [协议端](/maintainer/install/protocol) |
| 官方扩展 | [官方扩展](/maintainer/install/official-extensions) |
| AI Runtime | [AI Runtime](/maintainer/install/ai-runtime) |
| 命令权限 | [命令权限](/maintainer/operate/command-permissions) |
| Web 控制台日常 | [Web 控制台](/maintainer/operate/webui) |

::: tip 什么时候才需要分片
多 Bot 账号同时在线、单进程已有明显压力、或需要更稳的 worker / 协调时，再看 [分片部署](/maintainer/deploy/sharded)。平时单进程即可。
:::

上手分流：[选一条路](/guide/welcome)
