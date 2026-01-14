<script setup lang="ts">
import { ref, watch } from "vue";
import formInput from "@/shared/components/formInput.vue";
import iconMail from "@/shared/icon/iconMail.vue";
import iconPassword from "@/shared/icon/iconPassword.vue";
import buttonAuth from "@/shared/components/buttonAuth.vue";
const ff = ref();
const errorTest = ref("Неверный логин или пароль");
</script>

<template>
  <div class="loginIn relative">
    <h2 class="text-[2rem] text-[#C0BCBC] font-semibold text-center mb-8.5">Авторизация</h2>
    <div class="inputs flex flex-col gap-5">
      <formInput :error="!!errorTest" placeholder="Почта..." v-model="ff"><iconMail /></formInput>
      <formInput :error="!!errorTest" placeholder="Пароль..." v-model="ff"><iconPassword /></formInput>
    </div>
    <div class="flex justify-between items-center mt-2.5">
      <div class="error text-CTA_red text-[14px]">{{ errorTest }}</div>
      <RouterLink class="text-[rgb(55,165,179,56%)] text-[13px]" to="/auth/password_reset">Забыли пароль?</RouterLink>
    </div>
    <div class="buttons flex items-center flex-col gap-6.25 mt-14.25">
      <buttonAuth class="w-full">Войти</buttonAuth>
      <RouterLink class="text-[#2B6874] text-[16px]" to="/auth/password_reset"
        >Нет профиля? Зарегистрируйтесь</RouterLink
      >
    </div>
  </div>
</template>

<style scoped></style>
