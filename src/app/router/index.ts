import { createRouter, createWebHistory } from "vue-router";
import authLayout from "@layout/authLayout.vue";
import mainLayout from "@layout/mainLayout.vue";
import personalChat from "../../views/personalChat/personalChat.vue";
import { guard } from "./guards";

import helloView from "@/views/helloView.vue";
import login from "@/views/auth/login.vue";
import passwordReset from "@/views/auth/passwordReset.vue";
import register from "@/views/auth/register.vue";
import verifyEmail from "@/views/auth/verifyEmail.vue";

import friendsList from "@/views/friends/ui/friendsList.vue";
import friends from "@/views/friends/friends.vue";
import friendRequests from "@/views/friends/ui/friendRequests.vue";

import headerPersonalChat from "@/views/personalChat/components/headerPersonalChat.vue";
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
        {
          path: "password_reset/:token",
          name: "confirm_password_reset",
          component: () => import("@/views/auth/confirmPasswordReset.vue"),
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
          path: "/friends",
          component: friends,
          children: [
            {
              path: "",
              name: "friends",
              component: friendsList,
            },
            {
              path: "requests",
              name: "requests",
              component: friendRequests,
            },
          ],
        },
        {
          path: "chat/:idChat",
          name: "personalChat",
          components: {
            default: personalChat,
            header: headerPersonalChat,
          },
        },
        {
          path: "uikit",
          name: "uikit",
          component: () => import("@views/uiKit.vue"),
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("@views/AdminView.vue"),
          meta: { requiresAdmin: true }
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
      path: "/:pathMatch(.*)",
      name: "about",
      component: () => import("@views/AboutView.vue"),
    },
  ],
});
router.beforeEach(guard);
export default router;
