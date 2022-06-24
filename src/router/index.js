import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import store from "../store"

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
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.IsLoggedIn) {
      next({ name: "Home" });
    }
   else {
     next()
    }
  }
  else{
    next()
  } 
})

export default router