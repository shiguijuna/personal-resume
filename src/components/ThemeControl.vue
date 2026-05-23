<script setup lang="ts">
defineProps<{
  show: boolean
  colors: { name: string; hex: string }[]
  current: string
  isDark: boolean
}>()

const emit = defineEmits<{
  toggle: []
  select: [color: string]
  toggleDark: []
}>()
</script>

<template>
  <div class="theme-wrapper">
    <button
      class="theme-btn"
      @click="emit('toggle')"
      aria-label="自定义主题"
      title="主题设置"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    </button>
    <Transition name="theme-fade">
      <div v-if="show" class="theme-panel">
        <div class="theme-section dark-section">
          <span class="theme-label">{{ isDark ? '暗色模式' : '亮色模式' }}</span>
          <button
            class="dark-switch"
            :class="{ active: isDark }"
            @click="emit('toggleDark')"
            :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
            role="switch"
            :aria-checked="isDark"
          >
            <svg v-if="!isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
        <div class="theme-divider" />
        <div class="theme-section">
          <span class="theme-label">主题色</span>
          <div class="color-swatches">
            <button
              v-for="color in colors"
              :key="color.hex"
              class="theme-swatch"
              :class="{ active: current === color.hex }"
              :style="{ background: color.hex }"
              :title="color.name"
              @click="emit('select', color.hex)"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.theme-wrapper { position: relative; }

.theme-btn {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: var(--color-muted);
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}

.theme-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  width: 250px;
  padding: 14px 14px;
  background: var(--color-panel);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  box-shadow: var(--shadow-soft);
}

.theme-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.theme-label {
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.color-swatches {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.theme-swatch {
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.2s;

  &:hover { transform: scale(1.2); }

  &.active {
    border-color: var(--color-ink);
    transform: scale(1.2);
  }
}

.theme-divider {
  height: 1px;
  margin: 10px 0;
  background: var(--color-line);
}

.dark-section {
  .dark-switch {
    display: inline-flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    color: var(--color-muted);
    background: color-mix(in srgb, var(--color-ink) 6%, transparent);
    border: 1px solid var(--color-line);
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.2s, background 0.2s, border-color 0.2s;

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
}

.theme-fade-enter-active,
.theme-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.theme-fade-enter-from,
.theme-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 820px) {
  .theme-btn { width: 36px; height: 36px; }
}
</style>
