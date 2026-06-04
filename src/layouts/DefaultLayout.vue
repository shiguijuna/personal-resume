<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { useThemeStore } from '@/stores/theme'
import { onMounted, onBeforeUnmount } from 'vue'

const themeStore = useThemeStore()

const onGlobalClick = (e: MouseEvent) => {
  if (!themeStore.showThemePanel) return
  const target = e.target as HTMLElement
  if (!target.closest('.theme-wrapper')) {
    themeStore.closeThemePanel()
  }
}

const onGlobalScroll = () => {
  if (themeStore.showThemePanel) {
    themeStore.closeThemePanel()
  }
}

onMounted(() => {
  themeStore.initTheme()
  document.addEventListener('click', onGlobalClick, true)
  window.addEventListener('scroll', onGlobalScroll, true)
  window.addEventListener('touchmove', onGlobalScroll, true)
  window.addEventListener('wheel', onGlobalScroll, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onGlobalClick, true)
  window.removeEventListener('scroll', onGlobalScroll, true)
  window.removeEventListener('touchmove', onGlobalScroll, true)
  window.removeEventListener('wheel', onGlobalScroll, true)
})
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style lang="scss">
:root {
  background: var(--color-bg);
}
html,
body {
  background: var(--color-bg);
  color: var(--color-ink);
}
</style>
