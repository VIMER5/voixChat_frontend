<script setup lang="ts">
import { ref, onMounted } from "vue";
import baseModal from "./baseModal.vue";
import { useUsersInfo } from "@/app/stores/usersInfo";
import { useModalStore } from "@/app/stores/modalStore";
import formInput from "@/shared/components/ui/inputs/formInput.vue";
import defaultButton from "@/shared/components/ui/buttons/defaultButton.vue";
import iconUsers from "@/shared/icon/iconUsers.vue";
import iconPassword from "@/shared/icon/iconPassword.vue";
import $api from "@/app/API/axios";

const userStore = useUsersInfo();
const modalStore = useModalStore();

const username = ref("");
const status = ref("");
const oldPassword = ref("");
const newPassword = ref("");

const updateMessage = ref("");
const errorMessage = ref("");

onMounted(() => {
  if (userStore.userInfoCurrent) {
    username.value = userStore.userInfoCurrent.userName;
    status.value = userStore.userInfoCurrent.status || "";
  }
});

async function handleUpdateProfile() {
  try {
    updateMessage.value = "";
    errorMessage.value = "";
    const response = await $api.patch("user/profile", {
      username: username.value,
      status: status.value,
    });
    userStore.userInfoCurrent = response.data;
    updateMessage.value = "Профиль успешно обновлен";
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || "Ошибка при обновлении профиля";
  }
}

async function handleChangePassword() {
  try {
    updateMessage.value = "";
    errorMessage.value = "";
    if (!oldPassword.value || !newPassword.value) {
      errorMessage.value = "Заполните оба поля пароля";
      return;
    }
    await $api.patch("user/password", {
      passwordOld: oldPassword.value,
      passwordNew: newPassword.value,
    });
    updateMessage.value = "Пароль успешно изменен";
    oldPassword.value = "";
    newPassword.value = "";
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || "Ошибка при смене пароля";
  }
}
</script>

<template>
  <baseModal :open="modalStore.isUserSettingsOpen" @update:open="modalStore.closeUserSettings">
    <div class="user-settings-content">
      <h2 class="title">Настройки пользователя</h2>
      
      <div class="section">
        <h3>Личные данные</h3>
        <div class="field">
          <label>Имя пользователя</label>
          <formInput v-model="username" placeholder="Имя пользователя">
            <iconUsers />
          </formInput>
        </div>
        <div class="field">
          <label>Статус</label>
          <formInput v-model="status" placeholder="Статус">
            <iconUsers />
          </formInput>
        </div>
        <defaultButton @click="handleUpdateProfile" class="action-btn">
          Сохранить изменения
        </defaultButton>
      </div>

      <div class="divider"></div>

      <div class="section">
        <h3>Смена пароля</h3>
        <div class="field">
          <label>Старый пароль</label>
          <formInput v-model="oldPassword" type="password" placeholder="Старый пароль">
            <iconPassword />
          </formInput>
        </div>
        <div class="field">
          <label>Новый пароль</label>
          <formInput v-model="newPassword" type="password" placeholder="Новый пароль">
            <iconPassword />
          </formInput>
        </div>
        <defaultButton @click="handleChangePassword" class="action-btn">
          Изменить пароль
        </defaultButton>
      </div>

      <p v-if="updateMessage" class="success-msg">{{ updateMessage }}</p>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </div>
  </baseModal>
</template>

<style scoped>
.user-settings-content {
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
}
.title {
  margin-bottom: 10px;
  font-size: 24px;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
}
.section h3 {
  font-size: 18px;
  color: var(--c-icons-c);
}
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field label {
  font-size: 14px;
  color: #ccc;
}
.divider {
  height: 1px;
  background-color: #333;
  margin: 10px 0;
}
.action-btn {
  padding: 10px;
  margin-top: 5px;
}
.success-msg {
  color: #4caf50;
  font-size: 14px;
}
.error-msg {
  color: var(--c-CTA_red);
  font-size: 14px;
}
</style>
