<script setup lang="ts"></script>

<template>
  <div class="hello__view">
    <div class="hello_message">
      <p class="hello_message-p">Добро пожаловать в<br /><span>VoixChat</span></p>
      <span>Выберите, кому хотели бы написать</span>
    </div>
  </div>
</template>

<style scoped>
.hello__view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.hello_message {
  display: flex;
  flex-direction: column;
  > span {
    text-align: center;
    font-size: 0.75rem;
    line-height: 0.75rem;
    margin-top: 20px;
  }
}
.hello_message-p {
  text-align: center;
  font-size: 2rem;
  line-height: 2rem;
  > span {
    color: #37a5b3;
    font-size: 2.5rem;
    margin-top: 8px;
    display: block;
  }
}
</style>
