<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/app/stores/authStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const password = ref('');
const passwordConfirm = ref('');
const error = ref('');
const loading = ref(false);

const token = route.params.token as string;

const handleSubmit = async () => {
  if (password.value !== passwordConfirm.value) {
    error.value = 'Пароли не совпадают';
    return;
  }
  if (password.value.length < 6) {
    error.value = 'Пароль должен быть не менее 6 символов';
    return;
  }

  loading.value = true;
  error.value = '';
  
  const success = await authStore.resetPassword(token, password.value);
  if (success) {
    alert('Пароль успешно изменен!');
    router.push({ name: 'login' });
  } else {
    error.value = 'Ошибка при смене пароля. Возможно, ссылка устарела.';
  }
  loading.value = false;
};
</script>

<template>
  <div class="reset-container">
    <h1>Новый пароль</h1>
    <p>Введите новый пароль для вашего аккаунта.</p>
    
    <form @submit.prevent="handleSubmit">
      <input 
        v-model="password" 
        type="password" 
        placeholder="Новый пароль" 
        required 
        :disabled="loading"
      />
      <input 
        v-model="passwordConfirm" 
        type="password" 
        placeholder="Подтвердите пароль" 
        required 
        :disabled="loading"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Сохранение...' : 'Изменить пароль' }}
      </button>
    </form>
    
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<style scoped>
.reset-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background: #2c2f33;
  border-radius: 8px;
  color: white;
  text-align: center;
}
h1 { margin-bottom: 20px; }
p { margin-bottom: 25px; color: #b9bbbe; }
input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  background: #23272a;
  border: 1px solid #23272a;
  border-radius: 4px;
  color: white;
}
button {
  width: 100%;
  padding: 12px;
  background: #7289da;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.error-msg { color: #f04747; margin-top: 20px; }
</style>
