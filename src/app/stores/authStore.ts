import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", () => {
  const tokenAccess = ref(null);

  return { tokenAccess };
});
