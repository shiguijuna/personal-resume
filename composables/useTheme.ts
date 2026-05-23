import { ref, onMounted, onBeforeUnmount } from 'vue'
import { themeColors } from '@/constants'

export function useTheme() {
  const savedColor = ref('#1769e8')
  const isDark = ref(false)
  const showThemePanel = ref(false)

  const withTransition = (fn: () => void) => {
    if (!import.meta.client) { fn(); return }
    document.documentElement.classList.add('theme-transition')
    fn()
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 350)
  }

  const applyTheme = (color: string) => {
    savedColor.value = color
    if (import.meta.client) {
      localStorage.setItem('theme-primary', color)
      withTransition(() => {
        document.documentElement.style.setProperty('--color-primary', color)
      })
    }
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      withTransition(() => {
        if (isDark.value) {
          document.documentElement.classList.add('dark')
          document.documentElement.classList.remove('light')
        } else {
          document.documentElement.classList.remove('dark')
          document.documentElement.classList.add('light')
        }
      })
      localStorage.setItem('theme-dark', String(isDark.value))
    }
  }

  const closeThemePanel = () => {
    showThemePanel.value = false
  }

  const onGlobalClick = (e: MouseEvent) => {
    if (!showThemePanel.value) return
    const target = e.target as HTMLElement
    if (!target.closest('.theme-wrapper')) {
      showThemePanel.value = false
    }
  }

  const onGlobalScroll = () => {
    if (showThemePanel.value) {
      showThemePanel.value = false
    }
  }

  onMounted(() => {
    const stored = localStorage.getItem('theme-primary')
    if (stored) applyTheme(stored)
    const storedDark = localStorage.getItem('theme-dark')
    if (storedDark === 'true') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else if (storedDark === 'false') {
      document.documentElement.classList.add('light')
    }

    if (import.meta.client) {
      document.addEventListener('click', onGlobalClick, true)
      window.addEventListener('scroll', onGlobalScroll, true)
      window.addEventListener('touchmove', onGlobalScroll, true)
      window.addEventListener('wheel', onGlobalScroll, true)
    }
  })

  onBeforeUnmount(() => {
    if (import.meta.client) {
      document.removeEventListener('click', onGlobalClick, true)
      window.removeEventListener('scroll', onGlobalScroll, true)
      window.removeEventListener('touchmove', onGlobalScroll, true)
      window.removeEventListener('wheel', onGlobalScroll, true)
    }
  })

  return {
    savedColor,
    isDark,
    showThemePanel,
    themeColors,
    applyTheme,
    toggleDark,
    closeThemePanel,
  }
}
