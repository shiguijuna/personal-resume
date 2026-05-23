<script setup lang="ts">
import { siteConfig } from '@/constants'

const { isSupported } = useScrollAnimation()

useSeoMeta({
  title: `${siteConfig.title}个人博客`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  referrer: 'no-referrer',
  ogTitle: siteConfig.title,
  ogDescription:
    '6年前端开发工程师，专注 Vue / Nuxt / 小程序 / 中后台系统。展示项目经历与技术实践。',
  ogImage: siteConfig.ogImage,
  ogUrl: siteConfig.domain,
  twitterCard: 'summary',
  twitterTitle: siteConfig.title,
  twitterDescription:
    '6年前端开发工程师，专注 Vue / Nuxt / 小程序 / 中后台系统。',
  twitterImage: siteConfig.ogImage,
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'shiguijun',
        url: siteConfig.domain,
        jobTitle: '前端开发工程师',
        description: siteConfig.description,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: '上海海洋大学',
        },
        knowsAbout: ['Vue', 'Nuxt', '小程序', '中后台系统', 'ECharts'],
      }),
    },
  ],
})

const {
  savedColor,
  isDark,
  showThemePanel,
  themeColors,
  applyTheme,
  toggleDark,
  closeThemePanel,
} = useTheme()
</script>

<template>
  <div class="app-shell">
    <AppHeader
      :show-theme-panel="showThemePanel"
      :theme-colors="themeColors"
      :current-theme="savedColor"
      :is-dark="isDark"
      @toggle-theme="showThemePanel = !showThemePanel"
      @select-color="applyTheme"
      @toggle-dark="toggleDark"
      @close-theme="closeThemePanel"
    />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
:root { background: var(--color-bg); }
html, body { background: var(--color-bg); color: var(--color-ink); }
</style>
