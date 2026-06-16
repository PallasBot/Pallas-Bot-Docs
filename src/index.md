---
layout: home

title: Pallas-Bot
titleTemplate: 群聊学习型机器人 · 文档

hero:
  name: Pallas-Bot
  text: 群聊学习型机器人
  tagline: |
    会复读、会喝酒，还能接 MAA 与 AI 扩展
  image:
    src: /assets/logo.png
    alt: Pallas-Bot Logo
  actions:
    - theme: brand
      text: 五分钟跑起来
      link: /guide/quickstart
    - theme: alt
      text: 安装官方扩展
      link: /guide/install-extensions
    - theme: alt
      text: 编写插件
      link: /develop/plugin/cookbook
    - theme: alt
      text: GitHub
      link: https://github.com/PallasBot/Pallas-Bot

features:
  - icon: 🐮
    title: 学习型复读
    details: 从群聊里学说法，不堆硬编码问答表；支持跨群语料与全局禁用。
    link: /plugins/repeater
    linkText: 复读插件
  - icon: 🎮
    title: 群聊玩法
    details: 喝酒、轮盘、决斗、做梦……核心轻量，玩法按需装官方扩展。
    link: /plugins/index
    linkText: 插件手册
  - icon: 🔧
    title: 浏览器运维
    details: Web 控制台改配置、看日志、备份数据库；插件商店一键装扩展。
    link: /common/webui
    linkText: 如何使用
  - icon: 🧩
    title: 核心 + 扩展
    details: 默认 slim 核心；决斗、MAA 等走 pip 扩展包，站点插件放 local/plugins。
    link: /guide/install-extensions
    linkText: 安装扩展
  - icon: 🤖
    title: 连接 QQ
    details: 通过 NapCat 等 OneBot v11 协议端接入，控制台可管多账号。
    link: /guide/connect-qq
    linkText: 连接协议端
  - icon: 🗄️
    title: 双数据库
    details: MongoDB 或 PostgreSQL 二选一，配置写在 pallas.toml。
    link: /deploy/config
    linkText: 配置要点
  - icon: 🤖
    title: AI 与 MAA
    details: 对接 Pallas-Bot-AI 玩聊天/唱歌/画画；MAA 远控口令排队回图。
    link: /guide/ai
    linkText: AI 扩展
  - icon: 📄
    title: 文档齐全
    details: 安装、部署、插件、开发 Cookbook 与萌新引导一应俱全。
    link: /guide/welcome
    linkText: 选一条路
---

<div style="text-align: center; margin: 3em 0 1em;">

<div style="font-size: 1.35em; font-weight: 600; margin-bottom: 1em;">获得帮助</div>

<div style="display: flex; justify-content: center; gap: 1em; flex-wrap: wrap;">
  <a href="https://github.com/PallasBot/Pallas-Bot/issues" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5em; padding: 0.55em 1.1em; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; color: var(--vp-c-text-1);">
    <span>🐛</span> GitHub Issues
  </a>
  <a href="/deploy/faq" style="display: inline-flex; align-items: center; gap: 0.5em; padding: 0.55em 1.1em; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; color: var(--vp-c-text-1);">
    <span>💫</span> 常见问题
  </a>
  <a href="https://stats.pallasbot.top/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5em; padding: 0.55em 1.1em; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; color: var(--vp-c-text-1);">
    <span>◉</span> 社区统计
  </a>
</div>

</div>
