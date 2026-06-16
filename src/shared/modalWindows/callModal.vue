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

function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true;
  let clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX ?? 0;
  let clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY ?? 0;

  offset.x = clientX - position.x;
  offset.y = clientY - position.y;

  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onDrag, { passive: false });
  window.addEventListener("touchend", stopDrag);
}

function stopDrag() {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", stopDrag);
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value || !modalRef.value) return;
  if (e instanceof TouchEvent) e.preventDefault(); // prevent scrolling while dragging

  let clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX ?? 0;
  let clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY ?? 0;

  let newX = clientX - offset.x;
  let newY = clientY - offset.y;

  const minX = 0;
  const minY = 0;
  const maxX = window.innerWidth - modalRef.value.offsetWidth;
  const maxY = window.innerHeight - modalRef.value.offsetHeight;

  position.x = Math.max(minX, Math.min(newX, maxX));
  position.y = Math.max(minY, Math.min(newY, maxY));
}

onUnmounted(() => stopDrag());
onMounted(() => {
  if (modalRef.value) {
    position.x = Math.round(window.innerWidth / 2 - modalRef.value.offsetWidth / 2);
    position.y = Math.round(window.innerHeight / 2 - modalRef.value.offsetHeight / 2);
  }
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
function reject() {
  emit("close");
}
</script>

<template>
  <div
    ref="modalRef"
    :style="{ top: position.y + 'px', left: position.x + 'px', cursor: isDragging ? 'grabbing' : 'grab' }"
    class="callModal"
    @mousedown.self="startDrag"
    @touchstart.self="startDrag"
  >
    <div class="modal-header">Входящий звонок</div>
    <userAvatar class="avatar" type="voice" :speak="false" :img-url="avatar" :user-name="chatName" />
    <div class="username">{{ chatName }}</div>
    <div class="button">
      <button @click="accept" class="accept"><iconCall /></button>
      <button @click="reject" class="reject"><iconCallReject /></button>
    </div>
  </div>
</template>

<style scoped>
.callModal {
  width: 250px;
  background-color: var(--с-DeepBlueBlack-darker);
  border-radius: 10px;
  position: absolute;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
  padding: 30px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 1050;
  user-select: none;
}
.modal-header {
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}
.username {
  font-weight: 600;
  color: white;
  text-align: center;
  word-break: break-word;
}
.avatar {
  width: 80px;
  height: 80px;
  margin: 15px 0px;
}
.button {
  display: flex;
  margin-top: 25px;
  justify-content: space-around;
  width: 100%;
}
.button button {
  background-color: var(--c-CTA_red);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}
.button button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}
.button button.accept {
  background-color: var(--c-TurquoiseBlue-darker);
}
.button button svg {
  width: 24px;
  height: auto;
}
</style>
