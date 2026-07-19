import type { Plugin } from 'vite'

/** 对齐 GSUID：无自定义标题的 container 补默认标题 */
export function MarkdownTransform(): Plugin {
  return {
    name: 'pallas-md-transform',
    enforce: 'pre',
    transform(code, id) {
      if (!id.match(/\.md(\?|$)/))
        return null

      let out = code
      // 仅补「无标题」行；已有自定义标题的 ::: tip xxx 不动
      out = out.replace(/^::: tip\s*$/gm, '::: tip 💡 提醒')
      out = out.replace(/^::: warning\s*$/gm, '::: warning 🚨 警告')
      out = out.replace(/^::: danger\s*$/gm, '::: danger 🔥 注意')
      out = out.replace(/^::: info\s*$/gm, '::: info 📝 备注')
      return out === code ? null : out
    },
  }
}
