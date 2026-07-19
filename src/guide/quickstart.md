# 快速开始

::: tip
**源码 / Docker 二选一** 装好本体后，必须 [连接 QQ](connect-qq.md)，群里才会有反应。账号连上后配置 [号主](bot-owner.md)。改配置看 [配置从哪改](config.md)。
:::

## 确认环境

| 需要 | 源码 | Docker |
| --- | --- | --- |
| [Git](https://git-scm.com/) | ✅ | — |
| [uv](https://docs.astral.sh/uv/) + Python **3.12** | ✅ | — |
| [Docker](https://docs.docker.com/get-docker/) + Compose | 可选（起库） | ✅ |
| PostgreSQL | ✅（本机或容器） | Compose 一并拉起 |

```bash
git -v
uv -V
docker -v && docker compose version
```

::: details Windows / Linux 怎么装这些
- Windows：Git、Docker 走官网安装包即可
- Linux：`git` 用包管理器装；Docker 见[官方文档](https://docs.docker.com/get-docker/)
- 零基础步骤 → [萌新引导](/noobook/)
:::

## 选一种方式装本体

| 场景 | 文档 |
| --- | --- |
| 本机开发、习惯 `uv` | **[源码安装](install-source.md)** |
| 不想 clone、只想拉镜像 | **[Docker 部署](/deploy/docker)** |

## 装完之后

按顺序做完，群里才有完整能力：

1. [连接 QQ](connect-qq.md) — 协议端上线
2. [号主](bot-owner.md) — 给这只牛配运维人
3. [配置从哪改](config.md) — 超管、插件与业务项

也可先看 [网页控制台](web-console.md) 熟悉面板。
