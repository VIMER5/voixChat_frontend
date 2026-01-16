import { ref, computed } from "vue";
import { defineStore } from "pinia";
import $api from "@/app/API/axios";

export const useAuthStore = defineStore("AuthStore", () => {
  const tokenAccess = ref(null);

  async function validateToken() {
    let token = sessionStorage.getItem("access");
    if (!token) {
      const upTokens = await tokenUpdateByRefreshToken();
      if (!upTokens) return false;
    }
    token = sessionStorage.getItem("access");
    try {
      await $api.post("/auth/validate");
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
  return { tokenAccess, validateToken, tokenUpdateByRefreshToken };
});
