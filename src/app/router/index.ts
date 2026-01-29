import { createRouter, createWebHistory } from "vue-router";
import authLayout from "@layout/authLayout.vue";
import mainLayout from "@layout/mainLayout.vue";
import { guard } from "./guards";

import helloView from "@/views/helloView.vue";
import login from "@/views/auth/login.vue";
import passwordReset from "@/views/auth/passwordReset.vue";
import register from "@/views/auth/register.vue";
import verifyEmail from "@/views/auth/verifyEmail.vue";
import friends from "@/views/friends.vue";
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
      component: mainLayout,
      children: [
        {
          path: "",
          name: "hello",
          component: helloView,
        },
        {
          path: "friends",
          name: "friends",
          component: friends,
        },
        {
          path: "uikit",
          name: "uikit",
          component: () => import("@views/uiKit.vue"),
        },
      ],
    },
    {
      path: "/VerifyEmail/:token",
      meta: { requiresAuth: false },
      component: authLayout,
      children: [
        {
          path: "",
          name: "VerifyEmail",
          component: verifyEmail,
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
router.beforeEach(guard);
export default router;
