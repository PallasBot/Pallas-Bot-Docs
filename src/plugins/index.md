# 插件文档索引

各插件的「怎么配、怎么用、怎么排障」见子目录 `README.md`（结构见 [TEMPLATE.md](https://github.com/PallasBot/Pallas-Bot/blob/main/docs/plugins/TEMPLATE.md)）。**群内怎么说、谁能用**以 **牛牛帮助** 为准；本文档面向部署者与群管。

**配置**：有 `config.py` 的插件可在 WebUI **插件** 或 **通用配置** 中修改，落盘 `data/pallas_config/webui.json`。

## 本体 core（默认加载）

| 文档 | 说明 |
| --- | --- |
| [repeater](/plugins/repeater) | 学习群聊、接话、复读 |
| [help](/plugins/help) | 帮助图、本群开关插件 |
| [greeting](/plugins/greeting) | 入群/好友欢迎 |
| [drink](/plugins/drink) | 喝酒 / 醒酒 |
| [roulette](/plugins/roulette) | 轮盘 |
| [take_name](/plugins/take_name) | 自动改名片（夺舍） |
| [blacklist](/plugins/blacklist) | 拉黑 / 屏蔽 |
| [request_handler](/plugins/request_handler) | 好友/入群申请 |
| [llm_chat](/plugins/llm_chat) | 随时 @ 智能闲聊（4.0 core） |
| [pallas_webui](/plugins/pallas_webui) | 网页控制台 |

## 官方扩展（bundled，默认 slim 不加载）

安装：`uv sync --extra plugins-<名>` 或 WebUI **官方扩展**。源码仍在 `src/plugins/`。

| 文档 | 扩展包 | 说明 |
| --- | --- | --- |
| [duel](/plugins/duel) | `pallas-plugin-duel` | 决斗、八角笼 |
| [who_is_spy](/plugins/who_is_spy) | `pallas-plugin-who-is-spy` | 谁是卧底 |
| [dream](/plugins/dream) | `pallas-plugin-dream` | 做梦、跨群梦话 |
| [draw](/plugins/draw) | `pallas-plugin-draw` | 画画 |
| [sing](/plugins/sing) | `pallas-plugin-ai-media` | 唱歌、点歌 |
| [chat](/plugins/chat) | `pallas-plugin-ai-media` | 酒后智能对话 |
| [maa](/plugins/maa) | `pallas-plugin-maa` | MAA 远控 |
| [pallas_protocol](/plugins/pallas_protocol) | `pallas-plugin-protocol` | NapCat/SnowLuma |
| [relogin_bot](/plugins/relogin_bot) | `pallas-plugin-protocol` | 重新上号 |
| [bot_status](/plugins/bot_status) | `pallas-plugin-bot-status` | 在吗、报数、邮件 |
| [community_stats](/plugins/community_stats) | `pallas-plugin-community-stats` | 社区统计上报 |

## 已内核化（无独立插件目录）

| 文档 | 说明 |
| --- | --- |
| [connectivity](/plugins/connectivity) | 牛牛连通（`features/service_gateways`） |
| [block](/plugins/block) | 其它牛牛消息拦截（`platform/multi_bot/bot_filter`） |
| [callback](/plugins/callback) | 异步任务结果回传（`platform/ai_callback`） |
| [ingress_gate](/plugins/ingress_gate) | 群消息预处理（`platform/ingress/gate`） |

## 通用能力（`docs/common/`）

| 文档 | 说明 |
| --- | --- |
| [cmd_perm](/common/cmd_perm) | 命令权限 |
| [command_limits](/common/command_limits) | 命令冷却 |
| [message_scrub](/common/message_scrub) | 消息审查 |
| [webui](/common/webui) | 配置热重载 |
| [社区共享接话库](/common/corpus) | 本机 + 社区语料 |
| [在线统计](/common/community_stats) | 社区主站上报 |

## 其它

- [persona](/plugins/persona)：接话行为（群风格等，开发向较多）
- 控制台登录口令在 `data/pallas_console/`；遗忘见 [FAQ](/deploy/faq)
