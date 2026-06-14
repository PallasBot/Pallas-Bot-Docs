# 插件文档索引

各插件的「怎么配、怎么用、怎么排障」见子目录 `README.md`（统一结构见 [TEMPLATE.md](https://github.com/PallasBot/Pallas-Bot/blob/main/docs/plugins/TEMPLATE.md)）；`PluginMetadata` 约定见 [cmd_perm](/common/cmd_perm)。

**配置**：有 `config.py` 的插件以该文件字段为准；无独立配置的插件（如 `take_name`、`blacklist`）在文档中单独说明。推荐在 WebUI **插件 / 通用配置** 中修改，落盘 **`data/pallas_config/webui.json`**。

## 远控与运维

| 文档 | 说明 |
| --- | --- |
| [maa](/plugins/maa) | MAA 远程控制（getTask / reportStatus、QQ 绑定与口令） |
| [connectivity](/plugins/connectivity) | 牛牛连通：画画 / MAA / 唱歌延迟检测 |
| [pallas_webui](/plugins/pallas_webui) | Web 控制台 |
| [pallas_protocol](/plugins/pallas_protocol) | NapCat/SnowLuma 协议端管理 |
| [relogin_bot](/plugins/relogin_bot) | 重新上号、创建牛牛 |
| [bot_status](/plugins/bot_status) | 在线状态与通知 |

## 群聊玩法

| 文档 | 说明 |
| --- | --- |
| [repeater](/plugins/repeater) | 学习型复读 |
| [drink](/plugins/drink) | 喝酒 / 醒酒 |
| [roulette](/plugins/roulette) | 轮盘 |
| [duel](/plugins/duel) | 决斗、八角笼牛 |
| [who_is_spy](/plugins/who_is_spy) | 谁是卧底 |
| [dream](/plugins/dream) | 做梦、跨群漂流、历史梦 |
| [chat](/plugins/chat) | 酒后聊天（AI） |
| [ollama](/plugins/ollama) | 随时闲聊（Ollama） |
| [sing](/plugins/sing) | 唱歌（AI） |
| [draw](/plugins/draw) | 画画（AI） |
| [take_name](/plugins/take_name) | 自动夺舍（群名片） |

## 帮助与管理

| 文档 | 说明 |
| --- | --- |
| [help](/plugins/help) | 三级帮助图、插件开关 |
| [greeting](/plugins/greeting) | 入群/好友欢迎 |
| [request_handler](/plugins/request_handler) | 好友/入群申请审批 |
| [blacklist](/plugins/blacklist) | 全局拉黑 |
| [block](/plugins/block) | 其它牛牛与睡眠期拦截 |

## 通用能力（`docs/common/`）

索引见 [common/README.md](../common/README.md)。

| 文档 | 说明 |
| --- | --- |
| [cmd_perm](/common/cmd_perm) | 命令权限、帮助菜单动态「何人可用」 |
| [message_scrub](/common/message_scrub) | 消息清洗（复读/做梦等共用） |
| [webui](/common/webui) | 配置热重载、服务网关段 |
| [在线统计与社区主站](../common/community_stats.md) | 主站 [stats.pallasbot.top](https://stats.pallasbot.top/) 与上报配置（默认开启） |
| [语料联邦](/common/corpus) | 本机 + 社区共享接话池 |

## 其它

- [callback](/plugins/callback)：异步任务 HTTP 回调
- 控制台与协议端共用浏览器登录，口令在 `data/pallas_console/`；遗忘见 [FAQ · 部署排障](/deploy/faq#部署排障)
- 各子目录 README 文末 **实现见** 指向 [`src/plugins/`](https://github.com/PallasBot/Pallas-Bot/tree/main/src/plugins/)
