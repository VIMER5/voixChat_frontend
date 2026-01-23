<script setup lang="ts">
import { defineProps, defineModel } from "vue";

const {
  error = false,
  placeholder = "NN",
  type = "text",
} = defineProps<{
  placeholder?: string;
  error?: boolean;
  type?: "text" | "password";
}>();
const model = defineModel();
</script>

<template>
  <div
    class="formInput bg-DeepBlueBlack-darker rounded-lg p-3.5 flex items-center gap-[11px]"
    :class="{ error_border: error }"
  >
    <div class="icon w-4.75 aspect-square flex items-center">
      <slot></slot>
    </div>
    <input
      v-model="model"
      :type="type"
      class="text-[1rem] w-full text-[#4C4C52] placeholder-[#4C4C52]"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-background-clip: text;
  -webkit-text-fill-color: #4c4c52;
  background-color: transparent !important;
  font-family: "whitney" !important;
  font-weight: 400 !important;
  font-size: inherit !important;
}
.error_border {
  border: 1px solid var(--c-CTA_red);
}
</style>
