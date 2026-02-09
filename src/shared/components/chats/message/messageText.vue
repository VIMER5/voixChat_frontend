<script setup lang="ts">
import userAvatar from "@components/userUI/userAvatar.vue";

defineProps<{
  imgUrl: string;
  userName: string;
  message: string;
  date: Date | string;
}>();
</script>

<template>
  <div class="messageText">
    <div class="content">
      <userAvatar class="ava" :img-url="imgUrl" :userName="userName" :speak="false" type="voice" />
      <div class="right">
        <div class="msgInfo">
          <div class="userName">{{ userName }}</div>
          <div class="date">{{ date }}</div>
        </div>
        <div class="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ava {
  width: clamp(40px, 3.6cqw, 50px);
  height: max-content;
}
.content {
  display: flex;
  gap: 10px;
}
.right {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.msgInfo {
  display: flex;
  gap: 5px;
  align-items: flex-end;
  font-weight: 600;
  > .date {
    color: var(--c-SpaceAsh_45);
    font-size: 1cqw;
    line-height: 1;
  }
  > .userName {
    font-size: 1.4cqw;
    line-height: 1;
    color: var(--c-SpaceAsh);
  }
}
.message {
  line-height: 1;
  font-weight: 600;
  color: #e9e9e9;
}
</style>
