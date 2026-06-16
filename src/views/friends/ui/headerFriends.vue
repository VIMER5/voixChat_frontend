<script setup lang="ts">
import iconUsers from "@/shared/icon/iconUsers.vue";
import notification from "@/shared/components/userUI/notification.vue";
import { useFriendStore } from "@/app/stores/friendStore";
import { ref } from "vue";
import baseModal from "@modalWindows/baseModal.vue";
import formInput from "@/shared/components/ui/inputs/formInput.vue";
import $api from "@/app/API/axios";
import { AxiosError } from "axios";

const storeFriend = useFriendStore();
const openAddFriendsModal = ref<boolean>(false);
const errorTextModel = ref<string>("");
const doneTextModel = ref<string>("");
const addInput = ref();

async function addFriend() {
  try {
    errorTextModel.value = "";
    doneTextModel.value = "";
    await $api.post("user/friend", {
      user: addInput.value,
    });
    doneTextModel.value = "Запрос отправлен";
  } catch (e) {
    if (e instanceof AxiosError && e.status != 500 && e.response) errorTextModel.value = e.response.data;
  }
}
</script>

<template>
  <header class="friend-header">
    <div class="flex items-center gap-2">
      <RouterLink to="/" class="md:hidden p-2 -ml-2 text-[#c0bcbc] hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </RouterLink>
      <div class="friend-header__title">
        <iconUsers class="w-[21px]" color="#BABABD" opacity="0.54" />
        <h2 class="mx-[10px]">Друзья</h2>
        <hr class="friend-header__title-hr" />
      </div>
    </div>
    <div class="friend__buttons overflow-x-auto scrollbar-hide">
      <RouterLink class="link whitespace-nowrap" to="/friends">Все</RouterLink>
      <RouterLink class="link whitespace-nowrap" to="/friends/requests"
        >Запросы
        <notification v-if="storeFriend.friendsRequest.size > 0" :notification-text="storeFriend.friendsRequest.size"
      /></RouterLink>
      <button @click="openAddFriendsModal = true" class="link link__accent whitespace-nowrap">Добавить</button>
    </div>
  </header>

  <baseModal @update:open="(d) => (openAddFriendsModal = d)" :open="openAddFriendsModal">
    <div class="friends__modal__content">
      <div class="h3">Добавить в друзья</div>
      <formInput v-model="addInput" placeholder="username#1"><iconUsers class="w-[23px]" /></formInput>
      <div v-if="errorTextModel" class="error__model">{{ errorTextModel }}</div>
      <div v-if="doneTextModel" class="done__model">{{ doneTextModel }}</div>
      <button @click="addFriend" class="send_Friend">Отправить запрос</button>
    </div>
  </baseModal>
</template>

<style scoped>
.friend-header {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.friend__buttons {
  display: flex;
  gap: 10px;
  margin-left: 10px;
  align-items: center;
}
.friend-header__title {
  display: flex;
  align-items: center;
  height: 100%;
}
h2 {
  color: rgb(186, 186, 189, 54%);
  font-weight: 600;
  font-size: 14px;
}
.friend-header__title-hr {
  border: 0px;
  border-right: 0.5px solid rgb(186, 186, 189, 54%);
  height: 20px;
}
.link {
  padding: 2.5px 11px;
  color: rgb(255, 255, 255, 65%);
  font-weight: 350;
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 14px;
}
.link:hover {
  color: white;
  background-color: rgb(47, 49, 55, 41%);
}
.link__accent {
  background-color: var(--c-TurquoiseBlue-main);
  font-weight: 600;
  color: white;
  cursor: pointer;
}
.friends__modal__content {
  width: min(440px, 90vw);
}
.h3 {
  margin-bottom: 25px;
}
.send_Friend {
  background-color: var(--c-TurquoiseBlue-main);
  padding-block: 14px;
  margin-top: 20px;
  border-radius: 10px;
  width: 100%;
  line-height: 1;
  cursor: pointer;
  font-size: 16px;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
