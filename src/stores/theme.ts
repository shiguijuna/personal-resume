import { defineStore } from 'pinia'
import { ref } from 'vue'
import { themeColors } from '@/constants'

export const useThemeStore = defineStore('theme', () => {
  const savedColor = ref('#1769e8')
  const isDark = ref(false)
  const showThemePanel = ref(false)

  const withTransition = (fn: () => void) => {
    document.documentElement.classList.add('theme-transition')
    fn()
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 350)
  }

  const applyTheme = (color: string) => {
    savedColor.value = color
    localStorage.setItem('theme-primary', color)
    withTransition(() => {
      document.documentElement.style.setProperty('--color-primary', color)
    })
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
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

  const closeThemePanel = () => {
    showThemePanel.value = false
  }

  const initTheme = () => {
    const stored = localStorage.getItem('theme-primary')
    if (stored) applyTheme(stored)
    const storedDark = localStorage.getItem('theme-dark')
    if (storedDark === 'true') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else if (storedDark === 'false') {
      document.documentElement.classList.add('light')
    }
  }

  return {
    savedColor,
    isDark,
    showThemePanel,
    themeColors,
    applyTheme,
    toggleDark,
    closeThemePanel,
    initTheme,
  }
})
