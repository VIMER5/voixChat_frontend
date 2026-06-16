<script setup lang="ts">
import { type TypeStatusProps } from "@/app/model/userStatusModel";
import userAvatar from "@components/userUI/userAvatar.vue";
import iconDeafen from "@icons/iconDeaf.vue";
import iconMute from "@icons/iconMute.vue";
import iconSettings from "@icons/iconSettings.vue";
import buttonIcons from "@/shared/components/ui/buttons/buttonIcons.vue";
import { onMounted, ref } from "vue";
import { useVoiceStore } from "@/app/stores/voiceStore";
import { useModalStore } from "@/app/stores/modalStore";

const voiceStore = useVoiceStore();
const modalStore = useModalStore();
defineProps<{
  userName: string;
  userStatus: string | null;
  status: TypeStatusProps;
  urlUserAvatar: string;
}>();
</script>

<template>
  <div class="p-0.75 h-15.5 bg-DeepBlueBlack-darker flex items-center rounded-[5px] px-2.5 py-3.5 justify-between min-w-0">
    <div class="flex gap-2.5 h-full items-center min-w-0 flex-1">
      <userAvatar
        type="default"
        :img-url="`${urlUserAvatar}/thumb`"
        :user-name="userName"
        :status="status"
        class="h-full flex-shrink-0"
      />
      <div class="userInfo flex flex-col min-w-0">
        <span class="text-[0.875rem]/[1.2] text-white truncate select-all">{{ userName }}</span>
        <span class="text-[0.6875rem]/none text-icons-c truncate">{{ userStatus }}</span>
      </div>
    </div>
    <div class="items-center gap-3.25 flex h-full flex-shrink-0">
      <buttonIcons
        :class="{ dis: voiceStore.roomState != 'connected' }"
        :cursor="voiceStore.roomState != 'connected' ? 'not-allowed' : 'pointer'"
        @click="voiceStore.toggleMicrophone"
        class="h-[70%]"
      >
        <iconMute :isMuted="!voiceStore.isMicOn" />
      </buttonIcons>
      <buttonIcons @click="modalStore.openUserSettings" class="h-[70%]"><iconSettings /></buttonIcons>
    </div>
  </div>
</template>

<style scoped>
.dis {
  cursor: not-allowed !important;
}
</style>
