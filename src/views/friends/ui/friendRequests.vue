<script setup lang="ts">
import { useFriendStore } from "@/app/stores/friendStore";
import friendBar from "@views/friends/ui/components/friendBar.vue";
const storeFriend = useFriendStore();
</script>

<template>
  <ul class="friends">
    <li v-for="[id, friend] in storeFriend.friendsRequest" :key="id">
      <friendBar
        :id="friend.id"
        :login="friend.login"
        :img-url="friend.avatar"
        user-status="online"
        :userName="friend.username"
      />
    </li>
  </ul>
</template>

<style scoped></style>
