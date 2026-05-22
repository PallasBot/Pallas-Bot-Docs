import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import taskLists from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'
import timeline from 'vitepress-markdown-timeline'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export const shared = defineConfig({
  title: 'Pallas-Bot',
  base: '/Pallas-Bot-docs/',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  vite: {
    ssr: {
      noExternal: ['@nolebase/*'],
    },
    plugins: [
      GitChangelog({
        maxGitLogCount: 2000,
        repoURL: () => 'https://github.com/PallasBot/Pallas-Bot',
      }),
      GitChangelogMarkdownSection({
        exclude: (id) => id.endsWith('index.md'),
        sections: {
          disableChangelog: false,
          disableContributors: true,
        },
      }) as any,
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
    codeTransformers: [transformerTwoslash() as any],
    languages: ['js', 'jsx', 'ts', 'tsx'] as any,
  },

  sitemap: {
    hostname: 'https://PallasBot.github.io/Pallas-Bot-docs/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    },
  },

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/logo.png'
      }
    ],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/logo.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/logo.png' }],
    ['link', { rel: 'mask-icon', href: '/assets/logo.png', color: '#5bbad5' }],
    ['meta', { name: 'theme-color', content: '#5bbad5' }],
  ],

  themeConfig: {
    logo: { src: '/assets/logo.png', width: 24, height: 24 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/PallasBot/Pallas-Bot' }],
  },
})