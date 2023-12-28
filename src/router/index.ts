import { nextTick } from 'vue'
import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'
import { SessionStorage } from '@/store'
import dashboardRoutes from './dashboard'
import publicRoutes from './public'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    requiresAuth?: boolean
    visitorsOnly?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/dashboard',
      component: () => import('@/pages/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      },
      children: dashboardRoutes
    },
    {
      path: '/login',
      component: () => import('@/pages/Public.vue'),
      meta: {
        title: 'Page publique'
      },
      children: publicRoutes
    },
    {
      path: '/password/reset',
      redirect: { name: 'password-reset' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
      meta: {
        title: 'Page introuvable'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let store = new SessionStorage()

  if (from.name != null) store.previousRouteName = from.name
  store.previousRouteUrl = from.fullPath

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.loggedIn) {
      let loginLocation: RouteLocationRaw = { name: 'login' }
      if (to.name != null && typeof to.name !== 'symbol') {
        loginLocation.query = { to: to.name }
      }
      next(loginLocation)
      return
    }
  } else if (to.matched.some((record) => record.meta.visitorsOnly)) {
    if (store.loggedIn && to.query.service === undefined) {
      next({ name: 'dashboard' })
      return
    }
  }

  next()
})

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title + ' – Gallium+'
  })
})

export default router
