<script setup lang="ts">
import ResizablePanel from "@/app/service/resizablePanel";
import { ref, onMounted, onUnmounted, computed } from "vue";
import defaultButton from "@/shared/components/ui/buttons/defaultButton.vue";
import { useVoiceStore } from "@/app/stores/voiceStore";
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import iconCallReject from "@/shared/icon/iconCallReject.vue";

const panel = ref<HTMLElement | null>(null);
const resizable: ResizablePanel = new ResizablePanel(panel);
const voiceStor = useVoiceStore();
const newHeight = computed(() => resizable.panelHeight.value);
const porops = defineProps<{
  chatID: string;
}>();
const voiceInfo = computed(() => voiceStor.currentVoice(porops.chatID));
onMounted(() => {
  resizable.init();
});

onUnmounted(() => {
  resizable.destroy();
});
</script>

<template>
  <div
    v-if="voiceInfo && voiceInfo.members.length > 0"
    class="voicePanel"
    ref="panel"
    :style="{ height: newHeight + 'px' }"
  >
    <div class="voicePanel-content">
      <div class="users">
        <ul class="users-ul">
          <li v-for="user in voiceInfo.members">
            <userAvatar
              class="userAvatarVoicePanel"
              :img-url="user.avatar"
              type="voice"
              :speak="false"
              :user-name="user.userName"
            />
          </li>
        </ul>
      </div>
      <slot></slot>
    </div>
    <div class="voice__channel__management">
      <defaultButton
        @click="voiceStor.handleJoin(chatID)"
        v-if="voiceStor.room.name != chatID"
        class="join__voice-button"
      >
        Присоединиться к звонку
      </defaultButton>
      <ul v-else class="voice__channel__management__buttons">
        <li>
          <button @click="voiceStor.disconnect" class="bg-CTA_red"><iconCallReject /></button>
        </li>
      </ul>
    </div>
    <div class="resize-handle" @mousedown="resizable.start"></div>
  </div>
</template>

<style scoped>
.voicePanel {
  background-color: var(--c-BlueGray-Dark);
  min-height: 30%;
  max-height: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-block: 15px;
  align-items: center;
  container-type: size;
}

.voicePanel-content {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  cursor: ns-resize;
  background-color: transparent;
}

.voice__channel__management {
}
.join__voice-button {
  padding: 8px 12px 8px 12px !important;
}
.userAvatarVoicePanel {
  width: 31cqh;
  max-width: 95px;
}
.users-ul {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.voice__channel__management__buttons {
  display: flex;
}
.voice__channel__management__buttons button {
  height: 35px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.voice__channel__management__buttons button svg {
  height: 70%;
  width: auto;
}
</style>
