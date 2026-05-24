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
        { text: '快速开始', link: 'start' },
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
        { text: 'repeater', link: 'repeater' },
        { text: 'greeting', link: 'greeting' },
        { text: 'take_name', link: 'take_name' },
        { text: 'drink', link: 'drink' },
        { text: 'roulette', link: 'roulette' },
        { text: 'duel', link: 'duel' },
        { text: 'chat', link: 'chat' },
        { text: 'dream', link: 'dream' },
        { text: 'sing', link: 'sing' },
        { text: 'pallas_image', link: 'pallas_image' },
        { text: 'connectivity', link: 'connectivity' },
        { text: 'maa', link: 'maa' },
        { text: 'pallas_webui', link: 'pallas_webui' },
        { text: 'pallas_protocol', link: 'pallas_protocol' },
        { text: 'block', link: 'block' },
        { text: 'blacklist', link: 'blacklist' },
        { text: 'request_handler', link: 'request_handler' },
        { text: 'callback', link: 'callback' },
        { text: 'bot_status', link: 'bot_status' },
        { text: 'relogin_bot', link: 'relogin_bot' },
        { text: 'help', link: 'help' }
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
        { text: '站点定制与更新', link: 'site-customization-and-updates' }
      ]
    },
    {
      text: '开发',
      base: '/develop/',
      collapsed: true,
      items: [
        { text: '插件开发', link: 'plugin/getting-started' },
        { text: '项目结构', link: 'plugin/structure' },
        { text: '进阶功能', link: 'plugin/advanced' }
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
        { text: '社区统计', link: 'community_stats' }
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
    }
  ]
}