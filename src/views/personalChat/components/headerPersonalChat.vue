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

function call() {
  if (chatId.value) voiceStore.handleJoin(chatId.value);
}
</script>

<template>
  <header class="header__personalChat">
    <div class="header__content">
      <div class="flex items-center gap-2">
        <RouterLink to="/" class="md:hidden p-2 -ml-2 text-[#c0bcbc] hover:text-white transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </RouterLink>
        <div class="userName">{{ chatName }}</div>
      </div>
      <div class="buttens">
        <ul>
          <li><iconCall @click="call" /></li>
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
  width: 100%;
}
.header__content {
  display: flex;
  justify-content: space-between;
  margin: auto 16px;
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
@media (max-width: 768px) {
  .buttens {
    height: 65%;
  }
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
