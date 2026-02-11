<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const textarea = ref(null);
const text = ref("");

const adjustHeight = () => {
  const el: any = textarea.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

function checkNewLines(event: any) {
  emit("send", text.value);
  text.value = "";
  const el: any = textarea.value;
  if (!el) return;
  el.style.height = "auto";
}
const emit = defineEmits<{
  (e: "send", content: string): void;
}>();
onMounted(adjustHeight);
</script>

<template>
  <div class="container">
    <textarea
      ref="textarea"
      @keydown.enter.shift="adjustHeight"
      @keydown.enter.exact.prevent="checkNewLines"
      v-model="text"
      placeholder="Введите текст..."
      rows="1"
      @input="adjustHeight"
      spellcheck="true"
      wrap="hard"
    ></textarea>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--с-DeepBlueBlack-darker);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
textarea {
  width: 100%;
  padding: 15px;
  font-size: 15px;
  min-height: calc(1em + 30px);
  max-height: calc(1em * 10 + 30px);
  resize: none;
  overflow-y: unset;
  box-sizing: border-box;
  transition: all 0.5s;
  outline: none;
  scrollbar-width: none;
}
</style>
