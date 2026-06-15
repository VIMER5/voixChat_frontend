import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { type ChatInfo, type Message } from "@/app/model/userChatsModel";
import $api from "@/app/API/axios";
import { AxiosError } from "axios";

interface errorPush {
  status: number;
  push: string;
}

export const useChatsStore = defineStore("chatsStore", () => {
  const chats = ref<Map<string, ChatInfo>>(new Map<string, ChatInfo>());
  async function getMyChats() {
    const data = await $api.get("/user/chat/getMyChats");
    if (data) {
      for (const item of data.data.myChat) {
        chats.value.set(item.id, normalizationChatInfo(item));
      }
    }
  }
  async function createGroupChat(name: string, members: number[], avatar?: string) {
    try {
      const response = await $api.post("/user/chat/createGroup", {
        name,
        members,
        avatar,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async function getChatInfo(idChat: string): Promise<ChatInfo | errorPush> {
    if (!chats.value.has(idChat)) {
      try {
        const { data } = await $api.get(`/user/chat/getChatById/${idChat}`);
        if (data) {
          chats.value.set(data.id, normalizationChatInfo(data));
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.status == 403 || e.status == 404)
            return {
              status: e.status,
              push: "/",
            };
        }
        console.log(e);
      }
    }
    return chats.value.get(idChat)!;
  }
  function normalizationChatInfo(data: ChatInfo): ChatInfo {
    return { ...data, _Messages: data._Messages ? data._Messages.reverse() : [] };
  }
  const chatById = computed(() => (id: string) => {
    return chats.value.get(id) || null;
  });

  async function addNewMessage(chatId: string, data: Message) {
    const chat = await getChatInfo(chatId);
    if (chat && "_Messages" in chat) chat._Messages?.push(data);
  }
  async function addOldMessage(chatId: string, data: Message[]) {
    const chat = await getChatInfo(chatId);
    if (chat && "_Messages" in chat) chat._Messages?.unshift(...data.reverse());
  }
  return { chats, getMyChats, createGroupChat, getChatInfo, chatById, addNewMessage, addOldMessage };
});
