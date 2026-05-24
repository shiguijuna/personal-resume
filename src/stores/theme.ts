import { defineStore } from 'pinia'
import { ref } from 'vue'
import { themeColors } from '@/constants'

export const useThemeStore = defineStore('theme', () => {
  const savedColor = ref('#1769e8')
  const isDark = ref(false)
  const showThemePanel = ref(false)

  const getPreferredDark = () =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false

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

  const applyDarkClass = (dark: boolean) => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }

  const closeThemePanel = () => {
    showThemePanel.value = false
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
    withTransition(() => applyDarkClass(isDark.value))
    localStorage.setItem('theme-dark', String(isDark.value))
  }

  const initTheme = () => {
    const stored = localStorage.getItem('theme-primary')
    if (stored) applyTheme(stored)

    const storedDark = localStorage.getItem('theme-dark')
    isDark.value = storedDark === null ? getPreferredDark() : storedDark === 'true'
    applyDarkClass(isDark.value)
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
