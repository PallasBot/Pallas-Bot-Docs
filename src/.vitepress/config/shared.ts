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

const isProd = process.env.NODE_ENV === 'production'

const siteBase = '/Pallas-Bot-Docs'
const siteIcon = `${siteBase}/assets/pallas-priest.png`

export const shared = defineConfig({
  title: 'Pallas-Bot',
  base: siteBase,
  ignoreDeadLinks: true,
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  vite: {
    cacheDir: '.vitepress/cache/vite',
    ssr: {
      noExternal: ['@nolebase/*'],
    },
    plugins: [
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
    logo: { src: '/assets/pallas-priest.png', width: 24, height: 24 },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PallasBot/Pallas-Bot' },
      { icon: { svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>' }, link: 'https://github.com/PallasBot/Pallas-Bot-Docs' },
    ],
  },
})