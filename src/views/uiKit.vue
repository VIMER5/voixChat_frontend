<script setup lang="ts">
import co from "@components/notification.vue";
import userStatus from "@/shared/components/userStatus.vue";
import userAvatar from "@/shared/components/userAvatar.vue";
import usernamePlate from "@/shared/components/usernamePlate.vue";
import buttonIcons from "@/shared/components/ui/buttons/buttonIcons.vue";
import iconDeafen from "@icons/iconDeaf.vue";
import iconMute from "@icons/iconMute.vue";
import iconSettings from "@icons/iconSettings.vue";

const url = "https://cdn.discordapp.com/avatars/555259684584554497/30c74f18defc66cc70aff045b8730032.webp?size=100";
</script>

<template>
  <h1 class="font-semibold text-CTA_red not-italic">Hello world!</h1>
  <div class="d flex gap-10 flex-col">
    <co notification-text="12" />
    <div class="dd flex gap-10">
      <userStatus status="offline" class="w-[45px]" />
      <userStatus status="online" class="w-[45px]" />
    </div>
    <div class="userA flex gap-10">
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="default" status="offline" class="w-[45px]" />
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="default" status="online" class="w-[45px]" />
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="voice" :speak="true" class="w-[45px]" />
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="voice" :speak="false" class="w-[45px]" />
      <userAvatar
        :img-url="url"
        user-name="-=V.I.M.E.R=-"
        type="big"
        :notification="991"
        :speak="true"
        class="w-[45px]"
      />
    </div>
    <usernamePlate
      status="online"
      :url-user-avatar="url"
      userStatus="Vue Is My Everyday Routine"
      userName="-=V.I.M.E.R=-"
      class="mx-10 max-w-[400px]"
    />
  </div>
</template>

<style scoped></style>
