# 插件索引

Pallas-Bot 采用插件化设计，以下是所有可用插件。

## 核心插件

| 插件 | 说明 | 依赖 |
| --- | --- | --- |
| [repeater](repeater) | 牛牛复读核心组件 | - |
| [greeting](greeting) | 入群/好友欢迎 | - |
| [take_name](take_name) | 自动夺舍 | repeater |
| [drink](drink) | 牛牛喝酒 | block |
| [roulette](roulette) | 轮盘玩法 | - |
| [duel](duel) | 决斗玩法 | - |
| [chat](chat) | AI 聊天 | callback, drink |
| [dream](dream) | 漂流瓶 | - |
| [sing](sing) | AI 唱歌 | callback |
| [pallas_webui](pallas_webui) | Web 控制台 | - |
| [pallas_protocol](pallas_protocol) | 协议端管理 | - |
| [maa](maa) | MAA 远控 | - |

## 管理插件

| 插件 | 说明 |
| --- | --- |
| [block](block) | 黑名单，不回复指定用户 |
| [blacklist](blacklist) | 黑名单功能 |
| [request_handler](request_handler) | 处理入群/好友请求 |
| [callback](callback) | 回调接口 |
| [bot_status](bot_status) | Bot 状态查询 |
| [relogin_bot](relogin_bot) | 重新登录 |
| [help](help) | 帮助信息 |