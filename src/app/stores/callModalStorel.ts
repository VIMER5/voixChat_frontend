import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallModalStore = defineStore("CallModal", () => {
  const modals = ref<{ id: string; props: any }[]>([]);

  function openModal(props: any = {}) {
    const id = Math.random().toString(36);
    modals.value.push({ id, props });
    return id;
  }
  function closeModal(id: string) {
    modals.value = modals.value.filter((m) => m.id !== id);
  }
  return { modals, openModal, closeModal };
});
