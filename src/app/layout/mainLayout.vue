<script setup lang="ts">
import buttonDefoultSidebarChannels from "@/shared/components/ui/buttons/buttonDefoultSidebarChannels.vue";
import logoIcon from "@/shared/icon/logoIcon.vue";
import iconAddServer from "@/shared/icon/iconAddServer.vue";
import { computed, onMounted, ref } from "vue";
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import { useUsersInfo } from "@/app/stores/usersInfo";
import { useSocketStore } from "@/app/stores/socketStore";
import { useFriendStore } from "@/app/stores/friendStore";
import sidebarChats from "@/shared/components/userUI/sidebarChats.vue";
import iconAddFriend from "@/shared/icon/iconAddFriend.vue";
import usernamePlate from "@/shared/components/userUI/usernamePlate.vue";
import notification from "@/shared/components/userUI/notification.vue";
import { useChatsStore } from "@/app/stores/chatsStore";
const store = useUsersInfo();
const storeFriend = useFriendStore();
const storeChats = useChatsStore();
store.getCurrentUserInfo();
const username = computed(() => {
  return store.userInfoCurrent ? store.userInfoCurrent.userName : "load";
});
const useravatar = computed(() => {
  return store.userInfoCurrent ? store.userInfoCurrent.avatar : "load";
});
const userStatus = computed(() => {
  return store.userInfoCurrent ? store.userInfoCurrent.status : "";
});
onMounted(() => {
  const socketStore = useSocketStore();
  storeChats.getMyChats();
  storeFriend.getfriendsRequest();
  storeFriend.getFriend();
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
        <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="big" :notification="991" :speak="true"></userAvatar>
      </div>

      <div v-if="userNtification.length > 0" class="servers__gild my-[10px]">
        <hr />
        <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="big" :notification="991" :speak="true"></userAvatar>
      </div>
      <div class="sidebar__channels__buttons">
        <hr />
        <RouterLink to="/uikit">
          <buttonDefoultSidebarChannels class=""><iconAddServer class="m-[13px]" /></buttonDefoultSidebarChannels>
        </RouterLink>
      </div>
    </aside>
    <aside class="sidebar__chats">
      <header class="header__sidebar__chats"><button class="button__search">Поиск</button></header>
      <hr />
      <RouterLink class="friendButton text-[5cqw]" to="/friends">
        <div class="text"><iconAddFriend class="h-[6.296cqw]" />Друзья</div>
        <notification v-if="storeFriend.friendsRequest.size > 0" :notification-text="storeFriend.friendsRequest.size"
      /></RouterLink>
      <sidebarChats />
      <usernamePlate
        status="online"
        :url-user-avatar="useravatar"
        :userStatus="userStatus"
        :userName="username"
        class="my-[10px] mx-[8px]"
      />
    </aside>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--c-BlueGray-Dark);
  border-radius: 8px;
  container-type: inline-size;
  height: calc(100dvh - 30px);
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
  height: calc(100dvh - 30px);
  display: flex;
  flex-direction: column;
  container-type: inline-size;
}
.header__sidebar__chats {
  padding: 8px;
}
.button__search {
  font-weight: 350;
  color: #bababd;
  border-radius: 5px;
  width: 100%;
  font-size: 5cqw;
  padding: 8px 0;
  background-color: var(--с-DeepBlueBlack-darker);
  cursor: pointer;
}
.friendButton {
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #c0bcbc;
  transition: all 0.5s;
}
.friendButton:hover {
  background-color: var(--c-hoverButtons);
}
.friendButton > .text {
  display: flex;
  gap: 10px;
}
</style>
