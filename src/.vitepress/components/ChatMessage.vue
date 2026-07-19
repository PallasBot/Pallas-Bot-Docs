<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    nickname: string
    tag?: string
    type?: 'tip' | 'danger' | 'info' | 'warning'
    color?: string
  }>(),
  {
    tag: undefined,
    type: undefined,
    color: undefined,
  },
)

const preset: Record<
  string,
  { tag: string; type: 'tip' | 'danger' | 'info' | 'warning'; color: string }
> = {
  群友: { tag: '用户', type: 'danger', color: '#cc0066' },
  牛牛: { tag: '机器人', type: 'tip', color: '#7c3aed' },
}

const resolved = computed(() => preset[props.nickname] ?? {
  tag: '用户',
  type: 'info' as const,
  color: '#1e90ff',
})

const tag = computed(() => props.tag ?? resolved.value.tag)
const type = computed(() => props.type ?? resolved.value.type)
const backgroundColor = computed(() => props.color ?? resolved.value.color)
</script>

<template>
  <div class="chat-message">
    <div class="avatar" :style="{ backgroundColor }">
      {{ nickname.slice(0, 1) }}
    </div>
    <div class="nickname">
      {{ nickname }}
      <Badge :type="type" :text="tag" />
    </div>
    <div class="message-box">
      <slot>&nbsp;</slot>
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  position: relative;
  margin: 1rem 0;
}

.avatar {
  width: 2.8rem;
  height: 2.8rem;
  position: absolute;
  border-radius: 100%;
  text-align: center;
  line-height: 2.8rem;
  font-size: 1.2rem;
  color: #fff;
  font-weight: 700;
  user-select: none;
}

.nickname {
  user-select: none;
  margin: 0 0 0.4rem 4.2rem;
  font-weight: 700;
  font-size: 0.9rem;
}

.message-box {
  position: relative;
  margin-left: 4.2rem;
  width: fit-content;
  max-width: min(100%, 36rem);
  border-radius: 0.5rem;
  padding: 0.5rem 0.7rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  word-break: break-word;
  line-height: 1.6;
}

.message-box::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 0;
  width: 12px;
  height: 12px;
  border: 0 solid transparent;
  border-bottom-width: 8px;
  border-bottom-color: var(--vp-c-bg);
  border-radius: 0 0 0 32px;
}

.message-box :deep(p) {
  margin: 0 !important;
}
</style>
