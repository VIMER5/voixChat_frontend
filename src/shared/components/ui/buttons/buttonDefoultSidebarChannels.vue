<script setup lang="ts"></script>

<template>
  <div class="buttonDefoultSidebarChannels__ui"><slot></slot></div>
</template>

<style scoped>
.buttonDefoultSidebarChannels__ui {
  background-color: var(--c-BlueGray-Dark);
  aspect-ratio: 1 / 1;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s;
}
.buttonDefoultSidebarChannels__ui:hover {
  background-color: var(--c-TurquoiseBlue-main);
}
</style>
