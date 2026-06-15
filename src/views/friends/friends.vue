<script setup lang="ts">
import iconUsers from "@/shared/icon/iconUsers.vue";
import { ref, onMounted } from "vue";
import baseModal from "@modalWindows/baseModal.vue";
import formInput from "@/shared/components/ui/inputs/formInput.vue";
import notification from "@/shared/components/userUI/notification.vue";
import { useFriendStore } from "@/app/stores/friendStore";
import $api from "@/app/API/axios";
import { AxiosError } from "axios";
const storeFriend = useFriendStore();
const openAddFriendsModal = ref<boolean>(false);
const errorTextModel = ref<string>("");
const doneTextModel = ref<string>("");
const addInput = ref();
onMounted(() => {
  storeFriend.getfriendsRequest();
});
async function addFriend() {
  try {
    errorTextModel.value = "";
    doneTextModel.value = "";
    await $api.post("user/friend", {
      user: addInput.value,
    });
    doneTextModel.value = "Запрос отправлен";
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError && e.status != 500 && e.response) errorTextModel.value = e.response.data;
  }
  // user/friend/
}
</script>

<template>
  <header class="friend-header">
    <div class="friend-header__title">
      <iconUsers class="w-[21px]" color="#BABABD" opacity="0.54" />
      <h2 class="mx-[10px]">Друзья</h2>
      <hr class="friend-header__title-hr" />
    </div>
    <div class="friend__buttons">
      <RouterLink class="link" to="/friends">Все</RouterLink>
      <RouterLink class="link" to="/friends/requests"
        >Запросы
        <notification v-if="storeFriend.friendsRequest.size > 0" :notification-text="storeFriend.friendsRequest.size"
      /></RouterLink>
      <button @click="openAddFriendsModal = true" class="link link__accent">Добавить в друзья</button>
    </div>
  </header>
  <div class="content"><RouterView /></div>
  <baseModal @update:open="(d) => (openAddFriendsModal = d)" :open="openAddFriendsModal">
    <div class="friends__modal__content">
      <div class="h3">Добавить в друзья</div>
      <formInput v-model="addInput" placeholder="username#1"><iconUsers class="w-[23px]" /></formInput>
      <div v-if="errorTextModel" class="error__model">{{ errorTextModel }}</div>
      <div v-if="doneTextModel" class="done__model">{{ doneTextModel }}</div>
      <button @click="addFriend" class="send_Friend">Отправить запрос дружбы</button>
    </div>
  </baseModal>
</template>

<style scoped>
.friend-header {
  border-bottom: 0.3px solid var(--с-SpaceCharcoal_69);
  padding: 13px 20px;
  display: flex;
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
}
h2 {
  color: rgb(186, 186, 189, 54%);
  font-weight: 600;
  font-size: 14px;
}
.friend-header__title-hr {
  border: 0px;
  border-right: 0.5px solid rgb(186, 186, 189, 54%);
  height: 43.47826086956522%;
}
.link {
  padding: 2.5px 11px;
  color: rgb(255, 255, 255, 65%);
  font-weight: 350;
  border-radius: 6px;
  transition: all 0.3s;
}
.link:hover {
  color: white;
  background-color: rgb(47, 49, 55, 41%);
}
.link__accent {
  padding-block: 3px !important;
  background-color: var(--c-TurquoiseBlue-main);
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}
.friends__modal__content {
  width: 27.63888888888889dvw;
  max-width: 500px;
  min-width: 200px;
  transition: all 1s;
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
.content {
  margin: 20px 20px 0 20px;
  flex: 1;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.error__model {
  margin-top: 8px;
  font-size: 14px;
  color: var(--color-CTA_red);
  width: max-content;
  margin-left: 10px;
}
.done__model {
  margin-top: 8px;
  font-size: 14px;
  color: #2e7747;
  width: max-content;
  margin-left: 10px;
}
</style>
