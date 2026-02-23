<script setup lang="ts">
import $api from "@/app/API/axios";
import appService from "@/app/service/appService";
import messageText from "@/shared/components/chats/message/messageText.vue";
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useChatsStore } from "@/app/stores/chatsStore";
const storeChat = useChatsStore();
const props = defineProps<{
  data: any;
  chatId: any;
}>();
const emit = defineEmits(["loadMore"]);

const shouldShowFullMessage = (index: number) => {
  if (index === 0) return true;

  const currentMessage = props.data[index];
  const previousMessage = props.data[index - 1];
  const currentMessageDate = appService.normalizeDate(currentMessage.createdAt, "date");
  const previousMessageDate = appService.normalizeDate(previousMessage.createdAt, "date");
  if (previousMessageDate != currentMessageDate) return true;
  return currentMessage._User.id !== previousMessage._User.id;
};

const scrollTarget = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const topAnchor = ref<HTMLElement | null>(null);
const isFetching = ref(false);

const scrollToBottom = () => {
  if (scrollTarget.value) {
    scrollTarget.value.scrollIntoView({ behavior: "smooth" });
  }
};

async function getMoreMessages(chatId: string, beforeId: number) {
  try {
    const data = await $api.post("/user/chat/getMoreMessages", {
      chatId,
      beforeId,
    });
    return data;
  } catch (e) {}
}

watch(
  () => props.data,
  async (newVal, oldVal) => {
    if (!listRef.value) return;
    const isAtBottom = listRef.value.scrollHeight - listRef.value.scrollTop <= listRef.value.clientHeight + 50;
    await nextTick();
    if (isAtBottom) {
      scrollToBottom();
    }
  },
  { deep: true },
);

onMounted(() => {
  const observer = new IntersectionObserver(
    async (entries) => {
      const target = entries[0];
      if (target && target.isIntersecting && !isFetching.value) {
        if (!props.data || props.data.length === 0) return;
        isFetching.value = true;
        const scrollHeightBefore = listRef.value?.scrollHeight || 0;
        const data = await getMoreMessages(props.chatId, props.data[0].id);
        const info = data?.data;
        if (!info || !Array.isArray(info) || info.length == 0) {
          isFetching.value = false;
          return;
        }
        await storeChat.addOldMessage(props.chatId, info);
        await nextTick();
        if (listRef.value) {
          listRef.value.scrollTop = listRef.value.scrollHeight - scrollHeightBefore;
        }
        console.log(info);
        isFetching.value = false;
      }
    },
    { threshold: 0.1 },
  );
  if (topAnchor.value) observer.observe(topAnchor.value);
});
</script>

<template>
  <ul ref="listRef" class="scroll">
    <div ref="topAnchor" class="top-load-sensor"></div>
    <li v-for="(item, index) in data" :key="item.id">
      <messageText
        :format="shouldShowFullMessage(index) ? 'max' : 'min'"
        :date="item.createdAt"
        :imgUrl="item._User.avatar"
        :user-name="item._User.username"
        :message="item.content"
      />
    </li>
    <div ref="scrollTarget" class="anchor"></div>
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
.scroll {
  flex: 1;
  overflow: auto;
  scrollbar-width: none;
}
.anchor {
  height: 1px;
}
.top-load-sensor {
  height: 1px;
  width: 100%;
}
</style>
