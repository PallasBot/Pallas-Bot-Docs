# 插件手册

各插件说明见下表；仓库内还有 `docs/plugins/<name>/README.md` 供维护者对照。

**改配置**：优先在 Web 控制台 **插件 / 通用配置** 保存，落盘 `data/pallas_config/webui.json`。命令权限与帮助「何人可用」见 [cmd_perm](/common/cmd_perm)。

::: info 4.0 插件来源
**核心** — 默认随 `uv sync` 加载（复读、帮助、控制台等）。**官方扩展** — 控制台「官方扩展」或 `pallas ext install` 安装。**站点插件** — `local/plugins/`。
:::

## 远控与运维

| 文档 | 说明 |
| --- | --- |
| [pallas_webui](/plugins/pallas_webui) | Web 控制台 |
| [pallas_protocol](/plugins/pallas_protocol) | NapCat / SnowLuma 协议端 |
| [maa](/plugins/maa) | MAA 远控 |
| [connectivity](/plugins/connectivity) | 网关连通检测 |
| [bot_status](/plugins/bot_status) | 在线状态 |
| [relogin_bot](/plugins/relogin_bot) | 重新上号、创建牛牛 |

## 群聊玩法

| 文档 | 说明 |
| --- | --- |
| [repeater](/plugins/repeater) | 学习型复读 |
| [drink](/plugins/drink) | 喝酒 |
| [roulette](/plugins/roulette) | 轮盘 |
| [duel](/plugins/duel) | 决斗 |
| [who_is_spy](/plugins/who_is_spy) | 谁是卧底 |
| [dream](/plugins/dream) | 做梦 |
| [chat](/plugins/chat) | 酒后聊天（遗留 RWKV） |
| [sing](/plugins/sing) | 唱歌 |
| [pallas_image](/plugins/pallas_image) | 画画 |
| [take_name](/plugins/take_name) | 夺舍群名片 |

## 管理

| 文档 | 说明 |
| --- | --- |
| [help](/plugins/help) | 帮助图 |
| [greeting](/plugins/greeting) | 欢迎 |
| [request_handler](/plugins/request_handler) | 好友/入群申请 |
| [blacklist](/plugins/blacklist) | 全局拉黑 |
| [block](/plugins/block) | 拦截其它牛 |

## 通用能力

| 文档 | 说明 |
| --- | --- |
| [cmd_perm](/common/cmd_perm) | 命令权限 |
| [message_scrub](/common/message_scrub) | 消息审查 |
| [community_stats](/common/community_stats) | 社区统计 |
| [corpus](/common/corpus) | 语料与社区共享 |
