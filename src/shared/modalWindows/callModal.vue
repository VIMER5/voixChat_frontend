<script setup lang="ts">
import { reactive, ref, onUnmounted, onMounted } from "vue";
import userAvatar from "../components/userUI/userAvatar.vue";
import iconCall from "../icon/iconCall.vue";
import iconCallReject from "../icon/iconCallReject.vue";
import { useVoiceStore } from "@/app/stores/voiceStore";
const modalRef = ref<any>(null);
const position = reactive({ x: 0, y: 0 });
const isDragging = ref(false);
let offset = { x: 0, y: 0 };
const voiceStore = useVoiceStore();
function startDrag(e: MouseEvent) {
  isDragging.value = true;
  offset.x = e.clientX - position.x;
  offset.y = e.clientY - position.y;
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
}
function stopDrag() {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
}
function onDrag(e: MouseEvent) {
  if (!isDragging.value || !modalRef.value) return;

  let newX = e.clientX - offset.x;
  let newY = e.clientY - offset.y;

  const minX = 0;
  const minY = 0;
  const maxX = window.innerWidth - modalRef.value.offsetWidth;
  const maxY = window.innerHeight - modalRef.value.offsetHeight;

  position.x = Math.max(minX, Math.min(newX, maxX));
  position.y = Math.max(minY, Math.min(newY, maxY));
}
onUnmounted(() => stopDrag());
onMounted(() => {
  position.x = Math.round(window.innerWidth / 2 - modalRef.value.offsetWidth / 2);
  position.y = Math.round(window.innerHeight / 2 - modalRef.value.offsetHeight / 2);
});

const props = defineProps<{
  avatar: string;
  chatName: string;
  chatID: string;
}>();
const emit = defineEmits(["close"]);
function accept() {
  voiceStore.handleJoin(props.chatID);
  emit("close");
}
</script>

<template>
  <div
    ref="modalRef"
    :style="{ top: position.y + 'px', left: position.x + 'px', cursor: isDragging ? 'grabbing' : 'grab' }"
    class="callModal"
    @mousedown.self="startDrag"
  >
    <div class="modal-header">Входящий звонок</div>
    <userAvatar class="avatar" type="voice" :speak="false" :img-url="avatar" :user-name="chatName" />
    {{ chatName }}
    <div class="button">
      <button @click="accept" class="accept"><iconCall /></button>
      <button class=""><iconCallReject /></button>
    </div>
  </div>
</template>

<style scoped>
.callModal {
  width: clamp(200px, 15dvw, 250px);
  background-color: var(--с-DeepBlueBlack-darker);
  border-radius: 10px;
  position: absolute;
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.14);
  padding: 30px 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.avatar {
  width: 35%;
  margin: 20px 0px;
}
.button {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
  width: 100%;
}
.button button {
  background-color: var(--c-CTA_red);
  width: 25%;
  aspect-ratio: 1/1;
  border-radius: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.button button.accept {
  background-color: var(--c-TurquoiseBlue-darker);
}
.button button svg {
  width: 50%;
}
</style>
