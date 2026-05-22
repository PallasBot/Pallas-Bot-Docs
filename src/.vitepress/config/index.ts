import { defineConfig } from 'vitepress'
import { shared } from './shared'
import { zh } from './zh'
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(defineConfig({
  ...shared,
  locales: {
    root: { label: '简体中文', ...zh }
  },
  mermaidPlugin: {
    class: "mermaid my-class",
  }
}));