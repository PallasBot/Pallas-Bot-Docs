# 快速开始

Pallas-Bot（牛牛）是面向群聊场景的学习型机器人。本节按**分步部署 + 完成核对**完成最小可用部署；生产环境与 Docker 见专门文档。

## 环境要求（拉取源码前）

| 项 | 要求 |
| --- | --- |
| Python | 3.12+（推荐由 `uv` 管理） |
| 包管理 | [uv](https://docs.astral.sh/uv/) |
| 数据库 | MongoDB **或** PostgreSQL（可本机或远程，步骤 4 前就绪即可） |
| 协议端 | OneBot v11（如 NapCat，步骤 5 再接入） |

本地 **[`config/pallas.toml`](https://github.com/PallasBot/Pallas-Bot/blob/main/config/pallas.example.toml)** 在 **步骤 3** 从仓库内示例复制，克隆前**不必**准备。

---

## 部署完成核对（按步骤顺序勾选）

> 按下方「步骤 1 → 5」顺序进行；每完成一步再勾选对应项，**勿在拉取源码前预备配置与运行数据**。

- [ ] 已克隆 [Pallas-Bot](https://github.com/PallasBot/Pallas-Bot) 仓库
- [ ] 已执行 `uv sync`（PostgreSQL 时加 `--extra pg`）
- [ ] 已复制并编辑 **[`config/pallas.toml`](https://github.com/PallasBot/Pallas-Bot/blob/main/config/pallas.example.toml)**（超管 QQ、数据库）
- [ ] 数据库服务可连接
- [ ] 已启动 `uv run nb run` 且无致命错误
- [ ] 已用日志中的口令登录 `http://<主机>:8088/pallas/`
- [ ] 已在协议端管理或 NapCat 中连接 QQ，控制台显示在线

---

## 步骤 1：获取代码

```bash
git clone https://github.com/PallasBot/Pallas-Bot.git
cd Pallas-Bot
```

**确认**：目录中存在 `pyproject.toml`、[`config/pallas.example.toml`](https://github.com/PallasBot/Pallas-Bot/blob/main/config/pallas.example.toml)。

---

## 步骤 2：安装依赖

```bash
# 若未安装 uv：pip install uv  或见 https://docs.astral.sh/uv/
uv sync
```

使用 PostgreSQL：

```bash
uv sync --extra pg
```

**确认**：命令成功结束，可执行 `uv run python -c "import nonebot"` 无报错。

---

## 步骤 3：主配置（必做）

```bash
cp config/pallas.example.toml config/pallas.toml
```

编辑 [`config/pallas.toml`](https://github.com/PallasBot/Pallas-Bot/blob/main/config/pallas.example.toml)，至少设置：

- `[bootstrap] superusers` — 你的 QQ 号
- `db_backend` — `mongodb` 或 `postgresql`
- 对应 `[bootstrap.mongo]` 或 `[bootstrap.postgres]` 连接信息

**确认**：[`pallas.toml`](https://github.com/PallasBot/Pallas-Bot/blob/main/config/pallas.example.toml) 为文件且已保存；勿提交到公开仓库。

---

## 步骤 4：启动

```bash
uv run nb run
```

**确认**：

1. 日志无数据库连接失败。
2. 日志中出现 Web 控制台**初始口令**。
3. 浏览器打开 `http://<主机IP>:8088/pallas/` 可登录。

---

## 步骤 5：连接 QQ

打开 **协议端管理**：`http://<主机IP>:8088/protocol/console/`

在页面内创建 NapCat 实例并登录 QQ；或自管 NapCat，WebSocket 指向 `ws://<Bot主机>:8088/onebot/v11/ws`。

**确认**：控制台「在线 Bot」有账号；群内测试指令有响应。

---

## 完整部署与生产

| 主题 | 文档 |
| --- | --- |
| 分步部署、systemd、备份、防火墙 | [部署文档](/deploy/deployment) |
| Docker Compose | [Docker 部署](/deploy/docker) |
| 配置项与生产核对 | [配置要点](/deploy/config) |
| 多牛分片 | [多进程分片](/architecture/bot-process-sharding) |

---

## 下一步

- [功能列表](/guide/usage) — 了解牛牛功能
- [插件索引](/plugins/index) — 各插件说明
- [FAQ](/deploy/faq) — 常见问题与排障
- [社区统计](/common/community_stats) — 默认心跳上报说明
