<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useHead } from '@unhead/vue'
import { siteConfig } from '@/constants'

useHead({
  title: `${siteConfig.title}个人博客`,
  meta: [
    { name: 'description', content: siteConfig.description },
    { name: 'keywords', content: siteConfig.keywords },
    { property: 'og:title', content: siteConfig.title },
    { property: 'og:description', content: '6年前端开发工程师，专注 Vue / Nuxt / 小程序 / 中后台系统。展示项目经历与技术实践。' },
    { property: 'og:image', content: siteConfig.ogImage },
    { property: 'og:url', content: siteConfig.domain },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: siteConfig.title },
    { name: 'twitter:description', content: '6年前端开发工程师，专注 Vue / Nuxt / 小程序 / 中后台系统。' },
    { name: 'twitter:image', content: siteConfig.ogImage },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
})
</script>

<template>
  <DefaultLayout />
</template>
