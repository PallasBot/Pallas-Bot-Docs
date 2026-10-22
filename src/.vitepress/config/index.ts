import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { shared } from './shared'
import { zh } from './zh'
import NCard from '../components/NCard.vue';
export default withMermaid(defineConfig({
  ...shared,
  // vitepress-plugin-mermaid 默认 securityLevel: 'loose'；显式收紧为 strict，
  // 让 Mermaid 对图内文本走 DOMPurify 清洗（本站图为仓库内可信 Markdown）。
  mermaid: {
    securityLevel: 'strict',
  },
  locales: {
    root: { label: '简体中文', ...zh }
  },
}))