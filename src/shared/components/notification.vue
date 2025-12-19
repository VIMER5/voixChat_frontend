<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  notificationText: string | number;
}>();

const notification = computed(() => {
  return String(props.notificationText).length > 2 ? "99+" : props.notificationText;
});
</script>

<template>
  <div
    :title="String(notificationText)"
    class="p-[0.8px] cursor-pointer inline-flex bg-Graphite-anthracite justify-center items-center rounded-full"
  >
    <div
      class="text-[12px]/[1.2] rounded-full bg-CTA_red w-full h-4 px-1 text-white text-center flex items-center justify-center"
      placeholder="dawd"
    >
      {{ notification }}
    </div>
  </div>
</template>

<style scoped></style>
