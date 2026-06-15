<script setup lang="ts">
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import { type TypeStatusProps } from "@/app/model/userStatusModel";
defineProps<{
  userStatus: TypeStatusProps;
  userName: string;
  imgUrl: string;
  id: number;
  login: string;
}>();
</script>

<template>
  <div class="friendBar">
    <hr style="border-top: 0.1px solid rgb(71 71 71)" />
    <div class="content">
      <div class="left">
        <userAvatar :status="userStatus" :user-name="userName" type="default" class="avatar" :img-url="imgUrl" />
        <div class="userInfo">
          <h2 class="username">{{ userName }}</h2>
          <h3 class="login">{{ login }}#{{ id }}</h3>
        </div>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 10px;
}
.avatar {
  width: clamp(36px, 3.811252268602541cqw, 60px);
}
.content {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}
.userInfo {
  container-type: inline-size;
  flex: 1;
}
.username {
  font-weight: 600;
  font-size: clamp(12px, 1.3cqw, 15px);
}
.login {
  font-weight: 600;
  font-size: clamp(10px, 1cqw, 13px);
  color: rgba(255, 255, 255, 45%);
}
</style>
