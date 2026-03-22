<script setup lang="ts"></script>

<template>
  <button class="link link__accent"><slot></slot></button>
</template>

<style scoped>
.link__accent {
  background-color: var(--c-TurquoiseBlue-main);
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}
.link {
  font-weight: 350;
  border-radius: 6px;
  transition: all 0.3s;
}
</style>
