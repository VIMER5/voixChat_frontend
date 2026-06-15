import $api from "@/app/API/axios";

class AdminService {
  async getAllUsers() {
    return await $api.get("admin/users");
  }

  async banUser(userId: number, isBanned: boolean) {
    return await $api.post("admin/ban", { userId, isBanned });
  }

  async getAllChats() {
    return await $api.get("admin/chats");
  }

  async clearChatHistory(chatId: string) {
    return await $api.post("admin/clear-history", { chatId });
  }
}

export default new AdminService();
