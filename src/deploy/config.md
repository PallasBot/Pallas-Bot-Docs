# 配置要点

启动前核对 **`config/pallas.toml`** 与 `data/` 持久化目录。机制见 [配置存储](/architecture/settings-storage)。

## 最少能跑

复制示例后**只改超管 QQ 和数据库**即可启动；其余在控制台按需改。

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

启动后打开 `/pallas/`，用日志中的默认口令登录。

## 配置谁覆盖谁

1. `config/pallas.toml` — 监听、超管、数据库（最低）
2. 遗留 `.env`（可选）
3. `data/pallas_config/webui.json` — **控制台保存最高**

建议：**启动与密钥写 TOML**；**插件开关写控制台**。

---

## 首次部署清单

- [ ] `pallas.example.toml` → `pallas.toml`
- [ ] `superusers` 已填
- [ ] `db_backend` 与数据库段一致
- [ ] `data/` 可写
- [ ] 已记录控制台口令（遗忘见 [FAQ](/deploy/faq)）
- [ ] 生产环境未开 `pallas_webui_dev_mode`

---

## 数据库

### MongoDB {#mongodb}

```toml
[bootstrap]
db_backend = "mongodb"

[bootstrap.mongo]
host = "127.0.0.1"
port = 27017
user = ""
password = ""
db = "PallasBot"
```

Docker Compose 栈内 host 常为 **`mongodb`**，见 [Docker 部署](/deploy/docker)。

### PostgreSQL

```toml
[bootstrap]
db_backend = "postgresql"

[bootstrap.postgres]
host = "127.0.0.1"
port = 5432
user = "postgres"
password = "your_password"
db = "PallasBot"
```

需 `uv sync --extra pg`。Compose 内置库时注意 `PG_DB` 与卷初始化名一致。

**验收**：启动无认证/连接失败；控制台无持久 5xx。

---

## 按需配置

| 场景 | 做法 |
| --- | --- |
| 关闭社区统计上报 | `pallas.toml` 里 `[community_stats] enabled = false` 或控制台 |
| 多进程分片 | `[env] REDIS_URL = "..."`，`uv sync --extra coord-redis` |
| 公网 HTTP | 设置 `access_token` |
| 旧 `.env` 迁移 | `uv run python tools/migrate_env_to_pallas.py` |

---

## 控制台落盘位置

| 内容 | 路径 |
| --- | --- |
| 插件与通用配置 | `data/pallas_config/webui.json` |
| 登录状态 | `data/pallas_console/` |
| 只读导出快照 | `config/pallas.webui.export.toml`（自动生成，勿手改） |

---

## 备份建议

定期备份：`pallas.toml`、`webui.json`、`data/pallas_console/`、整个 `data/`（含协议端实例与分片状态）。

---

## 相关文档

- [配置存储](/architecture/settings-storage)
- [标准部署](/deploy/deployment)
- [站点定制](/architecture/site-customization-and-updates)
