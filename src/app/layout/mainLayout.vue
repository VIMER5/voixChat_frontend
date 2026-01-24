<script setup lang="ts">
import buttonDefoultSidebarChannels from "@/shared/components/ui/buttons/buttonDefoultSidebarChannels.vue";
import logoIcon from "@/shared/icon/logoIcon.vue";
import iconAddServer from "@/shared/icon/iconAddServer.vue";
import { onMounted, ref } from "vue";
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import { useUsersInfo } from "../stores/usersInfo";
import { useSocketStore } from "@/app/stores/socketStore";
import sidebarChats from "@/shared/components/userUI/sidebarChats.vue";
const store = useUsersInfo();
store.getCurrentUserInfo();
onMounted(() => {
  const socketStore = useSocketStore();
  socketStore.initSocket(sessionStorage.getItem("access")!);
});
const userNtification = ref(["lol"]);
const url = "https://cdn.discordapp.com/avatars/555259684584554497/30c74f18defc66cc70aff045b8730032.webp?size=100";
</script>

<template>
  <div class="mainLayout">
    <aside class="sidebar__channels">
      <RouterLink to="/">
        <buttonDefoultSidebarChannels><logoIcon class="m-[8px]" /></buttonDefoultSidebarChannels>
      </RouterLink>
      <div v-if="userNtification.length > 0" class="user__notification my-[10px]">
        <userAvatar
          :img-url="url"
          user-name="-=V.I.M.E.R=-"
          status=""
          type="big"
          :notification="991"
          :speak="true"
        ></userAvatar>
      </div>

      <div v-if="userNtification.length > 0" class="servers__gild my-[10px]">
        <hr />
        <userAvatar
          :img-url="url"
          status=""
          user-name="-=V.I.M.E.R=-"
          type="big"
          :notification="991"
          :speak="true"
        ></userAvatar>
      </div>
      <div class="sidebar__channels__buttons">
        <hr />
        <RouterLink to="/uikit">
          <buttonDefoultSidebarChannels class=""><iconAddServer class="m-[13px]" /></buttonDefoultSidebarChannels>
        </RouterLink>
      </div>
    </aside>
    <aside class="sidebar__chats"><sidebarChats class="mt-[100px] ml-[10px]" /></aside>
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
.servers__gild {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar__chats {
  background-color: var(--c-BlueGray-Dark);
  border-radius: 8px;
}
.sidebar__channels__buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
.chats {
  background-color: var(--c-BlueGray-Cool);
  margin-left: 10px;
  border-radius: 13px;
}
</style>
