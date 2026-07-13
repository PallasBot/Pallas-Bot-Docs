# block（其它牛牛拦截）

> **4.0 起已收进内核**：[`pallas/core/platform/multi_bot/bot_filter.py`](https://github.com/PallasBot/Pallas-Bot/blob/dev-v2/pallas/core/platform/multi_bot/bot_filter.py) 与 [`connected_roster.py`](https://github.com/PallasBot/Pallas-Bot/blob/dev-v2/pallas/core/platform/multi_bot/connected_roster.py)。独立插件目录已移除。

拦截**其它牛牛账号**在本群的群消息与部分通知，避免多 Bot 互相触发逻辑（内核 `bot_filter`）。

## 用户命令

无（维护者向能力）。

## 实现

- 连接名册：`pallas/core/platform/multi_bot/connected_roster.py`
- 互聊过滤与 sleep 拦截：`pallas/core/platform/multi_bot/bot_filter.py`
- 启动注册：`pallas/core/platform/bot_runtime/kernel_runtime.py`
