import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '面向群聊场景的学习型机器人',

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
      label: '页面导航'
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
      link: '/guide/start',
      activeMatch: '/guide/'
    },
    {
      text: '部署',
      link: '/deploy/deployment',
      activeMatch: '/deploy/'
    },
    {
      text: '使用指南',
      link: '/guide/usage',
      activeMatch: '/guide/usage'
    },
    {
      text: '插件开发',
      link: '/develop/plugin/getting-started',
      activeMatch: '/develop/'
    },
    {
      text: '关于',
      link: '/about',
      activeMatch: '/about'
    },
    {
      text: '萌新引导',
      link: '/noobook',
      activeMatch: '/noobook'
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '快速开始',
      base: '/guide/',
      collapsed: true,
      items: [
        { text: '欢迎！', link: 'welcome' },
        { text: '快速部署', link: 'start' },
        { text: '功能列表', link: 'usage' },
        { text: 'AI 扩展', link: 'ai' }
      ]
    },
    {
      text: '部署',
      base: '/deploy/',
      collapsed: true,
      items: [
        { text: '标准部署', link: 'deployment' },
        { text: 'Docker 部署', link: 'docker' },
        { text: '配置要点', link: 'config' },
        { text: 'FAQ', link: 'faq' }
      ]
    },
    {
      text: '插件',
      base: '/plugins/',
      collapsed: true,
      items: [
        { text: '插件索引', link: 'index' },
        { text: '牛牛复读 - repeater', link: 'repeater' },
        { text: '牛牛欢迎 - greeting', link: 'greeting' },
        { text: '自动夺舍 - take_name', link: 'take_name' },
        { text: '牛牛喝酒 - drink', link: 'drink' },
        { text: '牛牛轮盘 - roulette', link: 'roulette' },
        { text: '牛牛决斗 - duel', link: 'duel' },
        { text: '酒后聊天 - chat', link: 'chat' },
        { text: '牛牛做梦 - dream', link: 'dream' },
        { text: '牛牛唱歌 - sing', link: 'sing' },
        { text: '牛牛画画 - pallas_image', link: 'pallas_image' },
        { text: '牛牛连通 - connectivity', link: 'connectivity' },
        { text: 'MAA 远控 - maa', link: 'maa' },
        { text: 'Web 控制台 - pallas_webui', link: 'pallas_webui' },
        { text: '协议端管理 - pallas_protocol', link: 'pallas_protocol' },
        { text: '其它牛牛拦截 - block', link: 'block' },
        { text: '牛牛黑名单 - blacklist', link: 'blacklist' },
        { text: '申请管理 - request_handler', link: 'request_handler' },
        { text: '任务回调 - callback', link: 'callback' },
        { text: '牛牛状态 - bot_status', link: 'bot_status' },
        { text: '重新上号 - relogin_bot', link: 'relogin_bot' },
        { text: '牛牛帮助 - help', link: 'help' }
      ]
    },
    {
      text: '架构',
      base: '/architecture/',
      collapsed: true,
      items: [
        { text: '项目结构', link: 'project-structure' },
        { text: '插件规范', link: 'plugin-convention' },
        { text: '配置存储', link: 'settings-storage' },
        { text: '多进程分片', link: 'bot-process-sharding' },
        { text: '控制面与语料联邦', link: 'control-plane-corpus-federation' },
        { text: '站点定制与更新', link: 'site-customization-and-updates' }
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
        { text: '插件开发', link: 'plugin/getting-started' },
        { text: '插件结构', link: 'plugin/structure' },
        { text: '进阶能力', link: 'plugin/advanced' },
        { text: 'WebUI 前端', link: 'webui' }
      ]
    },
    {
      text: '通用能力',
      base: '/common/',
      collapsed: true,
      items: [
        { text: 'Web 控制台', link: 'webui' },
        { text: '消息处理', link: 'message_scrub' },
        { text: '命令权限', link: 'cmd_perm' },
        { text: '社区统计', link: 'community_stats' },
        { text: '语料联邦', link: 'corpus' }
      ]
    },
    {
      text: '关于',
      base: '/about/',
      collapsed: true,
      items: [
        { text: '关于项目', link: 'index' },
        { text: '迁移指南', link: 'migration' },
        { text: '致谢', link: 'thanks' }
      ]
    },
    {
      text: '萌新引导',
      base: '/noobook/',
      collapsed: true,
      items: [
        {
          text: '猪猪指南',
          collapsed: true,
          items: [
            { text: '哼唧哼唧哼?', link: 'noob/fornoob' },
            { text: '你需要知道的', link: 'noob/u2know' },
            { text: '一些工具', link: 'noob/tools' }
          ]
        },
        { text: 'young man!', link: 'advance/forplayer' },
        {
          text: 'linux',
          collapsed: true,
          items: [
            { text: '选择你的系统和部署方式', link: 'advance/linux/install' },
            { text: '在物理机上装 Linux', link: 'advance/linux/install-os' },
            { text: '连上你的 Linux 猪机', link: 'advance/linux/ssh' },
            { text: '用户和权限：凭什么我能动它？', link: 'advance/linux/permission' },
            { text: '装东西：包管理器一览', link: 'advance/linux/package' },
            { text: '让 bot 一直活着', link: 'advance/linux/systemd' },
            { text: '常用小工具速查', link: 'advance/linux/tools' },
            { text: '网络和防火墙：连不上 WebUI？八成是门被锁了', link: 'advance/linux/network' },
            { text: '出问题了？先看一眼这几处', link: 'advance/linux/debug' }
          ]
        },
        {
          text: 'windows',
          collapsed: true,
          items: [
            { text: '先听一嘴:Windows 跑 bot 的坑', link: 'advance/windows/' },
            { text: '装 Python 3.12+', link: 'advance/windows/python' },
            { text: '装 PostgreSQL', link: 'advance/windows/postgresql' },
            { text: 'jieba 编译翻车救命包', link: 'advance/windows/buildtools' }
          ]
        },
        { text: 'Python 环境管理(venv/pip/uv)', link: 'advance/python-env' },
        { text: '要用 Git!', link: 'advance/git' },
        { text: '你过关!', link: 'welldone' }
      ]
    }]
}