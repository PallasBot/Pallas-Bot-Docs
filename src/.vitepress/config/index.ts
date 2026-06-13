import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { shared } from './shared'
import { zh } from './zh'
import NCard from '../components/NCard.vue';
export default withMermaid(defineConfig({
  ...shared,
  locales: {
    root: { label: '简体中文', ...zh }
  },
}))