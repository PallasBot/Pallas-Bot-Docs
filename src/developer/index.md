# Developer

这是给本体维护者、官方扩展作者和社区插件作者的开发文档。

## 先读什么

1. [架构总览](/developer/architecture/overview)
2. [Core 与扩展](/developer/architecture/core-vs-extensions)
3. [Golden Plugin](/developer/plugin-development/golden-plugin)
4. [配置与 WebUI](/developer/plugin-development/config-and-webui)
5. [知识源与本地 ingest](/developer/plugin-development/knowledge-sources)
6. [发布](/developer/plugin-development/publishing)

## 你要理解的边界

- Pallas 4.0 不再把所有能力都塞进本体
- core、official extension、community extension 职责不同
- WebUI 源码仓与主仓运行产物分离
- 单进程与分片场景下，插件激活策略不同

::: tip 主入口在这里
`docs/developer/` 是现行开发者主线，`docs/architecture/` 只作深度参考，不再当主入口。
:::
