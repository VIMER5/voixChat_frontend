<script setup lang="ts">
defineProps<{
  userName: string;
}>();
</script>

<template>
  <header class="header__personalChat">
    <div class="header__content">
      <div class="userName">{{ userName }}</div>
      <div class="buttens">button</div>
    </div>
    <hr />
  </header>
</template>

<style scoped>
.header__content {
  display: flex;
  justify-content: space-between;
  margin: clamp(15px, 1.5cqw, 20px) 16px;
}
.userName {
  font-size: clamp(14px, 1cqw, 20.6531px);
  font-weight: 600;
}
</style>
