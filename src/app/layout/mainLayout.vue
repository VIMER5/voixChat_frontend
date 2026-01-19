<script setup lang="ts"></script>

<template>
  <div class="mainLayout">
    <aside class="sidebar__channels"></aside>
    <aside class="sidebar__chats"></aside>
    <section class="chats"></section>
  </div>
</template>

<style scoped>
.mainLayout {
  height: 100%;
  padding: 15px 10px 15px 0px;
  display: grid;
  grid-template-columns: max(3.333dvw, 48px) max(18.78dvw, 250px) auto;
}
.sidebar__chats {
  background-color: var(--c-BlueGray-Dark);
  border-radius: 8px;
}
.chats {
  background-color: var(--c-BlueGray-Cool);
  margin-left: 10px;
  border-radius: 13px;
}
</style>
