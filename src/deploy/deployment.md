# 标准部署

快来部署属于你自己的牛牛吧！

## 看前提示

- 你需要一个额外的 QQ 小号
- 一台自己的电脑或服务器，不推荐用大号进行部署
- 牛牛数据不互通，需要从头调教
- 3.0 起提供 Web 控制台与协议端管理

## 环境要求

- Python 3.12+
- uv
- MongoDB 或 PostgreSQL
- OneBot v11 协议端

## 部署步骤

### 1. 下载源码

```bash
git clone https://github.com/PallasBot/Pallas-Bot.git
```

### 2. 安装依赖

```bash
cd Pallas-Bot
uv sync
```

如需 PostgreSQL 支持：

```bash
uv sync --extra pg
```

### 3. 配置数据库

准备好数据库并确保可连接，在 `.env` 中配置连接信息。

### 4. 连接协议端

启动 Pallas-Bot 后，在协议端管理页配置 NapCat 等协议端。

### 5. 启动

```bash
uv run nb run
```

## 后续更新

```bash
git pull origin main --autostash
```

## 更多部署方式

- [Docker 部署](/deploy/docker)
- [FAQ](/deploy/faq)