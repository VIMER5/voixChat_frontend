<script setup lang="ts">
import { type TypeStatusProps } from "@/app/model/userStatusModel";
import userAvatar from "@components/userAvatar.vue";
import iconDeafen from "@icons/iconDeaf.vue";
import iconMute from "@icons/iconMute.vue";
import iconSettings from "@icons/iconSettings.vue";
import buttonIcons from "@components/buttonIcons.vue";

defineProps<{
  userName: string;
  userStatus: string;
  status: TypeStatusProps;
  urlUserAvatar: string;
}>();
</script>

<template>
  <div class="p-0.75 h-15.5 bg-DeepBlueBlack-darker flex items-center rounded-[5px] px-2.5 py-3.5 justify-between">
    <div class="flex gap-1.25 h-full items-center">
      <userAvatar type="default" :img-url="urlUserAvatar" :user-name="userName" :status="status" class="h-full" />
      <div class="userInfo flex flex-col">
        <span class="text-[0.875rem]/[1.2] text-white">{{ userName }}</span>
        <span class="text-[0.6875rem]/none text-icons-c">{{ userStatus }}</span>
      </div>
    </div>
    <div class="items-center gap-3.25 flex h-full">
      <buttonIcons class="h-[70%]"><iconMute /></buttonIcons>
      <buttonIcons class="h-[70%]"><iconDeafen /></buttonIcons>
      <buttonIcons class="h-[70%]"><iconSettings /></buttonIcons>
    </div>
  </div>
</template>

<style scoped></style>
