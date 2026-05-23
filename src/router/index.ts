import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogListView.vue'),
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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
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

router.afterEach(() => {
  import('@/composables/useScrollAnimation').then(({ refreshScrollAnimation }) => {
    refreshScrollAnimation()
  })
})

export default router
