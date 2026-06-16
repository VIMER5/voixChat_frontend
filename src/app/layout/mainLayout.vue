<script setup lang="ts">
import buttonDefoultSidebarChannels from "@/shared/components/ui/buttons/buttonDefoultSidebarChannels.vue";
import logoIcon from "@/shared/icon/logoIcon.vue";
import iconAddServer from "@/shared/icon/iconAddServer.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import { useUsersInfo } from "@/app/stores/usersInfo";
import { useSocketStore } from "@/app/stores/socketStore";
import { useFriendStore } from "@/app/stores/friendStore";
import sidebarChats from "@/shared/components/userUI/sidebarChats.vue";
import iconAddFriend from "@/shared/icon/iconAddFriend.vue";
import usernamePlate from "@/shared/components/userUI/usernamePlate.vue";
import notification from "@/shared/components/userUI/notification.vue";
import { useChatsStore } from "@/app/stores/chatsStore";
import { useVoiceStore } from "../stores/voiceStore";
import loadView from "@/views/loadView.vue";
import { useAppStore } from "../stores/appStore";
import baseModal from "@/shared/modalWindows/baseModal.vue";
import formInput from "@/shared/components/ui/inputs/formInput.vue";

const socketStore = useSocketStore();
const store = useUsersInfo();
const storeFriend = useFriendStore();
const appStore = useAppStore();
const chatsStore = useChatsStore();
const route = useRoute();

const isContentActive = computed(
  () =>
    !!route.params.idChat || route.path.startsWith("/friends") || route.path === "/uikit" || route.path === "/admin",
);

const openCreateGroupModal = ref(false);
// ... rest remains same until template
const groupName = ref("");
const selectedMembers = ref<number[]>([]);

async function createGroup() {
  if (!groupName.value || selectedMembers.value.length === 0) return;
  try {
    await chatsStore.createGroupChat(groupName.value, selectedMembers.value);
    openCreateGroupModal.value = false;
    groupName.value = "";
    selectedMembers.value = [];
  } catch (e) {
    console.error(e);
  }
}

function toggleMember(id: number) {
  const index = selectedMembers.value.indexOf(id);
  if (index === -1) {
    selectedMembers.value.push(id);
  } else {
    selectedMembers.value.splice(index, 1);
  }
}

const username = computed(() => {
  return store.userInfoCurrent ? `${store.userInfoCurrent.login}#${store.userInfoCurrent.id}` : "load";
});
const useravatar = computed(() => {
  return store.userInfoCurrent ? store.userInfoCurrent.avatar : "load";
});
const userStatus = computed(() => {
  return store.userInfoCurrent ? store.userInfoCurrent.status : "";
});
onMounted(() => appStore.initApp());
const userNtification = ref(["lol"]);
const url = "https://cdn.discordapp.com/avatars/555259684584554497/30c74f18defc66cc70aff045b8730032.webp?size=100";
</script>

<template>
  <Teleport to="body">
    <loadView v-if="!socketStore.isReady || !appStore.appReady" />
  </Teleport>
  <div class="mainLayout" :class="{ 'is-content-active': isContentActive }">
    <RouterLink class="sidebar__channels__backbutton" to="/">
      <buttonDefoultSidebarChannels><logoIcon class="m-[8px]" /></buttonDefoultSidebarChannels>
    </RouterLink>
    <aside class="sidebar__channels">
      <div class="sidebar__channels__buttons">
      </div>
    </aside>
    <header class="header__sidebar__chats">
      <button @click="openCreateGroupModal = true" class="button__search">Создать группу</button>
    </header>
    <aside class="sidebar__chats">
      <hr />
      <RouterLink class="friendButton text-[16px] md:text-[5cqw]" to="/friends">
        <div class="text"><iconAddFriend class="h-[24px] md:h-[6.296cqw]" />Друзья</div>
        <notification v-if="storeFriend.friendsRequest.size > 0" :notification-text="storeFriend.friendsRequest.size" />
      </RouterLink>
      <sidebarChats />
      <usernamePlate
        status="online"
        :url-user-avatar="useravatar"
        :userStatus="userStatus"
        :userName="username"
        class="my-[10px] mx-[8px]"
      />
    </aside>
    <header class="page-header"><router-view name="header" /></header>
    <section class="chats"><RouterView /></section>
  </div>

  <baseModal @update:open="(d) => (openCreateGroupModal = d)" :open="openCreateGroupModal">
    <div class="createGroupModal">
      <h2 class="text-white text-xl font-bold mb-4">Создать групповой чат</h2>
      <formInput v-model="groupName" placeholder="Название группы" class="mb-4" />

      <h3 class="text-white text-sm font-semibold mb-2 opacity-60 uppercase">Выберите друзей</h3>
      <div class="friendsListScroll">
        <div
          v-for="[id, friend] in storeFriend.friends"
          :key="id"
          @click="toggleMember(friend.id)"
          :class="['friendItem', selectedMembers.includes(friend.id) ? 'selected' : '']"
        >
          <div class="flex items-center gap-3">
            <userAvatar
              :img-url="friend.avatar"
              :user-name="friend.username"
              type="default"
              status="offline"
              class="w-8 h-8"
            />
            <span class="text-white">{{ friend.username }}</span>
          </div>
          <div :class="['checkbox', selectedMembers.includes(friend.id) ? 'checked' : '']"></div>
        </div>
      </div>

      <button @click="createGroup" :disabled="!groupName || selectedMembers.length === 0" class="createBtn">
        Создать чат
      </button>
    </div>
  </baseModal>
