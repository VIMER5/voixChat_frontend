import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { type ChatInfo } from "@/app/model/userChatsModel";
import $api from "@/app/API/axios";
export const useChatsStore = defineStore("chatsStore", () => {
  const chats = ref<Map<string, ChatInfo>>(new Map<string, ChatInfo>());
  async function getMyChats() {
    const data = await $api.get("/user/chat/getMyChats");
    if (data) {
      for (const item of data.data.myChat) {
        chats.value.set(item.id, item);
      }
    }
  }
  return { chats, getMyChats };
});
