<script setup lang="ts">
import appService from "@/app/service/appService";
import userAvatar from "@components/userUI/userAvatar.vue";

defineProps<{
  format: "min" | "max";
  imgUrl: string;
  userName: string;
  message: string;
  date: Date | string;
}>();
</script>

<template>
  <div class="messageText">
    <div class="content">
      <div class="left">
        <userAvatar
          v-if="format == 'max'"
          class="ava"
          :img-url="imgUrl"
          :userName="userName"
          :speak="false"
          type="voice"
        />
        <div class="timeInMin" v-if="format == 'min'">{{ appService.normalizeDate(date, "time00:44") }}</div>
      </div>
      <div class="right">
        <div v-if="format == 'max'" class="msgInfo">
          <div class="userName">{{ userName }}</div>
          <div class="date">{{ appService.normalizeDate(date, "dateAndTime") }}</div>
        </div>
        <div class="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messageText {
  transition: all 0.3s;
}
.messageText:hover {
  background-color: var(--c-focusButtons);
  border-radius: 10px;
}
.ava {
  width: 100%;
  height: max-content;
}
.timeInMin {
  font-size: clamp(10px, 1cqw, 13px);
  text-align: center;
  line-height: 1;
  margin-top: 3px;
  color: var(--c-SpaceAsh_45);
}
.content {
  display: grid;
  grid-template-columns: clamp(40px, 3.6cqw, 50px) 1fr;
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
  line-height: 1.3;
  font-weight: 600;
  color: #e9e9e9;
  font-size: clamp(12px, 1.2cqw, 20px);
  white-space: pre-wrap;
}
</style>
