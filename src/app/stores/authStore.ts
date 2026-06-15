import { ref, computed } from "vue";
import { defineStore } from "pinia";
import $api from "@/app/API/axios";
import { type currentUserInfo } from "../model/userModel";

export const useAuthStore = defineStore("AuthStore", () => {
  const tokenAccess = ref(null);
  const user = ref<currentUserInfo | null>(null);

  async function validateToken() {
    let token = sessionStorage.getItem("access");
    if (!token) {
      const upTokens = await tokenUpdateByRefreshToken();
      if (!upTokens) return false;
    }
    try {
      const response = await $api.get("user");
      user.value = response.data;
      return true;
    } catch (err) {
      return false;
    }
  }

  async function tokenUpdateByRefreshToken() {
    try {
      const tokens = await $api.post("/auth/refresh");
      sessionStorage.setItem("access", tokens.data.access);
      return true;
    } catch (err) {
      return false;
    }
  }

  function logout() {
      sessionStorage.removeItem("access");
      user.value = null;
  }

  async function forgotPassword(email: string) {
    try {
      await $api.post("/auth/forgot-password", { email });
      return true;
    } catch (err) {
      return false;
    }
  }

  async function resetPassword(token: string, passwordNew: string) {
    try {
      await $api.post("/auth/reset-password", { token, password: passwordNew });
      return true;
    } catch (err) {
      return false;
    }
  }

  return { tokenAccess, user, validateToken, tokenUpdateByRefreshToken, logout, forgotPassword, resetPassword };
});
