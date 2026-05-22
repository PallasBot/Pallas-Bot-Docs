# 快速开始

Pallas-Bot（牛牛）是一个面向群聊场景的学习型机器人。

## 环境要求

- Python 3.12+
- uv
- MongoDB 或 PostgreSQL
- OneBot v11 协议端

## 快速部署

```bash
# 获取代码
git clone https://github.com/PallasBot/Pallas-Bot.git

# 进入目录
cd Pallas-Bot

# 安装依赖
pip install uv
uv sync

# 开始运行
uv run nb run
```

## 完整部署

详细部署教程请参考 [部署文档](/deploy/deployment)。

## 下一步

- [功能列表](/guide/usage) - 了解牛牛的所有功能
- [部署文档](/deploy/deployment) - 完整的部署教程
- [插件索引](/plugins/index) - 查看所有可用插件