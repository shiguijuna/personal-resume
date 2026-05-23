// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxtjs/sitemap'],
  css: ['@/assets/styles/base.scss'],
  nitro: {
    preset: 'node-server',
  },
  image: {
    provider: 'ipx',
    format: ['webp'],
    screens: { sm: 640, md: 820, lg: 1120, xl: 1280 },
  },
  site: {
    url: process.env.NUXT_SITE_URL || 'https://shiguijuna.store',
    name: 'shiguijun | 前端开发工程师',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    discoverNestedPages: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'shiguijun 前端博客', href: '/api/rss.xml' },
      ],
      script: [
        {
          innerHTML: `(function(){var d=localStorage.getItem('theme-dark');if(d==='true')document.documentElement.classList.add('dark');else if(d==='false')document.documentElement.classList.add('light');var c=localStorage.getItem('theme-primary');if(c)document.documentElement.style.setProperty('--color-primary',c)})()`,
          type: 'text/javascript',
        },
      ],
    },
  },
})