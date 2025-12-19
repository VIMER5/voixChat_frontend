<script setup lang="ts">
import userAvatar from "@components/userAvatar.vue";
import iconDeafen from "@icons/iconDeaf.vue";
import iconMute from "@icons/iconMute.vue";
import iconSettings from "@icons/iconSettings.vue";

defineProps<{
  userName: string;
  userStatus: string;
}>();
</script>

<template>
  <div class="p-0.75 h-15.5 bg-DeepBlueBlack-darker flex items-center rounded-[5px] px-2.5 py-3.5 justify-between">
    <div class="flex gap-1.25 h-full items-center">
      <userAvatar
        type="default"
        img-url="https://cdn.discordapp.com/avatars/555259684584554497/30c74f18defc66cc70aff045b8730032.webp?size=100"
        :user-name="userName"
        status="online"
        class="h-[100%]"
      />
      <div class="userInfo flex flex-col">
        <span class="text-[0.875rem]/[1.2] text-white">{{ userName }}</span>
        <span class="text-[0.6875rem]/none text-icons-c">{{ userStatus }}</span>
      </div>
    </div>
    <div class="flex items-center gap-3.25">
      <iconMute />
      <iconDeafen />
      <iconSettings />
    </div>
  </div>
</template>

<style scoped></style>
