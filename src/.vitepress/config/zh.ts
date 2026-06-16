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
      label: '本页目录'
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
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '快速开始',
      link: '/guide/quickstart',
      activeMatch: '/guide/'
    },
    {
      text: '部署',
      link: '/deploy/deployment',
      activeMatch: '/deploy/'
    },
    {
      text: '口令与插件',
      link: '/guide/usage',
      activeMatch: '/guide/usage|/plugins/'
    },
    {
      text: '开发',
      link: '/develop/plugin/getting-started',
      activeMatch: '/develop/'
    },
    {
      text: 'FAQ',
      link: '/deploy/faq',
      activeMatch: '/deploy/faq'
    },
    {
      text: '萌新',
      link: '/noobook',
      activeMatch: '/noobook'
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '认识牛牛',
      collapsed: false,
      items: [
        { text: '选一条路', link: '/guide/welcome' },
        { text: '理解架构（可跳过）', link: '/guide/concepts' }
      ]
    },
    {
      text: '快速开始',
      collapsed: false,
      items: [
        { text: '五分钟跑起来', link: '/guide/quickstart' },
        { text: '完整部署核对', link: '/guide/start' },
        { text: '标准部署（生产）', link: '/deploy/deployment' },
        { text: 'Docker 部署', link: '/deploy/docker' },
        { text: '配置要点', link: '/deploy/config' }
      ]
    },
    {
      text: '玩转牛牛',
      collapsed: false,
      items: [
        { text: '口令与功能', link: '/guide/usage' },
        { text: 'AI 扩展', link: '/guide/ai' },
        { text: '插件手册', link: '/plugins/index' }
      ]
    },
    {
      text: '插件详解',
      base: '/plugins/',
      collapsed: true,
      items: [
        { text: '复读 repeater', link: 'repeater' },
        { text: '帮助 help', link: 'help' },
        { text: '欢迎 greeting', link: 'greeting' },
        { text: '喝酒 drink', link: 'drink' },
        { text: '轮盘 roulette', link: 'roulette' },
        { text: '决斗 duel', link: 'duel' },
        { text: '做梦 dream', link: 'dream' },
        { text: '唱歌 sing', link: 'sing' },
        { text: '画画 pallas_image', link: 'pallas_image' },
        { text: '聊天 chat', link: 'chat' },
        { text: '夺舍 take_name', link: 'take_name' },
        { text: '控制台 pallas_webui', link: 'pallas_webui' },
        { text: '协议端 pallas_protocol', link: 'pallas_protocol' },
        { text: 'MAA maa', link: 'maa' },
        { text: '连通 connectivity', link: 'connectivity' },
        { text: '状态 bot_status', link: 'bot_status' },
        { text: '申请 request_handler', link: 'request_handler' },
        { text: '拉黑 blacklist', link: 'blacklist' },
        { text: '拦截 block', link: 'block' },
        { text: '回调 callback', link: 'callback' },
        { text: '上号 relogin_bot', link: 'relogin_bot' }
      ]
    },
    {
      text: '查阅',
      collapsed: true,
      items: [
        { text: '常见问题 FAQ', link: '/deploy/faq' },
        { text: '关于项目', link: '/about/index' },
        { text: '迁移指南', link: '/about/migration' }
      ]
    },
    {
      text: '架构',
      base: '/architecture/',
      collapsed: true,
      items: [
        { text: '项目结构', link: 'project-structure' },
        { text: '配置存储', link: 'settings-storage' },
        { text: '插件规范', link: 'plugin-convention' },
        { text: '入站调度', link: 'central-ingress-dispatch' },
        { text: '多进程分片', link: 'bot-process-sharding' },
        { text: '多机协同与语料', link: 'control-plane-corpus-federation' },
        { text: '站点定制与扩展', link: 'site-customization-and-updates' }
      ]
    },
    {
      text: '通用能力',
      base: '/common/',
      collapsed: true,
      items: [
        { text: 'Web 控制台', link: 'webui' },
        { text: '消息审查', link: 'message_scrub' },
        { text: '命令权限', link: 'cmd_perm' },
        { text: '社区统计', link: 'community_stats' },
        { text: '语料联邦', link: 'corpus' }
      ]
    },
    {
      text: '开发',
      base: '/develop/',
      collapsed: true,
      items: [
        { text: '开发总览', link: 'index' },
        { text: '本地环境', link: 'environment' },
        { text: '贡献流程', link: 'workflow' },
        { text: '插件开发入门', link: 'plugin/getting-started' },
        { text: '插件结构', link: 'plugin/structure' },
        { text: '进阶能力', link: 'plugin/advanced' },
        { text: 'WebUI 前端', link: 'webui' }
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
        {
          text: 'Linux',
          collapsed: true,
          items: [
            { text: '选择部署方式', link: 'advance/linux/install' },
            { text: '装 Linux', link: 'advance/linux/install-os' },
            { text: 'SSH 连接', link: 'advance/linux/ssh' },
            { text: '用户与权限', link: 'advance/linux/permission' },
            { text: '包管理器', link: 'advance/linux/package' },
            { text: 'systemd 常驻', link: 'advance/linux/systemd' },
            { text: '常用工具', link: 'advance/linux/tools' },
            { text: '网络与防火墙', link: 'advance/linux/network' },
            { text: '排障', link: 'advance/linux/debug' }
          ]
        },
        {
          text: 'Windows',
          collapsed: true,
          items: [
            { text: 'Windows 跑 Bot 注意', link: 'advance/windows/' },
            { text: '安装 Python', link: 'advance/windows/python' },
            { text: '安装 PostgreSQL', link: 'advance/windows/postgresql' },
            { text: '编译依赖', link: 'advance/windows/buildtools' }
          ]
        },
        { text: 'Python 环境 (uv)', link: 'advance/python-env' },
        { text: 'Git 基础', link: 'advance/git' },
        { text: '你过关了', link: 'welldone' }
      ]
    }
  ]
}
