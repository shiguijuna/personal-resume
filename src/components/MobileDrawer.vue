<script setup lang="ts">
import { navItems, resumeFile, themeColors } from '@/constants'
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  isOpen: boolean
  activeHref: string
  currentTheme: string
  isDark: boolean
}>()

const emit = defineEmits<{
  close: []
  selectColor: [color: string]
  toggleDark: []
  navigate: [href: string]
}>()

let savedScrollY = 0

const lockBody = () => {
  savedScrollY = window.scrollY
  document.documentElement.style.overflow = 'hidden'
}

const unlockBody = () => {
  document.documentElement.style.overflow = ''
  window.scrollTo(0, savedScrollY)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const onNavigate = (href: string) => {
  emit('navigate', href)
  emit('close')
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) lockBody()
    else unlockBody()
  },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (props.isOpen) unlockBody()
})
</script>

<template>
  <Transition name="drawer-fade">
    <div v-if="isOpen" class="mobile-overlay" aria-hidden="true" @click="emit('close')" />
  </Transition>
  <Transition name="drawer-slide">
    <aside
      v-if="isOpen"
      class="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="移动端导航菜单"
    >
      <div class="drawer-header">
        <RouterLink class="drawer-brand" to="/#home" @click="emit('close')">shiguijun</RouterLink>
        <button class="drawer-close" @click="emit('close')" aria-label="关闭菜单">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <nav class="drawer-nav">
        <button
          v-for="item in navItems"
          :key="item.href"
          :class="{ 'is-active': activeHref === item.href }"
          :aria-current="activeHref === item.href ? 'page' : undefined"
          @click="onNavigate(item.href)"
        >
          {{ item.label }}
        </button>
      </nav>
      <div class="drawer-actions">
        <div class="drawer-dark">
          <span class="drawer-label">{{ isDark ? '暗色模式' : '亮色模式' }}</span>
          <button class="drawer-dark-btn" :class="{ active: isDark }" @click="emit('toggleDark')">
            <svg
              v-if="isDark"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
              v-else
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>
        </div>
        <div class="drawer-theme">
          <span class="drawer-label">主题色</span>
          <div class="drawer-swatches">
            <button
              v-for="color in themeColors"
              :key="color.hex"
              class="theme-swatch"
              :class="{ active: currentTheme === color.hex }"
              :style="{ background: color.hex }"
              :title="color.name"
              @click="emit('selectColor', color.hex)"
            />
          </div>
        </div>
        <a
          class="drawer-resume-link"
          :href="resumeFile.path"
          :download="resumeFile.downloadName"
          @click="emit('close')"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          下载简历
        </a>
      </div>
    </aside>
  </Transition>
</template>

<style lang="scss" scoped>
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: none;
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.28s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 35;
  width: min(340px, 85vw);
  background: var(--color-panel);
  box-shadow: -8px 0 28px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 14px;
  border-bottom: 1px solid var(--color-line);
}

.drawer-brand {
  color: var(--color-ink);
  font-size: 20px;
  font-weight: 800;
}

.drawer-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  color: var(--color-ink);
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: color-mix(in srgb, var(--color-ink) 8%, transparent);
  }
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  flex: 1;

  a {
    display: flex;
    align-items: center;
    padding: 14px 24px;
    color: var(--color-ink);
    font-size: 16px;
    font-weight: 600;
    transition:
      color 0.2s,
      background 0.2s;

    &:hover {
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 6%, transparent);
    }

    &.is-active {
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 8%, transparent);
      border-right: 3px solid var(--color-primary);
    }
  }
}

.drawer-actions {
  padding: 16px 24px 24px;
  border-top: 1px solid var(--color-line);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drawer-dark {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-dark-btn {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  color: var(--color-muted);
  background: color-mix(in srgb, var(--color-ink) 6%, transparent);
  border: 1px solid var(--color-line);
  border-radius: 8px;
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s,
    border-color 0.2s;

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  &.active {
    color: #f0c930;
    border-color: #f0c930;
    background: color-mix(in srgb, #f0c930 12%, transparent);
  }
}

.drawer-theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);
}

.drawer-swatches {
  display: flex;
  gap: 8px;

  .theme-swatch {
    width: 26px;
    height: 26px;
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    transition:
      transform 0.15s,
      border-color 0.2s;

    &:hover {
      transform: scale(1.15);
    }

    &.active {
      border-color: var(--color-ink);
      transform: scale(1.15);
    }
  }
}

.drawer-resume-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 42px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);
  border-radius: 8px;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: color-mix(in srgb, var(--color-primary) 6%, transparent);
    border-color: var(--color-primary);
  }
}
</style>
