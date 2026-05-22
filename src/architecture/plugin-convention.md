# 插件规范

Pallas-Bot 插件开发遵循 NoneBot2 插件规范。

## 插件结构

```
plugin_name/
├── __init__.py      # 插件入口
├── config.py       # 插件配置
├── plugins/        # 子插件（可选）
└── ...
```

## 配置定义

使用 Pydantic 定义配置：

```python
from pydantic import BaseModel
from nonebot import Config

class PluginConfig(BaseModel):
    enable_feature: bool = True
```

## 依赖声明

在插件的 `pyproject.toml` 或通过 `nonebot-plugin-xxx` 声明依赖。