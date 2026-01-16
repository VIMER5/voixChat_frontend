import { type RouteLocationNormalizedGeneric, type NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/app/stores/authStore";

async function guard(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  const isTokenValid = await authStore.validateToken();
  console.log(isTokenValid);
  if (!isTokenValid && to.fullPath.includes("/auth")) return next();
  if (!isTokenValid) return next({ name: "login" });
  if (isTokenValid && to.fullPath.includes("/auth")) return next({ name: "home" });
  if (!to.meta.requiresAuth) return next();
  next();
}

export { guard };
