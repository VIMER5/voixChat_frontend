<script setup lang="ts">
import $api from "@/app/API/axios";
import { useChatsStore } from "@/app/stores/chatsStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import headerPersonalChat from "./components/headerPersonalChat.vue";
import messageInput from "@/shared/components/ui/inputs/messageInput.vue";
import messageList from "@/shared/components/chats/messageList.vue";
import { useRtcStore } from "@/app/stores/rtcStore";
import voicePanel from "@/views/personalChat/components/voicePanel.vue";
const refList = ref();

const route = useRoute();
const router = useRouter();
const storeChats = useChatsStore();
const rtcStore = useRtcStore();

function send(content: string) {
  $api.post("/user/chat/sendMessage", {
    type: "text",
    content: content,
    chatId: chatId.value,
  });
}

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
const localVideo = ref<HTMLVideoElement | null>(null);
onMounted(async () => {
  if (chatId.value) {
    const data = await storeChats.getChatInfo(chatId.value);
    if (data && "push" in data) router.push("/");
  } else {
    router.push("/");
  }
});
</script>

<template>
  <div class="personalChat">
    <!-- <headerPersonalChat :userName="chatName" /> -->
    <voicePanel :chatID="chatId!" />
    <div ref="refList" class="chatContent">
      <messageList :data="chatData?._Messages" :chatId="chatId" />
    </div>
    <footer class="personalChatooter">
      <!-- <div class="rtc-panel">
        <p>
          Статус: <strong>{{ rtcStore.status }}</strong>
        </p>

        <audio
          :ref="
            (el) => {
              rtcStore.remoteAudio = el as HTMLAudioElement;
            }
          "
          autoplay
          controls
        ></audio>

        <button @click="rtcStore.startCall(chatId!)" class="call-btn">📞 Позвонить</button>
        <button @click="rtcStore.endCall()" class="call-btn">📞 сброс</button>
      </div> -->
      <messageInput @send="(d) => send(d)" />
    </footer>
  </div>
</template>

<style scoped>
.personalChat {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.chatContent {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.personalChatooter {
  padding: 10px 15px;
}
</style>
