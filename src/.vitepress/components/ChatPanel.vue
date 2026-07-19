<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="panel-view" :class="{ mini: !title }">
    <div v-if="title" class="controls">
      <div class="circle red" />
      <div class="circle yellow" />
      <div class="circle green" />
      <div class="title">
        <span class="title-text">{{ title }}</span>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel-view {
  position: relative;
  border-radius: 6px;
  margin: 1rem 0;
  overflow: auto hidden;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.controls {
  position: absolute;
  top: 0.8rem;
  width: 100%;
}

.circle {
  position: absolute;
  top: 2px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
}

.circle.red {
  left: 17px;
  background-color: #ff5f56;
}

.circle.yellow {
  left: 36px;
  background-color: #ffbd2e;
}

.circle.green {
  left: 55px;
  background-color: #27c93f;
}

.title {
  text-align: center;
  width: 100%;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1rem;
  color: var(--vp-c-text-1);
}

.content {
  padding: 0.2rem 1.2rem;
}

.panel-view:not(.mini) .content {
  padding-top: 2rem;
}
</style>
