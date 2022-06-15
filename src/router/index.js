import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: () => import('../views/DashboardView.vue')
    // },
    // {
    //   path: '/forgot',
    //   name: 'forgot',
    //   component: () => import('../views/ForgotView.vue')
    // },
    // {
    //   path:'/activate',
    //   name: 'activate',
    //   component:() => import('../views/ActivateView.vue')
    // },
    // {
    //   path:'/update',
    //   name:'update',
    //   component:() => import('../views/UpdateView.vue')
    // }
  ]
})

export default router

// add a before each  function 
