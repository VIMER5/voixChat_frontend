<script setup lang="ts">
const handleExit = () => {
  sessionStorage.removeItem('access');
  window.location.href = '/auth';
};
</script>

<template>
  <div class="banned-overlay">
    <div class="banned-modal">
      <div class="banned-icon">🚫</div>
      <h1>Ваш аккаунт заблокирован</h1>
      <p>Вы были забанены администрацией за нарушение правил сервиса.</p>
      <button @click="handleExit">Вернуться на главную</button>
    </div>
  </div>
</template>

<style scoped>
.banned-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}
.banned-modal {
  background: #2c2f33;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  color: white;
  border: 1px solid #ff4444;
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.2);
}
.banned-icon {
  font-size: 64px;
  margin-bottom: 20px;
}
h1 {
  margin-bottom: 15px;
  color: #ff4444;
}
p {
  margin-bottom: 25px;
  line-height: 1.5;
  color: #b9bbbe;
}
button {
  background: #ff4444;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #cc0000;
}
</style>
