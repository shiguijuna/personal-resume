<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { navItems, resumeFile } from '@/constants'
import { useThemeStore } from '@/stores/theme'
import { useRoute } from 'vue-router'

const themeStore = useThemeStore()
const route = useRoute()

const scrollActiveHash = ref('#home')

const sectionIds = navItems.map(item => item.href.replace('/#', '#'))

let observer: IntersectionObserver | null = null

const startObserver = () => {
  stopObserver()
  const headerHeight = 68
  observer = new IntersectionObserver(
    (entries) => {
      const visible: { id: string; ratio: number }[] = []
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.push({ id: `#${entry.target.id}`, ratio: entry.intersectionRatio })
        }
      }
      if (visible.length === 0) return
      visible.sort((a, b) => b.ratio - a.ratio)
      scrollActiveHash.value = visible[0].id
    },
    { rootMargin: `-${headerHeight}px 0px -40% 0px`, threshold: [0, 0.25, 0.5, 0.75, 1] },
  )
  for (const id of sectionIds) {
    const el = document.querySelector(id)
    if (el) observer!.observe(el)
  }
}

const stopObserver = () => {
  observer?.disconnect()
  observer = null
}

onMounted(() => {
  if (route.path === '/') startObserver()
})

onBeforeUnmount(() => {
  stopObserver()
})

watch(() => route.path, (path) => {
  if (path === '/') {
    setTimeout(startObserver, 100)
  } else {
    stopObserver()
  }
})

const activeHref = computed(() => {
  if (route.path.startsWith('/projects')) return '/#projects'
  if (route.path.startsWith('/blog')) return '/#blog'
  if (route.path !== '/') return route.path
  return `/${scrollActiveHash.value}`
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
  themeStore.closeThemePanel()
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="app-header">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="header-inner">
      <RouterLink class="brand" to="/#home" aria-label="回到首页">shiguijun</RouterLink>

      <nav class="nav-links" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.href"
          :class="{ 'is-active': activeHref === item.href }"
          :aria-current="activeHref === item.href ? 'page' : undefined"
          :to="item.href"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <ThemeControl
          :show="themeStore.showThemePanel"
          :colors="themeStore.themeColors"
          :current="themeStore.savedColor"
          :is-dark="themeStore.isDark"
          @toggle="themeStore.showThemePanel = !themeStore.showThemePanel"
          @select="themeStore.applyTheme"
          @toggle-dark="themeStore.toggleDark"
        />
        <a class="resume-link" :href="resumeFile.path" :download="resumeFile.downloadName">下载简历</a>
      </div>

      <button
        class="hamburger-btn"
        @click="toggleMenu"
        aria-label="打开菜单"
        :aria-expanded="isMenuOpen"
      >
        <span v-if="!isMenuOpen" class="hamburger-icon">
          <span></span><span></span><span></span>
        </span>
        <svg v-else class="close-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>
  </header>

  <MobileDrawer
    :is-open="isMenuOpen"
    :active-href="activeHref"
    :current-theme="themeStore.savedColor"
    :is-dark="themeStore.isDark"
    @close="isMenuOpen = false"
    @select-color="themeStore.applyTheme"
    @toggle-dark="themeStore.toggleDark"
  />
</template>

<style lang="scss" scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 50;
  padding: 12px 20px;
  color: #fff;
  font-weight: 800;
  background: var(--color-primary);
  border-radius: 8px;
  transition: top 0.2s;

  &:focus {
    top: 12px;
  }
}

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
  justify-content: space-between;
  gap: 28px;
}

.brand {
  color: var(--color-ink);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
  flex: 1;

  a {
    position: relative;
    color: var(--color-ink);
    font-size: 15px;
    font-weight: 600;
    line-height: 68px;

    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      content: '';
      border-radius: 3px 3px 0 0;
      background: var(--color-primary);
      opacity: 0;
      transform: scaleX(0.45);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    &:hover,
    &:focus-visible,
    &.is-active {
      color: var(--color-primary);

      &::after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }

  &:hover a.is-active:not(:hover),
  &:focus-within a.is-active:not(:focus-visible) {
    color: var(--color-ink);

    &::after {
      opacity: 0;
      transform: scaleX(0.45);
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.resume-link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  border-radius: 8px;
  color: var(--color-primary);
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);
}

.hamburger-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-ink);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 35;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 22px;
  height: 22px;
}

.hamburger-icon span {
  display: block;
  width: 100%;
  height: 2.5px;
  background: currentColor;
  border-radius: 2px;
}

.close-icon {
  display: block;
}

@media (max-width: 820px) {
  .header-inner {
    width: min(100% - 32px, var(--container));
    height: auto;
    min-height: 64px;
    flex-wrap: wrap;
    gap: 10px 18px;
    padding: 12px 0;
  }

  .brand { font-size: 20px; }
  .nav-links { display: none; }
  .header-actions { margin-left: auto; }
  .hamburger-btn { display: flex; }

  .resume-link {
    min-height: 36px;
    padding: 0 14px;
  }
}
</style>
