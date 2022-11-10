import { createRouter, createWebHistory } from 'vue-router'
import { MyRouteRecordRaw } from './model'

export const routes: Array<MyRouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/page/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory('/backgroundManagement/'),
  routes
})

export default router
