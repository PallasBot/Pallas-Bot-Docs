import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'
import taskLists from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'
import timeline from 'vitepress-markdown-timeline'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { MarkdownTransform } from '../plugins/markdownTransform'

const isProd = process.env.NODE_ENV === 'production'

const siteBase = '/Pallas-Bot-Docs'
const siteIcon = `${siteBase}/assets/favicon.png`

export const shared = defineConfig({
  title: 'Pallas-Bot',
  base: siteBase,
  // 外链与示例 URL 不验；站内死链在 CI/本地 build 时暴露
  ignoreDeadLinks: [
    /^https?:\/\//,
    /^mailto:/,
    // OpenAPI / 运行时示例
    /openapi\.json/,
    /localhost/,
    /127\.0\.0\.1/,
  ],
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  vite: {
    cacheDir: '.vitepress/cache/vite',
    server: {
      allowedHosts: ['aknyzsd.icu'],
    },
    ssr: {
      noExternal: ['@nolebase/*'],
    },
    plugins: [
      MarkdownTransform(),
      GitChangelog({
        maxGitLogCount: 80,
        repoURL: () => 'https://github.com/PallasBot/Pallas-Bot',
      }),
      ...(isProd
        ? [
            GitChangelogMarkdownSection({
              exclude: (id) => id.endsWith('index.md'),
              sections: {
                disableChangelog: false,
                disableContributors: true,
              },
            }) as any,
          ]
        : []),
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: ['index.md'],
      }),
      groupIconVitePlugin({
        customIcon: {
          ts: 'logos:typescript',
          js: 'logos:javascript',
          md: 'logos:markdown',
          css: 'logos:css-3',
        },
      }),
    ],
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(timeline)
      md.use(taskLists)
      md.use(InlineLinkPreviewElementTransform)
      md.use(groupIconMdPlugin)
    },
  },

  sitemap: {
    hostname: 'https://PallasBot.github.io/Pallas-Bot-Docs/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: siteIcon }],
    ['link', { rel: 'apple-touch-icon', href: siteIcon }],
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
  ],

  themeConfig: {
    logo: { src: '/assets/favicon.png', width: 24, height: 24 },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PallasBot/Pallas-Bot' },
    ],
  },
})