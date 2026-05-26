<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { navItems, resumeFile } from '@/constants'
import { useThemeStore } from '@/stores/theme'
import { useRoute, useRouter } from 'vue-router'

const themeStore = useThemeStore()
const route = useRoute()
const router = useRouter()

const activeHref = ref('/home')
const isMenuOpen = ref(false)
let skipRouteScrollPath: string | null = null
let scrollCheckTimer: ReturnType<typeof setInterval> | null = null

const sectionIds = navItems.map((item) => item.href.slice(1))
const hrefBySectionId = new Map(navItems.map((item) => [item.href.slice(1), item.href]))
const routeSectionIds: Record<string, string> = {
  '/home': 'home',
  '/about': 'about',
  '/skills': 'skills',
  '/projects': 'projects',
  '/contact': 'contact',
}

const isHomeViewRoute = () => route.path in routeSectionIds

const getActiveHrefFromRoute = (path: string) => {
  if (path.startsWith('/projects/')) return '/projects'
  if (path.startsWith('/blog')) return '/blog'
  if (path === '/') return '/home'
  if (path in routeSectionIds) return path
  return path
}

const getHeaderHeight = () => {
  return document.querySelector('.app-header')?.getBoundingClientRect().height ?? 68
}

const findActiveSectionId = () => {
  if (window.scrollY <= 8) return 'home'

  const markerY = window.scrollY + getHeaderHeight() + Math.min(window.innerHeight * 0.35, 280)
  let activeSectionId = 'home'

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue

    const top = el.getBoundingClientRect().top + window.scrollY
    if (top <= markerY) {
      activeSectionId = id
    } else {
      break
    }
  }

  const bottomDistance =
    document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
  if (bottomDistance <= 4) {
    return sectionIds[sectionIds.length - 1]
  }

  return activeSectionId
}

const syncRouteFromScroll = (sectionId: string) => {
  const href = hrefBySectionId.get(sectionId)
  if (!href || href === '/blog' || route.path === href || window.location.pathname === href) return

  skipRouteScrollPath = href
  void router.replace(href).catch(() => {
    if (skipRouteScrollPath === href) {
      skipRouteScrollPath = null
    }
  })
}

const updateActiveFromScroll = () => {
  if (!isHomeViewRoute()) return

  const sectionId = findActiveSectionId()
  const href = hrefBySectionId.get(sectionId)
  if (!href) return

  activeHref.value = href
  syncRouteFromScroll(sectionId)
}

const startScrollTracking = () => {
  window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
  window.addEventListener('resize', updateActiveFromScroll)
  scrollCheckTimer ??= setInterval(updateActiveFromScroll, 200)
  updateActiveFromScroll()
}

const stopScrollTracking = () => {
  window.removeEventListener('scroll', updateActiveFromScroll)
  window.removeEventListener('resize', updateActiveFromScroll)
  if (scrollCheckTimer) {
    clearInterval(scrollCheckTimer)
    scrollCheckTimer = null
  }
}

const scrollToSection = (sectionId: string, behavior: ScrollBehavior = 'smooth') => {
  const el = document.getElementById(sectionId)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - getHeaderHeight()
    window.scrollTo({ top: Math.max(0, top), behavior })
  }
}

const scrollToRouteSection = (path: string, behavior: ScrollBehavior = 'smooth') => {
  const sectionId = routeSectionIds[path]
  if (!sectionId) return

  void nextTick(() => {
    requestAnimationFrame(() => {
      scrollToSection(sectionId, behavior)
    })
  })
}

onMounted(() => {
  activeHref.value = getActiveHrefFromRoute(route.path)
  if (isHomeViewRoute()) {
    startScrollTracking()
    scrollToRouteSection(route.path, 'auto')
  }
})

onBeforeUnmount(() => {
  stopScrollTracking()
})

watch(
  () => route.path,
  (path) => {
    activeHref.value = getActiveHrefFromRoute(path)
    const shouldSkipScroll = skipRouteScrollPath === path
    if (shouldSkipScroll) {
      skipRouteScrollPath = null
    }

    if (isHomeViewRoute()) {
      startScrollTracking()
      if (!shouldSkipScroll) {
        scrollToRouteSection(path)
      }
    } else {
      stopScrollTracking()
    }
  },
)

const onNavClick = (href: string) => {
  themeStore.closeThemePanel()
  isMenuOpen.value = false
  activeHref.value = href

  if (href === '/blog') {
    if (isHomeViewRoute()) {
      scrollToSection('blog')
    } else {
      skipRouteScrollPath = '/home'
      void router.push('/home').then(() => {
        nextTick(() => scrollToSection('blog'))
      })
    }
    return
  }

  if (route.path === href) {
    scrollToSection(href.slice(1))
    return
  }

  void router.push(href)
}

const toggleMenu = () => {
  themeStore.closeThemePanel()
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="app-header">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="header-inner">
      <RouterLink class="brand" to="/home" aria-label="回到首页">shiguijun</RouterLink>

      <nav class="nav-links" aria-label="主导航">
        <a
          v-for="item in navItems"
          :key="item.href"
          :class="{ 'is-active': activeHref === item.href }"
          :aria-current="activeHref === item.href ? 'page' : undefined"
          :href="item.href"
          @click.prevent="onNavClick(item.href)"
        >
          {{ item.label }}
        </a>
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
        <a class="resume-link" :href="resumeFile.path" :download="resumeFile.downloadName"
          >下载简历</a
        >
      </div>

      <button
        class="hamburger-btn"
        :aria-label="isMenuOpen ? '关闭菜单' : '打开菜单'"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span v-if="!isMenuOpen" class="hamburger-icon">
          <span></span><span></span><span></span>
        </span>
        <svg
          v-else
          class="close-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
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
    @navigate="onNavClick"
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
      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
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

  .brand {
    font-size: 20px;
  }
  .nav-links {
    display: none;
  }
  .header-actions {
    margin-left: auto;
  }
  .hamburger-btn {
    display: flex;
  }

  .resume-link {
    min-height: 36px;
    padding: 0 14px;
  }
}
</style>
