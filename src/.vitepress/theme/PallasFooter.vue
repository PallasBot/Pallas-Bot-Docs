<script setup lang="ts">
import { withBase } from 'vitepress'
import { PALLAS_FOOTER_COLUMNS } from './pallasFooterLinks'

function linkHref(href: string, external?: boolean) {
  if (external || href.startsWith('http')) return href
  return withBase(href.startsWith('/') ? href : `/${href}`)
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
