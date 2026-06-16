# 理解牛牛是怎么拼起来的

::: tip 可跳过
只想先把 Bot 跑起来？直接看 [五分钟跑起来](/guide/quickstart)。本节帮助理解「为什么要装数据库、协议端、控制台」。
:::

一只完整的牛牛，大致由四块组成：

```text
QQ 协议端（NapCat 等）  ←→  Pallas-Bot 本体  ←→  数据库（Mongo / PostgreSQL）
                                    │
                              Web 控制台 / 协议端页
```

| 部分 | 干什么 | 你要不要管 |
| --- | --- | --- |
| **协议端** | 帮 Bot 连上 QQ，收发消息 | 首次部署要登录一次 QQ |
| **Pallas-Bot** | 复读、喝酒、帮助、权限等逻辑 | `uv run nb run` 启动的就是它 |
| **数据库** | 语料、群配置、黑名单等 | 本机或 Docker 起一个库即可 |
| **Web 控制台** | 浏览器改配置、看日志、备份 | 启动后访问 `/pallas/`，用日志里的口令登录 |

## 配置写在哪

| 优先级 | 文件 | 写什么 |
| --- | --- | --- |
| 最低 | `config/pallas.toml` | 监听端口、超管 QQ、数据库连接 |
| 中间 | 遗留 `.env`（可选） | 第三方 nb/pip 插件专用 |
| **最高** | `data/pallas_config/webui.json` | 控制台里改的插件开关与参数 |

日常改插件项：**打开控制台保存即可**，不必手改 TOML。细节见 [配置存储](/architecture/settings-storage)。

## 插件从哪来

4.0 起默认只带 **核心插件**（复读、帮助、控制台等）。决斗、MAA、唱歌等属于 **官方扩展**，需要时在控制台「官方扩展」安装，或 `pallas ext install`。

站点自写插件放在 `local/plugins/`，见 [站点定制](/architecture/site-customization-and-updates)。

## 和 AI 的关系

「酒后聊天」「唱歌」「画画」等需要另起 [Pallas-Bot-AI](https://github.com/PallasBot/Pallas-Bot-AI) 服务，在控制台填 AI 地址。不玩 AI 可以完全不装。

## 下一步

- [五分钟跑起来](/guide/quickstart) — 最少步骤上线
- [口令与功能](/guide/usage) — 群里能玩什么
- [多进程分片](/architecture/bot-process-sharding) — 多牛、高负载再看
