<script setup lang="ts">
import buttonDefoultSidebarChannels from "@/shared/components/ui/buttons/buttonDefoultSidebarChannels.vue";
import logoIcon from "@/shared/icon/logoIcon.vue";
import iconAddServer from "@/shared/icon/iconAddServer.vue";
</script>

<template>
  <div class="mainLayout">
    <aside class="sidebar__channels">
      <RouterLink to="/">
        <buttonDefoultSidebarChannels><logoIcon class="m-[8px]" /></buttonDefoultSidebarChannels>
      </RouterLink>
      <RouterLink to="/uikit">
        <buttonDefoultSidebarChannels class="mt-[10px]"
          ><iconAddServer class="m-[13px]"
        /></buttonDefoultSidebarChannels>
      </RouterLink>
    </aside>
    <aside class="sidebar__chats"></aside>
    <section class="chats"><RouterView /></section>
  </div>
</template>

<style scoped>
.mainLayout {
  height: 100%;
  padding: 15px 10px 15px 0px;
  display: grid;
  grid-template-columns: max(3.333dvw, 48px) max(18.78dvw, 250px) auto;
}
.sidebar__channels {
  padding: 0 7px;
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
