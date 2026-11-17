import AuthView from '@/views/AuthView'
import ComponentsView from '@/views/ComponentsView'
import ConfirmView from '@/views/ConfirmView'
import HomeView from '@/views/HomeView'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Главная' },
    },
    {
      path: '/cmp',
      name: 'cmp',
      component: ComponentsView,
      meta: { title: '[DEV] Компоненты' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { title: 'Авторизация' },
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: ConfirmView,
      meta: { title: 'Подтверждение входа' },
    },
  ],
})

export default router
