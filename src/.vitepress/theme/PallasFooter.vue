<script setup lang="ts">
import { withBase } from 'vitepress'
import { PALLAS_FOOTER_COLUMNS, type PallasFooterLink } from './pallasFooterLinks'
import { qqAvatarUrl, qqGroupAvatarUrl } from './qqAvatarUrl'

function linkHref(href: string, external?: boolean) {
  if (external || href.startsWith('http')) return href
  return withBase(href.startsWith('/') ? href : `/${href}`)
}

function linkAvatarSrc(item: PallasFooterLink): string {
  if (item.avatar) return withBase(item.avatar)
  if (item.avatarSrc) return item.avatarSrc
  if (item.qqNk != null) {
    return item.qqGroup ? qqGroupAvatarUrl(item.qqNk) : qqAvatarUrl(item.qqNk)
  }
  return ''
}

function hideBrokenAvatar(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.visibility = 'hidden'
}
</script>

<template>
  <footer class="pallas-footer">
    <div class="pallas-footer__inner">
      <div
        v-for="column in PALLAS_FOOTER_COLUMNS"
        :key="column.title"
        class="pallas-footer__col"
      >
        <h3 class="pallas-footer__title">
          {{ column.title }}
        </h3>
        <ul class="pallas-footer__list">
          <li
            v-for="item in column.links"
            :key="item.href + item.label"
          >
            <a
              class="pallas-footer__link"
              :href="linkHref(item.href, item.external)"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
            >
              <img
                v-if="linkAvatarSrc(item)"
                class="pallas-footer__avatar"
                :src="linkAvatarSrc(item)"
                alt=""
                width="18"
                height="18"
                decoding="async"
                referrerpolicy="no-referrer"
                @error="hideBrokenAvatar"
              >
              {{ item.label }}
              <span
                v-if="item.external"
                class="pallas-footer__ext"
                aria-hidden="true"
              >↗</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <p class="pallas-footer__copy">
      © PallasBot
    </p>
  </footer>
</template>
