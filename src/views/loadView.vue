<script setup lang="ts">
import glass from "@/shared/components/ui/glass.vue";
import iconUsers from "@icons/iconUsers.vue";
import iconDesktop from "@/shared/icon/iconDesktop.vue";
import iconMobile from "@/shared/icon/iconMobile.vue";
import logoAuth from "@/shared/icon/logoAuth.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useSocketStore } from "@/app/stores/socketStore";
const socketStore = useSocketStore();

const phrases = [
  "Воскрешаем соединение. Понадобится святая вода...",
  "Пытаемся докричаться до бэкенда через форточку...",
  "Кормим хомяков в серверах...",
  "Кто-то наступил на Wi-Fi...",
  "Ищем сигнал в цифровом лесу...",
];

const currentPhraseIndex = ref(0);
let intervalId: any = null;

onMounted(() => {
  intervalId = setInterval(() => {
    currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length;
  }, 3000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="load">
    <logoAuth class="logo" />

    {{ phrases[currentPhraseIndex] }}
  </div>
</template>

<style scoped>
.load {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: var(--с-DeepBlueBlack-lighter);
}
.logo {
  width: 10dvw;
  animation: logo-breath 2s ease-in-out infinite;
}
@keyframes logo-breath {
  0%,
  100% {
    opacity: 0.6;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(100, 210, 255, 0.7));
  }
}
</style>
