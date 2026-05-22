# 迁移指南

## v3.0 迁移

v3.0 引入了 PostgreSQL 数据后端支持。

### 迁移步骤

1. 停止 Bot 写入流量
2. 备份 MongoDB 数据
3. 准备 PostgreSQL 空库
4. 执行迁移脚本

### 迁移命令

```bash
uv sync --extra pg
uv run --extra pg python tools/migrate_mongo_to_pg.py
```