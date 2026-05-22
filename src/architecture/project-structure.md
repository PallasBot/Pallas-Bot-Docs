# 项目结构

Pallas-Bot 基于 NoneBot2 框架开发，采用插件化架构。

## 目录结构

```
Pallas-Bot/
├── src/
│   ├── plugins/          # 插件目录
│   │   ├── repeater/     # 复读插件
│   │   ├── greeting/    # 欢迎插件
│   │   ├── take_name/   # 夺舍插件
│   │   └── ...
│   └── common/          # 通用模块
│       ├── db.py        # 数据库初始化
│       └── utils/       # 工具函数
├── docs/               # 文档目录
├── tools/             # 工具脚本
└── ...
```

## 技术栈

- **框架**: NoneBot2
- **协议**: OneBot v11
- **数据库**: MongoDB / PostgreSQL
- **语言**: Python 3.12+