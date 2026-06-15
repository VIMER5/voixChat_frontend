<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/app/stores/authStore';

const authStore = useAuthStore();
const email = ref('');
const message = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  if (!email.value) return;
  loading.value = true;
  error.value = '';
  message.value = '';
  
  const success = await authStore.forgotPassword(email.value);
  if (success) {
    message.value = 'Инструкции по восстановлению отправлены на вашу почту';
  } else {
    error.value = 'Ошибка при отправке. Проверьте правильность email.';
  }
  loading.value = false;
};
</script>

<template>
  <div class="reset-container">
    <h1>Восстановление пароля</h1>
    <p>Введите ваш email, и мы отправим вам ссылку для сброса пароля.</p>
    
    <form @submit.prevent="handleSubmit">
      <input 
        v-model="email" 
        type="email" 
        placeholder="Ваш email" 
        required 
        :disabled="loading"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Отправка...' : 'Отправить ссылку' }}
      </button>
    </form>
    
    <div v-if="message" class="success-msg">{{ message }}</div>
    <div v-if="error" class="error-msg">{{ error }}</div>
    
    <router-link to="/auth" class="back-link">Вернуться к входу</router-link>
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
  margin-bottom: 20px;
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
button:disabled { opacity: 0.6; }
.success-msg { color: #43b581; margin-top: 20px; }
.error-msg { color: #f04747; margin-top: 20px; }
.back-link { display: block; margin-top: 20px; color: #7289da; text-decoration: none; }
</style>
