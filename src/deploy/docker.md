# Docker 部署

使用 Docker Compose 一键部署已构建好的镜像。

## 准备工作

### 安装 Docker

- [Windows Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
- [Linux Docker 安装](https://docs.docker.com/engine/install/ubuntu/)

### 配置 docker-compose.yml

1. 复制仓库的 `docker-compose.yml` 到本地
2. 复制 `.env` 模板到映射路径

## 启动

```bash
# 仅 MongoDB
docker compose up -d

# 使用 PostgreSQL
docker compose --env-file ./pallas-bot/.env --profile postgres up -d
```

## 访问

- Web 控制台：`http://<宿主机>:8088/pallas/`
- 协议端管理：`http://<宿主机>:8088/protocol/console/`