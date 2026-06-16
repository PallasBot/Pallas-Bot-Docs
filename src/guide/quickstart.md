# 五分钟跑起来

目标：本机或 VPS 上跑起一只牛，能登录控制台、连上 QQ、在群里回一句「牛牛帮助」。

::: info 环境
Python **3.12+**、[uv](https://docs.astral.sh/uv/)、**MongoDB 或 PostgreSQL**（本机 / Docker / 远程均可）。协议端（NapCat）可以等 Bot 起来后再配。
:::

## 核对清单

- [ ] 克隆仓库并 `uv sync`
- [ ] 复制 `config/pallas.toml` 并填写超管 QQ、数据库
- [ ] `uv run nb run` 无报错
- [ ] 浏览器打开 `/pallas/` 并用日志口令登录
- [ ] 协议端连上 QQ，群内「牛牛帮助」有响应

---

## 1. 获取代码

```bash
git clone https://github.com/PallasBot/Pallas-Bot.git
cd Pallas-Bot
uv sync
```

用 PostgreSQL 时：

```bash
uv sync --extra pg
```

---

## 2. 最少配置

```bash
cp config/pallas.example.toml config/pallas.toml
```

编辑 `config/pallas.toml`，**只改这两处**：

```toml
[bootstrap]
host = "0.0.0.0"
port = 8088
superusers = ["你的QQ号"]
db_backend = "mongodb"

[bootstrap.mongo]
host = "127.0.0.1"
port = 27017
db = "PallasBot"
```

::: warning 别提交密钥
`pallas.toml` 已在 gitignore，勿推到公开仓库。
:::

---

## 3. 启动

```bash
uv run nb run
```

成功标志：

1. 日志里数据库 **已连接**
2. 出现 **控制台默认口令**（同时打在终端）
3. 访问 `http://127.0.0.1:8088/pallas/` 能登录

---

## 4. 连接 QQ

浏览器打开 **协议端管理**：`http://<主机>:8088/protocol/console/`

在页面里创建 NapCat 实例并扫码登录；若你已有自管 NapCat，把 WebSocket 指到：

```text
ws://<Bot主机>:8088/onebot/v11/ws
```

控制台「在线 Bot」出现账号后，到群里发 **牛牛帮助** 验收。

---

## 分叉：其它部署方式

| 场景 | 文档 |
| --- | --- |
| VPS 长期运行、systemd、防火墙 | [标准部署](/deploy/deployment) |
| Docker Compose 一键栈 | [Docker 部署](/deploy/docker) |
| 多只牛 / 分片 | [多进程分片](/architecture/bot-process-sharding) |
| 从旧版 `.env` 迁移 | [迁移指南](/about/migration) |

---

## 常见问题

| 现象 | 先看 |
| --- | --- |
| 数据库连不上 | [配置要点 · 数据库](/deploy/config#mongodb) |
| 忘记控制台口令 | [FAQ · 部署排障](/deploy/faq) |
| 页面 404 | 确认 `pallas_webui_enabled` 未关，路径为 `/pallas/` |

更多排障见 [FAQ](/deploy/faq)。
