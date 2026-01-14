<script setup lang="ts">
import { defineProps, defineModel } from "vue";
import iconMail from "../icon/iconMail.vue";

const { error = false, placeholder = "NN" } = defineProps<{
  placeholder?: string;
  error?: boolean;
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
      type="text"
      class="text-[1rem] w-full text-[#4C4C52] placeholder-[#4C4C52]"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
.error_border {
  border: 1px solid var(--c-CTA_red);
}
</style>
