<script setup lang="ts">
import $api from "@/app/API/axios";
import { AxiosError } from "axios";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const error = ref();
const done = ref();
let redirectTimer: any;
onMounted(async () => {
  const token = route.params.token;
  console.log(token);
  try {
    const data = await $api.get(`/auth/VerifyEmail/${token}`);
    done.value = "Успешное подтверждение почты, через 3 секунды мы вас перенаправим на главную страницу.";
    redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.status == 404) error.value = "Ваша ссылка, вероятно, недействительна.";
    }
    console.log();
  }
});

onBeforeUnmount(() => {
  if (redirectTimer) clearTimeout(redirectTimer);
});
</script>

<template>
  <div class="">
    <div class="text-CTA_red text-center">{{ error }}</div>
    <div class="text-center">{{ done }}</div>
  </div>
</template>

<style scoped></style>
