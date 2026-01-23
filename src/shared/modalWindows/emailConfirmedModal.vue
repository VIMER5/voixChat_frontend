<script setup lang="ts">
import $api from "@/app/API/axios";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  email: string;
}>();

let maskEmailStr = computed(() => {
  return maskEmail(props.email);
});
function maskEmail(email: string) {
  if (!email || !email.includes("@")) return email;

  const [localPart, domain] = email.split("@");
  if (!localPart) return "*" + domain;
  if (localPart.length <= 2) {
    return "*".repeat(localPart.length) + "@" + domain;
  }

  const visiblePart = localPart.substring(0, 2);
  return visiblePart + "**@" + domain;
}
const time = ref(0);
const buttonDis = ref(false);
let timer: any;
function startTimer() {
  timer = setInterval(() => {
    if (time.value >= 1) {
      time.value--;
    } else {
      clearInterval(timer);
      buttonDis.value = false;
    }
  }, 1000);
}
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});
function send() {
  time.value = 20;
  buttonDis.value = true;
  startTimer();
  $api.get("/auth/user/sendVerifyEmailURL");
}
</script>

<template>
  <div class="bc__modal">
    <div class="email__Confirmed__Modal">
      <h2 class="model__title">Подтверждение email</h2>
      <p class="model-p">
        Мы отправили письмо с <br />
        подтверждением на <span>{{ maskEmailStr }}</span>
      </p>
      <h3 class="model-h3">Пройдите по ссылке в письме</h3>
      <button :disabled="buttonDis" @click="send" class="model-button">
        Отправить повторно <span v-if="time > 0">{{ formattedTime }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.bc__modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 45%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.email__Confirmed__Modal {
  background-color: var(--с-DeepBlueBlack-lighter);
  display: flex;
  flex-direction: column;
  width: max-content;
  padding: 35px 32px;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  align-items: center;
}
.model__title {
  font-size: 24px;
}
.model-p {
  margin: 30px 0px 35px 0px;
  > span {
    color: var(--c-TurquoiseBlue-main);
  }
}
.model-button {
  background-color: var(--c-TurquoiseBlue-main);
  padding: 8px 24px;
  border-radius: 5px;
  font-size: 14px;
  width: max-content;
  margin-top: 40px;
  cursor: pointer;
}
button:disabled {
  cursor: default;
  background-color: var(--с-SpaceCharcoal_45);
}
</style>
