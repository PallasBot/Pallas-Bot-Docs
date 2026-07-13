import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: 'Pallas-Bot（牛牛）— 群聊学习型机器人文档',

  themeConfig: {
    nav: nav(),

    sidebar: sidebarGuide(),

    prefetchLinks: false,

    editLink: {
      pattern: 'https://github.com/PallasBot/Pallas-Bot-Docs/edit/main/src/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '快速开始',
      items: [
        { text: '五分钟跑起来', link: '/guide/quickstart' },
        { text: '把玩法 / AI 也装上', link: '/guide/4.0-start' },
        { text: '连接 QQ', link: '/guide/connect-qq' },
        { text: '安装官方扩展', link: '/guide/install-extensions' },
        { text: '从 3.x 迁到现行版本', link: '/guide/4.0-migration' },
        { text: '萌新引导', link: '/noobook' }
      ]
    },
    {
      text: '使用',
      items: [
        { text: '口令与玩法', link: '/guide/usage' },
        { text: '网页控制台', link: '/guide/web-console' },
        { text: 'AI 扩展', link: '/guide/ai' },
        { text: '@牛牛与复读/LLM', link: '/guide/llm-and-repeater' },
        { text: '社区插件商店', link: '/guide/community-plugin-store' },
        { text: '插件索引', link: '/plugins/index' }
      ]
    },
    {
      text: '运维',
      items: [
        { text: '运维入口', link: '/maintainer/quickstart' },
        { text: 'Docker 部署', link: '/maintainer/deploy/docker' },
        { text: '单进程部署', link: '/maintainer/deploy/single-process' },
        { text: '分片部署', link: '/maintainer/deploy/sharded' },
        { text: '升级', link: '/maintainer/deploy/upgrade' },
        { text: '排障', link: '/maintainer/operate/troubleshooting' },
        { text: '配置参考', link: '/maintainer/reference/config' },
        { text: '常见问题 FAQ', link: '/deploy/faq' }
      ]
    },
    {
      text: '开发',
      items: [
        { text: '开发者入口', link: '/developer/index' },
        { text: '写第一个插件', link: '/developer/plugin-development/first-plugin' },
        { text: 'Golden Plugin', link: '/developer/plugin-development/golden-plugin' },
        { text: '命令权限', link: '/common/cmd_perm' },
        { text: 'Cookbook', link: '/developer/plugin-development/pallas-api-cookbook' },
        { text: '写社区插件并上架', link: '/guide/community-plugin-author' }
      ]
    },
    {
      text: '更多',
      items: [
        { text: '选一条路', link: '/guide/welcome' },
        { text: '理解架构', link: '/developer/architecture/overview' },
        { text: 'GitHub', link: 'https://github.com/PallasBot/Pallas-Bot' }
      ]
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '上手',
      collapsed: false,
      items: [
        { text: '选一条路', link: '/guide/welcome' },
        { text: '五分钟跑起来', link: '/guide/quickstart' },
        { text: '把玩法 / AI 也装上', link: '/guide/4.0-start' },
        { text: '连接 QQ', link: '/guide/connect-qq' },
        { text: '安装插件', link: '/guide/install-plugins' },
        { text: '安装官方扩展', link: '/guide/install-extensions' },
        { text: '从 3.x 迁到现行版本', link: '/guide/4.0-migration' },
        { text: '从旧版 ollama 迁到 llm_chat', link: '/guide/llm-migrate-from-ollama' }
      ]
    },
    {
      text: '使用',
      collapsed: false,
      items: [
        { text: '口令与功能', link: '/guide/usage' },
        { text: '网页控制台', link: '/guide/web-console' },
        { text: '理解怎么拼起来', link: '/guide/concepts' },
        { text: 'AI 扩展', link: '/guide/ai' },
        { text: '@牛牛与复读/LLM', link: '/guide/llm-and-repeater' },
        { text: '社区插件商店', link: '/guide/community-plugin-store' },
        { text: '进阶', link: '/guide/advanced' }
      ]
    },
    {
      text: '运维',
      collapsed: true,
      items: [
        { text: '运维入口', link: '/maintainer/quickstart' },
        { text: '本体安装', link: '/maintainer/install/bot' },
        { text: 'WebUI', link: '/maintainer/install/webui' },
        { text: '协议端', link: '/maintainer/install/protocol' },
        { text: '官方扩展', link: '/maintainer/install/official-extensions' },
        { text: '安装验收 Checklist', link: '/maintainer/install/ga-install-checklist' },
        { text: 'AI Runtime', link: '/maintainer/install/ai-runtime' },
        { text: '单进程部署', link: '/maintainer/deploy/single-process' },
        { text: 'Docker', link: '/maintainer/deploy/docker' },
        { text: '分片部署', link: '/maintainer/deploy/sharded' },
        { text: '升级', link: '/maintainer/deploy/upgrade' },
        { text: 'Web 控制台', link: '/maintainer/operate/webui' },
        { text: '命令权限', link: '/maintainer/operate/command-permissions' },
        { text: '排障', link: '/maintainer/operate/troubleshooting' },
        { text: 'LLM 与 AI', link: '/maintainer/operate/llm-and-ai' },
        { text: '配置参考', link: '/maintainer/reference/config' }
      ]
    },
    {
      text: '开发',
      collapsed: true,
      items: [
        { text: '入口', link: '/developer/index' },
        { text: '写第一个插件', link: '/developer/plugin-development/first-plugin' },
        { text: '架构总览', link: '/developer/architecture/overview' },
        { text: 'Core 与扩展', link: '/developer/architecture/core-vs-extensions' },
        { text: 'Golden Plugin', link: '/developer/plugin-development/golden-plugin' },
        { text: '配置与 WebUI', link: '/developer/plugin-development/config-and-webui' },
        { text: '命令权限 cmd_perm', link: '/common/cmd_perm' },
        { text: '知识源与 ingest', link: '/developer/plugin-development/knowledge-sources' },
        { text: 'Cookbook', link: '/developer/plugin-development/pallas-api-cookbook' },
        { text: '发布', link: '/developer/plugin-development/publishing' },
        { text: '写社区插件并上架', link: '/guide/community-plugin-author' },
        { text: '官方扩展 PyPI', link: '/develop/extension-pypi-publish' }
      ]
    },
    {
      text: '插件详解',
      collapsed: true,
      items: [
        { text: '插件索引', link: '/plugins/index' },
        {
          text: '本体 core',
          base: '/plugins/',
          collapsed: true,
          items: [
            { text: '复读 repeater', link: 'repeater' },
            { text: '帮助 help', link: 'help' },
            { text: '欢迎 greeting', link: 'greeting' },
            { text: '喝酒 drink', link: 'drink' },
            { text: '轮盘 roulette', link: 'roulette' },
            { text: '夺舍 take_name', link: 'take_name' },
            { text: '拉黑 blacklist', link: 'blacklist' },
            { text: '申请 request_handler', link: 'request_handler' },
            { text: '闲聊 llm_chat', link: 'llm_chat' },
            { text: '控制台 pb_webui', link: 'pb_webui' }
          ]
        },
        {
          text: '官方扩展',
          base: '/plugins/',
          collapsed: true,
          items: [
            { text: '决斗 duel', link: 'duel' },
            { text: '谁是卧底 who_is_spy', link: 'who_is_spy' },
            { text: '做梦 dream', link: 'dream' },
            { text: '画画 draw', link: 'draw' },
            { text: '唱歌 sing', link: 'sing' },
            { text: '聊天 chat', link: 'chat' },
            { text: 'MAA maa', link: 'maa' },
            { text: '协议端 pb_protocol', link: 'pb_protocol' },
            { text: '上号 relogin_bot', link: 'relogin_bot' },
            { text: '状态 bot_status', link: 'bot_status' },
            { text: '社区统计 pb_stats', link: 'pb_stats' }
          ]
        }
      ]
    },
    {
      text: '查阅',
      collapsed: true,
      items: [
        { text: '常见问题 FAQ', link: '/deploy/faq' },
        { text: '关于项目', link: '/about/index' },
        { text: '迁移指南', link: '/about/migration' },
        { text: '命令权限（素材）', link: '/common/cmd_perm' },
        { text: '分片（素材）', link: '/architecture/bot-process-sharding' }
      ]
    },
    {
      text: '萌新引导',
      base: '/noobook/',
      collapsed: true,
      items: [
        {
          text: '从零开始',
          collapsed: true,
          items: [
            { text: '哼唧？', link: 'noob/fornoob' },
            { text: '你需要知道的', link: 'noob/u2know' },
            { text: '一些工具', link: 'noob/tools' }
          ]
        },
        { text: '会装软件了', link: 'advance/forplayer' },
        { text: 'Python 环境 (uv)', link: 'advance/python-env' },
        { text: 'Git 基础', link: 'advance/git' },
        { text: '你过关了', link: 'welldone' }
      ]
    }
  ]
}