</template>

<style scoped>
.createGroupModal {
  width: 100%;
  max-width: 440px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}
.friendsListScroll {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 5px;
}
.friendsListScroll::-webkit-scrollbar {
  width: 4px;
}
.friendsListScroll::-webkit-scrollbar-thumb {
  background: var(--с-SpaceCharcoal_69);
  border-radius: 10px;
}
.friendItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.friendItem:hover {
  background: rgba(255, 255, 255, 0.05);
}
.friendItem.selected {
  background: rgba(255, 255, 255, 0.1);
}
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  position: relative;
}
.checkbox.checked {
  background: var(--c-TurquoiseBlue-main);
  border-color: var(--c-TurquoiseBlue-main);
}
.checkbox.checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
}
.createBtn {
  background-color: var(--c-TurquoiseBlue-main);
  color: white;
  padding: 12px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.createBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* MOBILE FIRST */
.mainLayout {
  height: 100dvh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 55px 1fr;
  grid-template-areas:
    "search"
    "sidebarChats";
  overflow: hidden;
}

.mainLayout.is-content-active {
  grid-template-areas:
    "headerPage"
    "PageContant";
}

.sidebar__channels,
.sidebar__channels__backbutton {
  display: none;
}

.sidebar__chats {
  grid-area: sidebarChats;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--c-BlueGray-Dark);
  height: 100%;
}
.mainLayout.is-content-active .sidebar__chats,
.mainLayout.is-content-active .header__sidebar__chats {
  display: none;
}

.chats {
  grid-area: PageContant;
  background-color: var(--c-BlueGray-Cool);
  height: 100%;
  display: none;
  flex-direction: column;
}
.mainLayout.is-content-active .chats,
.mainLayout.is-content-active .page-header {
  display: flex;
}

.header__sidebar__chats {
  grid-area: search;
  padding: 8px;
  background-color: var(--c-BlueGray-Dark);
  display: flex;
  align-items: center;
}

.page-header {
  grid-area: headerPage;
  background-color: var(--c-BlueGray-Cool);
  display: none;
  border-radius: 0;
}

.button__search {
  font-weight: 350;
  color: #bababd;
  border-radius: 5px;
  width: 100%;
  font-size: 14px;
  height: 100%;
  background-color: var(--с-DeepBlueBlack-darker);
  cursor: pointer;
}

/* DESKTOP (Restoring original fluid layout) */
@media (min-width: 768px) {
  .mainLayout {
    height: 100%;
    width: auto;
    padding: 15px 10px 15px 0px;
    grid-template-columns: max(3.333dvw, 48px) max(18.78dvw, 250px) auto;
    grid-template-rows: max(3.333dvw, 55px) 1fr;
    grid-template-areas:
      "backbutton search headerPage"
      "sidebarChannels sidebarChats PageContant" !important;
    overflow: visible;
  }

  .sidebar__channels,
  .sidebar__channels__backbutton {
    display: block;
  }

  .page-header {
    display: block !important;
    margin-left: 10px;
    border-radius: 13px 13px 0px 0px;
  }

  .sidebar__channels__backbutton {
    padding: 0 7px;
    grid-area: backbutton;
  }

  .sidebar__channels {
    padding: 0 7px;
    grid-area: sidebarChannels;
  }
  .servers__gild {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sidebar__chats {
    display: flex !important;
    border-radius: 0px 0px 8px 8px;
    container-type: inline-size;
    height: calc(100dvh - 83px);
  }

  .sidebar__channels__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .chats {
    display: flex !important;
    margin-left: 10px;
    border-radius: 0 0 13px 13px;
    height: calc(100dvh - 83px);
    container-type: inline-size;
  }

  .header__sidebar__chats {
    display: block !important;
    border-radius: 8px 8px 0px 0px;
    container-type: inline-size;
  }

  .button__search {
    font-size: 5cqw;
  }
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
