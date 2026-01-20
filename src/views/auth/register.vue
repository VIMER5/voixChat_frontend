<script setup lang="ts">
import formInput from "@/shared/components/ui/inputs/formInput.vue";
import iconMail from "@/shared/icon/iconMail.vue";
import iconPassword from "@/shared/icon/iconPassword.vue";
import buttonAuth from "@/shared/components/ui/buttons/buttonAuth.vue";
import iconLogin from "@/shared/icon/iconLogin.vue";
import authController from "@views/auth/logic/authController";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const login = ref<string | null>("");
const password = ref<string | null>("");
const mail = ref<string | null>("");
const confirmPassword = ref<string | null>("");
const errorTest = ref<string | null>(null);
const isDisabled = ref(false);
watch(login, () => (isDisabled.value = false));
watch(password, () => (isDisabled.value = false));
watch(mail, () => (isDisabled.value = false));
watch(confirmPassword, () => (isDisabled.value = false));
async function submit() {
  const { ok, errorInfo } = await authController.reg(login.value, mail.value, password.value, confirmPassword.value);
  errorTest.value = errorInfo;
  isDisabled.value = !!errorInfo;
  if (ok) router.push("/auth/");
}
</script>

<template>
  <div class="loginIn relative">
    <h2 class="text-[2rem] text-[#C0BCBC] font-semibold text-center mb-8.5">Регистрация</h2>
    <div class="inputs flex flex-col gap-5">
      <formInput :error="!!errorTest" placeholder="Логин..." v-model="login"><iconLogin /></formInput>
      <formInput :error="!!errorTest" placeholder="Почта..." v-model="mail"><iconMail /></formInput>
      <formInput type="password" :error="!!errorTest" placeholder="Пароль..." v-model="password"
        ><iconPassword
      /></formInput>
      <formInput type="password" :error="!!errorTest" placeholder="Пароль..." v-model="confirmPassword"
        ><iconPassword
      /></formInput>
    </div>
    <div class="flex justify-between items-center mt-2.5">
      <div class="error text-CTA_red text-[14px]">{{ errorTest }}</div>
    </div>
    <div class="buttons flex items-center flex-col gap-6.25 mt-14.25">
      <buttonAuth class="w-full" :disabled="isDisabled" @click="submit">Зарегистрироваться</buttonAuth>
      <RouterLink class="text-[#2B6874] text-[16px]" to="/auth/">Уже есть профиль? Войдите</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
