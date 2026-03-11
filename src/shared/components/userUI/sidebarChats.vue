<script setup lang="ts">
import { onMounted } from "vue";
import { useChatsStore } from "@/app/stores/chatsStore";
import { useOnlineStore } from "@/app/stores/onlineStore";
import userAvatar from "./userAvatar.vue";
import userPanel from "./userPanel.vue";
const storeChats = useChatsStore();
const onlineStore = useOnlineStore();
// onMounted(() => {
//   storeFriend.getFriend();
// });
const getUserOnlineStatus = (chat: any): "online" | "offline" => {
  if (chat.chatMembers && chat.chatMembers.length === 1) {
    const memberId = chat.chatMembers[0].id;
    return onlineStore.getUserOnline(memberId) ?? "offline";
  }
  return "offline";
};
</script>

<template>
  <div class="sidebar__Chats">
    <hr />
    <ul class="friends">
      <li v-for="[id, chat] in storeChats.chats" :key="id">
        <userPanel
          :chat="'/chat/' + chat.id"
          :status="getUserOnlineStatus(chat)"
          :imgUrl="chat.avatar ?? chat.chatMembers[0]?.avatar"
          :username="chat.name ?? chat.chatMembers[0]?.username"
          notificationText="0"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar__Chats {
  padding: 0 9px;
  flex: 1;

  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE и Edge */
}
.sidebar__Chats::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.friends {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
