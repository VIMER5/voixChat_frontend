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
  }, 3000); // Интервал N = 3 секунды
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="load">
    <logoAuth class="logo" />

    {{ phrases[currentPhraseIndex] }}

    {{ socketStore.error }}
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
    filter: drop-shadow(0 0 15px rgba(100, 210, 255, 0.7)); /* Голубоватый неон */
  }
}

.test {
  animation: circleMotion 25s linear infinite;
}
.test1 {
  animation: circleMotion1 25s linear infinite;
}
@keyframes circleMotion {
  0% {
    transform: rotate(0deg) translateX(110px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(110px) rotate(-360deg);
  }
}
@keyframes circleMotion2 {
  0% {
    padding: 43px 38px;
  }
  50% {
    padding: 53px 48px;
  }
  100% {
    padding: 43px 38px;
  }
}
@keyframes circleMotion1 {
  0% {
    transform: rotate(0deg) translateX(-110px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(-110px) rotate(-360deg);
  }
}
</style>
