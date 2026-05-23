<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useThemeStore } from '@/stores/theme'

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
    <header class="app-header">
      <div class="header-inner">
        <RouterLink class="brand" to="/#home">shiguijun</RouterLink>
        <nav class="nav-links">
          <RouterLink to="/#home">首页</RouterLink>
          <RouterLink to="/#about">关于我</RouterLink>
          <RouterLink to="/#skills">技术栈</RouterLink>
          <RouterLink to="/#projects">项目经历</RouterLink>
          <RouterLink to="/#blog">博客</RouterLink>
          <RouterLink to="/#contact">联系</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--color-panel) 92%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 82%, transparent);
  backdrop-filter: blur(18px);
}

.header-inner {
  width: min(100% - 48px, var(--container));
  height: 68px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 28px;
}

.brand {
  color: var(--color-ink);
  font-size: 22px;
  font-weight: 800;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 34px;
  flex: 1;

  a {
    color: var(--color-ink);
    font-size: 15px;
    font-weight: 600;

    &.router-link-active {
      color: var(--color-primary);
    }
  }
}
</style>
