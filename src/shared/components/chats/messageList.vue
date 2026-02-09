<script setup lang="ts">
import messageText from "@/shared/components/chats/message/messageText.vue";
defineProps<{
  data: any;
}>();
</script>

<template>
  <ul>
    <li v-for="item in data">
      <messageText
        :date="item.createdAt"
        :imgUrl="item._User.avatar"
        :user-name="item._User.username"
        :message="item.content"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 26px;
  margin-top: 10px;
}
</style>
