# 配置要点

以下为启动前最常见的配置项，更多键名与默认值以各插件 Pydantic 配置为准。

## 基础配置

| 配置项 | 默认/示例 | 说明 | 必填 |
| --- | --- | --- | --- |
| `HOST` / `PORT` | `0.0.0.0` / `8088` | Bot HTTP 监听 | 是 |
| `SUPERUSERS` | QQ 号列表 | 超管 QQ | 是 |
| `DB_BACKEND` | `mongodb` / `postgresql` | 数据后端 | 是 |
| `MONGO_*` / `PG_*` | 见 `.env` 模板 | 数据库地址与账号 | 是 |
| `ACCESS_TOKEN` | 空 | HTTP 鉴权 | 否 |

## 数据库配置

### MongoDB

```env
DB_BACKEND=mongodb
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=PallasBot
```

### PostgreSQL

```env
DB_BACKEND=postgresql
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DB=PallasBot
```