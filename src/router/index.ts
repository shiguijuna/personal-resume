import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const homeSectionRoutes = [
  { path: '/home', sectionId: 'home' },
  { path: '/about', sectionId: 'about' },
  { path: '/skills', sectionId: 'skills' },
  { path: '/projects', sectionId: 'projects' },
  { path: '/contact', sectionId: 'contact' },
] as const

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  ...homeSectionRoutes.map(({ path, sectionId }) => ({
    path,
    name: sectionId,
    component: () => import('@/views/HomeView.vue'),
    meta: { sectionId },
  })),
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogListView.vue'),
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('@/views/BlogDetailView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const legacyHashRoutes: Record<string, string> = {
  '#home': '/home',
  '#about': '/about',
  '#skills': '/skills',
  '#projects': '/projects',
  '#blog': '/blog',
  '#contact': '/contact',
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (typeof to.meta.sectionId === 'string') {
      return false
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 92,
      }
    }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if ((to.path === '/' || to.path === '/home') && to.hash) {
    const path = legacyHashRoutes[to.hash]
    if (path) {
      return { path, replace: true }
    }
  }
})

router.afterEach(() => {
  import('@/composables/useScrollAnimation').then(({ refreshScrollAnimation }) => {
    refreshScrollAnimation()
  })
})

export default router
