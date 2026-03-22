<script setup lang="ts">
import ResizablePanel from "@/app/service/resizablePanel";
import { ref, onMounted, onUnmounted, computed } from "vue";
import defaultButton from "@/shared/components/ui/buttons/defaultButton.vue";

const panel = ref<HTMLElement | null>(null);
const resizable: ResizablePanel = new ResizablePanel(panel);
const newHeight = computed(() => resizable.panelHeight.value);
onMounted(() => {
  resizable.init();
});

onUnmounted(() => {
  resizable.destroy();
});
</script>

<template>
  <div class="voicePanel" ref="panel" :style="{ height: newHeight + 'px' }">
    <div class="voicePanel-content">
      {{ newHeight }}
      <slot></slot>
    </div>
    <div class="voice__channel__management">
      <defaultButton class="join__voice-button">Присоединиться к звонку</defaultButton>
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
}

.voicePanel-content {
  flex: 1;
  overflow: auto;
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
</style>
