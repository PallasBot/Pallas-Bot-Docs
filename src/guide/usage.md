# 功能列表

牛牛的核心是**学习型复读**，并附带喝酒、轮盘、AI 扩展与 MAA 远控等群聊玩法。群内发送 **牛牛帮助** 可查看当前群已启用的插件与口令。

## 基础玩法

| 口令 / 能力 | 说明 |
| --- | --- |
| 牛牛帮助 | 三级帮助图、插件开关（群管/号主） |
| 牛牛喝酒 / 牛牛醒一醒 | 醉酒状态，影响聊天、轮盘、夺舍等 |
| 牛牛轮盘 | 踢人/禁言轮盘，`牛牛救一下` / `牛牛补一枪` |
| 牛牛做梦 | 语料与图片漂流瓶 |
| repeater / greeting / take_name | 复读、入群欢迎、自动夺舍（被动） |

## AI 扩展

需部署 [Pallas-Bot-AI](https://github.com/PallasBot/Pallas-Bot-AI) 并在 WebUI 配置网关地址；可用 **牛牛连通** 自检。

| 口令 | 说明 |
| --- | --- |
| 酒后聊天 | 醉酒时 @牛牛 或「牛牛 + 文本」 |
| 牛牛唱歌 / 继续唱 / 点歌 | AI 翻唱与网易云点歌 |
| 牛牛画画 | 文生图 / 改图 |

详见 [AI 扩展](/guide/ai) 与各插件页。

## MAA 远控

绑定设备后可在群聊或私聊使用（完整表见 [maa 插件](/plugins/maa)）：

- `牛牛绑定MAA`、`牛牛MAA状态`、`牛牛切换MAA设备`
- `牛牛长草`、`牛牛作战`、`牛牛公招`、`牛牛基建`、`牛牛截图`、`牛牛停止`

## 运维与管理

| 能力 | 说明 |
| --- | --- |
| Web 控制台 | `/pallas/` — 配置、数据库、备份、更新（[pallas_webui](/plugins/pallas_webui)） |
| 协议端管理 | `/protocol/console/` — NapCat/SnowLuma 多账号（[pallas_protocol](/plugins/pallas_protocol)） |
| 牛牛连通 | 探测画画 / MAA / 唱歌网关（[connectivity](/plugins/connectivity)） |
| 牛牛重新上号 / 创建牛牛 | 号主 / 超管（[relogin_bot](/plugins/relogin_bot)） |
| 好友/入群申请 | [request_handler](/plugins/request_handler) |
| 全局拉黑 / 拦截其它牛 | [blacklist](/plugins/blacklist)、[block](/plugins/block) |

## 权限层级

- **群管理员**：QQ 群管（部分玩法如轮盘禁言）
- **号主**：该牛 `admins` 数组中的 QQ（帮助开关、重新上号等）
- **超管**：[`pallas.toml`](https://github.com/PallasBot/Pallas-Bot/blob/main/config/pallas.example.toml) 的 `superusers`（创建牛牛、全站最高权限）

配置号主见 [FAQ · admins](/deploy/faq#q-如何为牛牛配置号主admins)。
