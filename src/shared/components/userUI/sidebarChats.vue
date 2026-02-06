<script setup lang="ts">
import { onMounted } from "vue";
import { useChatsStore } from "@/app/stores/chatsStore";
import userAvatar from "./userAvatar.vue";
import userPanel from "./userPanel.vue";
const storeChats = useChatsStore();
// onMounted(() => {
//   storeFriend.getFriend();
// });
</script>

<template>
  <div class="sidebar__Chats">
    <hr />
    <ul class="friends">
      <li v-for="[id, chat] in storeChats.chats" :key="id">
        <userPanel
          :chat="'/chat/' + chat.id"
          status="online"
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
