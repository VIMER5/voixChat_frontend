import { createRouter, createWebHistory } from "vue-router";
import authLayout from "@layout/authLayout.vue";

import HomeView from "@views/HomeView.vue";
import login from "@/views/auth/login.vue";
import passwordReset from "@/views/auth/passwordReset.vue";
import register from "@/views/auth/register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      component: authLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "login",
          component: login,
        },
        {
          path: "register",
          name: "register",
          component: register,
        },
        {
          path: "password_reset",
          name: "password_reset",
          component: passwordReset,
        },
      ],
    },
    {
      path: "/",
      meta: { requiresAuth: true },
      component: HomeView,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@views/AboutView.vue"),
    },
  ],
});

export default router;
