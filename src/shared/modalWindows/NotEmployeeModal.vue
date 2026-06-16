<script setup lang="ts">
const handleExit = () => {
  sessionStorage.removeItem('access');
  window.location.href = '/auth';
};
</script>

<template>
  <div class="employee-overlay">
    <div class="employee-modal">
      <div class="employee-icon">🏢</div>
      <h1>Доступ ограничен</h1>
      <p>Вы не являетесь сотрудником компании. Пожалуйста, обратитесь к администратору для получения доступа.</p>
      <button @click="handleExit">Выйти</button>
    </div>
  </div>
</template>

<style scoped>
.employee-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(10px);
}
.employee-modal {
  background: #1e2124;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  max-width: 450px;
  width: 90vw;
  color: white;
  border: 1px solid #7289da;
  box-shadow: 0 0 30px rgba(114, 137, 218, 0.3);
}
@media (max-width: 767px) {
  .employee-modal {
    padding: 24px;
  }
}
.employee-icon {
  font-size: 72px;
  margin-bottom: 20px;
}
h1 {
  margin-bottom: 15px;
  color: #7289da;
  font-size: 24px;
}
p {
  margin-bottom: 30px;
  line-height: 1.6;
  color: #dcddde;
}
button {
  background: #7289da;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
button:hover {
  background: #5b70be;
  transform: translateY(-2px);
}
button:active {
  transform: translateY(0);
}
</style>
