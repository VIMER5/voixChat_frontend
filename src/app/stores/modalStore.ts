import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("ModalStore", () => {
  const isUserSettingsOpen = ref(false);

  function openUserSettings() {
    isUserSettingsOpen.value = true;
  }

  function closeUserSettings() {
    isUserSettingsOpen.value = false;
  }

  return { isUserSettingsOpen, openUserSettings, closeUserSettings };
});
