<script setup lang="ts">
import messageText from "@/shared/components/chats/message/messageText.vue";
import { computed } from "vue";
const props = defineProps<{
  data: any;
}>();

const shouldShowFullMessage = (index: number) => {
  if (index === 0) return true;

  const currentMessage = props.data[index];
  const previousMessage = props.data[index - 1];
  console.log(currentMessage);
  return currentMessage._User.id !== previousMessage._User.id;
};
</script>

<template>
  <ul>
    <li v-for="(item, index) in data" :key="item.id">
      <messageText
        :format="shouldShowFullMessage(index) ? 'max' : 'min'"
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
  margin: 0 26px;
  margin-top: 10px;
}
</style>
