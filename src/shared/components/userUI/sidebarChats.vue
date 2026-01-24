<script setup lang="ts">
import { onMounted } from "vue";
import { useFriendStore } from "@/app/stores/friendStore";
import userAvatar from "./userAvatar.vue";
const storeFriend = useFriendStore();
onMounted(() => {
  storeFriend.getFriend();
});
</script>

<template>
  <ul class="flex gap-[10px] flex-col">
    <li v-for="[id, friend] in storeFriend.friends" :key="id">
      <div class="d">
        <userAvatar
          status="online"
          :img-url="friend.avatar"
          :user-name="friend.username"
          type="default"
          class="w-[45px]"
        />
        {{ friend.username }}
      </div>
    </li>
  </ul>
</template>

<style scoped>
.d {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
