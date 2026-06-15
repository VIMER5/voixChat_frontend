import { defineStore } from "pinia";
import { ref } from "vue";
import AdminService from "../service/AdminService";

export const useAdminStore = defineStore("Admin", () => {
  const users = ref<any[]>([]);
  const chats = ref<any[]>([]);

  async function fetchUsers() {
    const response = await AdminService.getAllUsers();
    users.value = response.data;
  }

  async function fetchChats() {
    const response = await AdminService.getAllChats();
    chats.value = response.data;
  }

  async function banUser(userId: number, isBanned: boolean) {
    await AdminService.banUser(userId, isBanned);
    await fetchUsers();
  }

  async function clearHistory(chatId: string) {
    await AdminService.clearChatHistory(chatId);
  }

  return { users, chats, fetchUsers, fetchChats, banUser, clearHistory };
});
