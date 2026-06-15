import { type RouteLocationNormalizedGeneric, type NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/app/stores/authStore";

async function guard(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();
  const isTokenValid = await authStore.validateToken();
  
  if (!isTokenValid && to.meta.requiresAuth !== false && !to.fullPath.includes("/auth")) {
      return next({ name: "login" });
  }

  if (isTokenValid && to.fullPath.includes("/auth")) {
      return next({ name: "hello" });
  }

  if (isTokenValid && authStore.user?.isBanned) {
      authStore.logout();
      return next({ name: "login" });
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
      return next({ name: "hello" });
  }

  next();
}

export { guard };
