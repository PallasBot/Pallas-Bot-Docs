# 完整部署核对

本节是 [五分钟跑起来](/guide/quickstart) 的**加长版**：适合 VPS 生产环境、需要逐步勾选验收的场景。Docker 与分片见专门文档。

## 环境要求

| 项 | 要求 |
| --- | --- |
| Python | 3.12+（推荐 `uv` 管理） |
| 数据库 | MongoDB **或** PostgreSQL |
| 协议端 | OneBot v11（NapCat 等，Bot 启动后再接） |
| 配置 | 步骤 3 从 `pallas.example.toml` 复制，克隆前不必准备 |

---

## 部署清单

- [ ] 已克隆 [Pallas-Bot](https://github.com/PallasBot/Pallas-Bot)
- [ ] 已执行 `uv sync`（PostgreSQL 加 `--extra pg`）
- [ ] 已编辑 `config/pallas.toml`（超管 QQ、数据库）
- [ ] 数据库可连接
- [ ] `uv run nb run` 无致命错误
- [ ] 已登录 `http://<主机>:8088/pallas/`
- [ ] 协议端已连 QQ，控制台显示在线

---

## 步骤 1～2：代码与依赖

```bash
git clone https://github.com/PallasBot/Pallas-Bot.git
cd Pallas-Bot
uv sync   # PostgreSQL: uv sync --extra pg
```

确认：`uv run python -c "import nonebot"` 无报错。

---

## 步骤 3：主配置

```bash
cp config/pallas.example.toml config/pallas.toml
```

至少设置 `superusers`、`db_backend`、对应数据库段。示例见 [配置要点](/deploy/config#最少能跑)。

---

## 步骤 4：启动

```bash
uv run nb run
```

确认：数据库连接成功、日志有控制台口令、`/pallas/` 可打开。

---

## 步骤 5：连接 QQ

打开 `http://<主机>:8088/protocol/console/`，创建实例并登录；或自管 NapCat 指向 `ws://<主机>:8088/onebot/v11/ws`。

---

## 生产与进阶

| 主题 | 文档 |
| --- | --- |
| systemd、备份、防火墙 | [标准部署](/deploy/deployment) |
| Docker | [Docker 部署](/deploy/docker) |
| 配置项详解 | [配置要点](/deploy/config) |
| 多牛分片 | [多进程分片](/maintainer/deploy/sharded) |

---

## 下一步

- [口令与功能](/guide/usage)
- [插件索引](/plugins/index)
- [FAQ](/deploy/faq)
