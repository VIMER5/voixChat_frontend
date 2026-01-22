<script setup lang="ts">
import { computed } from "vue";
import userStatus from "./userStatus.vue";
import notification from "./notification.vue";
import { type TypePropsUserAvatar } from "@model/userAvatarModel";
const props = defineProps<TypePropsUserAvatar>();

const status = computed(() => {
  return props.type === "default" ? props.status : null;
});
const speak = computed(() => {
  return props.type === "voice" ? props.speak : null;
});
const big = computed(() => {
  return props.type === "big" ? props.notification : null;
});
</script>

<template>
  <div :title="userName" class="aspect-square relative cursor-pointer">
    <userStatus v-if="status" :status="status" class="absolute right-0 bottom-0" />
    <img
      class="w-full h-full rounded-lg border-TurquoiseBlue-main"
      :class="{ 'border-[1.6px]': speak, 'rounded-full!': status || speak !== null || speak === true }"
      :src="imgUrl"
      alt=""
    />
    <notification v-if="big" :notification-text="big" class="absolute -right-1 -bottom-1" />
  </div>
</template>

<style scoped></style>
