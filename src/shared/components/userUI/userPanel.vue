<script setup lang="ts">
import userAvatar from "./userAvatar.vue";
import notification from "./notification.vue";
import { type TypeStatusProps } from "@/app/model/userStatusModel";

defineProps<{
  status: TypeStatusProps;
  imgUrl: string;
  username: string;
  notificationText: string;
  chat: string;
}>();
</script>

<template>
  <RouterLink class="linkd" :to="chat">
    <div class="user__panel">
      <div class="unfo">
        <userAvatar class="w-[15.5984252cqw]" :status="status" :img-url="imgUrl" :user-name="username" type="default" />
        <div class="username">{{ username }}</div>
      </div>
      <notification class="h-max" :notificationText="notificationText" /></div
  ></RouterLink>
</template>

<style scoped>
.user__panel {
  container-type: inline-size;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  border-radius: 5px;
  transition: all 0.5s;
}

.unfo {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.username {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 5.511811024cqw;
  font-weight: 600;
  color: #c0bcbc;
}
.user__panel:hover {
  background-color: var(--c-hoverButtons);
}
.router-link-exact-active > .user__panel {
  background-color: var(--c-focusButtons);
}
</style>
