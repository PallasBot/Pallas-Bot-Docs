// mermaid 流程图灯箱：点击 <div class="mermaid"> → 全屏放大查看
// 用 typeof window !== 'undefined' 守护（不依赖 VitePress 的 import.meta.client 特性）
// 加 console.log 方便排查（v2 修复了 v1 的时序问题，但 aknyzsd 反馈仍不工作，需要排查）

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log('[mermaid-lightbox] script loaded, init starting')
  initMermaidLightbox()
}

function initMermaidLightbox() {
  // eslint-disable-next-line no-console
  console.log('[mermaid-lightbox] initMermaidLightbox() called')
  const OVERLAY_ID = '__mermaid_lightbox_overlay__'
  let overlay: HTMLDivElement | null = null
  let lastFocus: HTMLElement | null = null

  // ---------- overlay 生命周期 ----------
  function ensureOverlay(): HTMLDivElement {
    if (overlay) return overlay
    const el = document.createElement('div')
    el.id = OVERLAY_ID
    el.setAttribute('role', 'dialog')
    el.setAttribute('aria-modal', 'true')
    el.innerHTML = `
      <button class="mermaid-lightbox__close" aria-label="关闭" type="button">×</button>
      <div class="mermaid-lightbox__stage"></div>
      <div class="mermaid-lightbox__hint">点击空白处或按 Esc 关闭</div>
    `
    document.body.appendChild(el)

    // 点遮罩本身（非 stage）关闭
    el.addEventListener('click', (e) => {
      if (e.target === el) close()
    })
    el.querySelector('.mermaid-lightbox__close')!.addEventListener('click', close)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && el.classList.contains('is-open')) close()
    })

    overlay = el
    // eslint-disable-next-line no-console
    console.log('[mermaid-lightbox] overlay element created and appended to body')
    return el
  }

  function open(svg: SVGElement) {
    const el = ensureOverlay()
    const stage = el.querySelector('.mermaid-lightbox__stage') as HTMLDivElement
    stage.innerHTML = ''
    // 关键：用 outerHTML 字符串化而不是 cloneNode + removeAttribute('style')
    // mermaid 11 渲染出的 SVG 没有 width/height attribute，**尺寸完全靠 viewBox + style.max-width**
    // 如果 removeAttribute('style')，SVG 失去尺寸信息 → 浏览器渲染成 0×0 → 白点
    stage.innerHTML = svg.outerHTML
    const clone = stage.querySelector('svg')!
    // 让 CSS 灯箱样式控制 max-width/height（95vw × 85vh 等比缩放）
    // 不再手设 inline style.maxWidth —— 之前会跟父容器宽度死循环
    el.classList.add('is-open')
    // 锁背景滚动 —— 重要：必须改 body，不能改 documentElement
    // Mermaid.vue 在监听 documentElement 的 attribute 变化，改了会触发所有图表重渲染
    // （observed in vitepress-plugin-mermaid 2.0.17 Mermaid.vue:39）
    document.body.style.overflow = 'hidden'
    lastFocus = document.activeElement as HTMLElement
    ;(el.querySelector('.mermaid-lightbox__close') as HTMLElement).focus()
    // eslint-disable-next-line no-console
    const rect = clone.getBoundingClientRect()
    console.log(
      `[mermaid-lightbox] opening overlay, clone size: ${Math.round(rect.width)}×${Math.round(rect.height)}`,
    )
  }

  function close() {
    if (!overlay) return
    overlay.classList.remove('is-open')
    document.body.style.overflow = ''
    lastFocus?.focus?.()
  }

  // ---------- 事件委托：document 上一次绑，捕获所有 .mermaid 点击 ----------
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    const div = target.closest('div.mermaid') as HTMLDivElement | null
    if (!div) return
    // eslint-disable-next-line no-console
    console.log('[mermaid-lightbox] click caught on .mermaid, retrying svg lookup')

    // SVG 还没渲染好（mermaid 是异步的）→ 重试 10 次 × 100ms
    const tryOpen = (retries: number) => {
      const svg = div.querySelector('svg')
      if (svg) {
        // eslint-disable-next-line no-console
        console.log(`[mermaid-lightbox] svg found on retry #${retries}, opening`)
        open(svg)
      } else if (retries < 10) {
        setTimeout(() => tryOpen(retries + 1), 100)
      } else {
        // eslint-disable-next-line no-console
        console.warn('[mermaid-lightbox] SVG 没渲染出来（1s 超时）')
      }
    }
    tryOpen(0)
  })

  // eslint-disable-next-line no-console
  console.log('[mermaid-lightbox] click delegate registered on document')
}
