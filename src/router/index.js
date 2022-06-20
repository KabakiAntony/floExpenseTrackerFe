// import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHashHistory(),
//   // history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: HomeView
//     },
//     // {
//     //   path: '/dashboard',
//     //   name: 'dashboard',
//     //   component: () => import('../views/DashboardView.vue')
//     // },
//     // {
//     //   path: '/forgot',
//     //   name: 'forgot',
//     //   component: () => import('../views/ForgotView.vue')
//     // },
//     // {
//     //   path:'/activate',
//     //   name: 'activate',
//     //   component:() => import('../views/ActivateView.vue')
//     // },
//     // {
//     //   path:'/update',
//     //   name:'update',
//     //   component:() => import('../views/UpdateView.vue')
//     // }
//   ]
// })

// export default router

// add a before each  function 
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
// import store from "../store"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    props: true,
  },
  // {
  //   path: "/new-password",
  //   name: "NewPassword",
  //   component: () => import("../views/NewPassword.vue"),
  //   props: (route) => ({ query: route.query.tkn }),
  // },
  // {
  //   path: "/forgot",
  //   name: "Forgot",
  //   component: () => import("../views/Forgot.vue"),
  //   props: true,
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
    // meta: { requiresAuth: true },
  },
  // {
  //   path: "/activate",
  //   name: "Activate",
  //   component: () => import("../views/Activate.vue"),
  //   props: (route) => ({ query: route.query.tkn }),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!store.getters.IsLoggedIn) {
//       next({ name: "Index" });
//     }
//    else {
//      next()
//     }
//   }
//   else{
//     next()
//   } 
// })

export default router