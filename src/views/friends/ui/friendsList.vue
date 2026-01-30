<script setup lang="ts">
import friendBar from "@views/friends/ui/components/friendBar.vue";
import { useFriendStore } from "@/app/stores/friendStore";
import { onMounted } from "vue";
const storeFriend = useFriendStore();
onMounted(() => {
  storeFriend.getFriend();
});
</script>

<template>
  <div class="friendsList">
    <ul class="friends">
      <li v-for="[id, friend] in storeFriend.friends" :key="id">
        <friendBar
          :id="friend.id"
          :login="friend.login"
          :img-url="friend.avatar"
          user-status="online"
          :userName="friend.username"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.friends {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.friendsList {
}
</style>
