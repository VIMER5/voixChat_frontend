<script setup lang="ts">
import { ref, watch } from "vue";
import formInput from "@/shared/components/formInput.vue";
import iconLogin from "@/shared/icon/iconLogin.vue";
import iconPassword from "@/shared/icon/iconPassword.vue";
import buttonAuth from "@/shared/components/buttonAuth.vue";
import authController from "@views/auth/logic/authController";
const login = ref<string | null>(null);
const password = ref<string | null>(null);
const errorTest = ref<string | null>(null);
const isDisabled = ref(false);
watch(login, () => (isDisabled.value = false));
watch(password, () => (isDisabled.value = false));
async function submit() {
  const { value, error } = await authController.loginIn(login.value, password.value);
  errorTest.value = error;
  isDisabled.value = !!error;
}
</script>

<template>
  <div class="loginIn relative">
    <h2 class="text-[2rem] text-[#C0BCBC] font-semibold text-center mb-8.5">Авторизация</h2>
    <div class="inputs flex flex-col gap-5">
      <formInput :error="!!errorTest" placeholder="Логин..." v-model="login"><iconLogin /></formInput>
      <formInput :error="!!errorTest" placeholder="Пароль..." v-model="password"><iconPassword /></formInput>
    </div>
    <div class="flex justify-between items-center mt-2.5">
      <div class="error text-CTA_red text-[14px]">{{ errorTest }}</div>
      <RouterLink class="text-[rgb(55,165,179,56%)] text-[13px]" to="/auth/password_reset">Забыли пароль?</RouterLink>
    </div>
    <div class="buttons flex items-center flex-col gap-6.25 mt-14.25">
      <buttonAuth class="w-full" :disabled="isDisabled" @click="submit">Войти</buttonAuth>
      <RouterLink class="text-[#2B6874] text-[16px]" to="/auth/register">Нет профиля? Зарегистрируйтесь</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
