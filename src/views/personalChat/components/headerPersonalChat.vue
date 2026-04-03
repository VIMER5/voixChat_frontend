<script setup lang="ts">
import iconCall from "@/shared/icon/iconCall.vue";
import { useChatsStore } from "@/app/stores/chatsStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVoiceStore } from "@/app/stores/voiceStore";
const route = useRoute();
const storeChats = useChatsStore();
defineProps<{
  userName?: string;
}>();
const voiceStore = useVoiceStore();
const chatId = computed(() => {
  return route.params.idChat && typeof route.params.idChat === "string" ? route.params.idChat : null;
});
const chatData = computed(() => {
  if (!chatId.value) return null;
  return storeChats.chatById(chatId.value);
});
const chatName = computed(() => {
  if (chatData) {
    if (!chatData.value) return "загрузка";
    return chatData.value.name ?? chatData.value.chatMembers[0]?.username;
  }
  return "Ошибка";
});
</script>

<template>
  <header class="header__personalChat">
    <div class=""></div>
    <div class="header__content">
      <div class="userName">{{ chatName }}</div>
      <div class="buttens">
        <ul>
          <li><iconCall @click="voiceStore.handleJoin" /></li>
        </ul>
      </div>
    </div>
    <hr />
  </header>
</template>

<style scoped>
.header__personalChat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  container-type: inline-size;
}
.header__content {
  display: flex;
  justify-content: space-between;
  margin: 0px 16px;
  align-items: stretch;
  align-items: center;
}
.userName {
  font-size: clamp(14px, 1cqw, 20.6531px);
  font-weight: 600;
}
.buttens {
  height: 100%;
  display: flex;
  align-items: center;
}
.buttens > ul {
  display: flex;
  height: 80%;
  flex-direction: row;
}
.buttens svg {
  height: 100%;
  width: auto;
}
</style>
