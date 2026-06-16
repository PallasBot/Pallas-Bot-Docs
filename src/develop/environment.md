# 本地开发环境

## 前置条件

- **Python 3.12+**
- **[uv](https://docs.astral.sh/uv/)**（依赖与虚拟环境）
- 可选：**Docker**（数据库、协议端、镜像构建校验）
- 可选：**Node.js**（仅开发 [Pallas-Bot-WebUI](https://github.com/PallasBot/Pallas-Bot-WebUI) 前端时）

## 克隆与安装依赖

```bash
git clone https://github.com/PallasBot/Pallas-Bot.git
cd Pallas-Bot
uv sync --dev
```

需要分片协调 Redis 时：

```bash
uv sync --dev --extra coord-redis
```

## 运行配置

主配置在 **`config/pallas.toml`**（从 `pallas.example.toml` 复制）；插件项在 Web 控制台保存到 **`data/pallas_config/webui.json`**。

最少示例见 [配置要点](/deploy/config#最少能跑) 或用户文档 [五分钟跑起来](/guide/quickstart#2-最少配置)。

从旧 `.env` 迁移：

```bash
uv run python tools/migrate_env_to_pallas.py
```

合并顺序见 [配置存储](/architecture/settings-storage)。`.env` 仅建议放 nb/pip 插件项，勿与 `webui.json` 同名键冲突。

## 启动 Bot

单进程（最常见本地调试）：

```bash
uv run nb run
```

或使用专用启停脚本（对照测试、协议端口同步）：

```bash
./scripts/run_unified_bot.sh start
./scripts/run_unified_bot.sh status
./scripts/run_unified_bot.sh stop
```

浏览器打开 `http://127.0.0.1:8088/pallas/`，使用启动日志中的口令登录。

### 分片模式（可选）

生产或多进程场景见 [多进程分片](../architecture/bot_process_sharding.md)。本地若需验证分片：

- 在 `pallas.toml` 的 `[env]` 配置 `REDIS_URL`（需 `uv sync --extra coord-redis`）
- 使用 `./scripts/run_sharded_bot.sh start`（脚本会探测 Redis）

### 站点自有插件

在 `local/plugins/<name>/` 放置插件，并在 `pallas.toml` 中设置：

```toml
[bootstrap]
extra_plugin_dirs = ["local/plugins"]
```

详见 [站点定制与更新](../architecture/site-customization-and-updates.md)。

## 质量检查（与 CI 一致）

```bash
uv run ruff check src/
uv run ruff format --check src/
```

自动修复：

```bash
uv run ruff check --fix src/
uv run ruff format src/
```

运行测试：

```bash
uv run pytest
```

可选（与 CI 对齐，不阻断合并）：

```bash
uv run pip-audit
docker build -t test-build .
```

## pre-commit（推荐）

```bash
uv run pre-commit install
uv run pre-commit run -a
```

策略说明：**全仓**做 YAML/TOML、尾随空格等基础检查；**Ruff 仅作用于 `src/`**；`.env` 被排除以免误改本地密钥。

## 日志习惯

项目使用 **loguru 风格**的 `logger`（NoneBot 提供）。占位符用 `{}` 或 f-string，避免 `logger.debug("msg %s", x)` 导致消息里仍显示 `%s`。

## 下一步

- 准备提 PR：[贡献与提交流程](workflow.md)
- 写新功能：[插件开发入门](plugin/getting-started.md)
