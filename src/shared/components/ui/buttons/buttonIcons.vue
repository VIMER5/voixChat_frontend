<script setup lang="ts">
const { cursor = "pointer" } = defineProps<{
  cursor?: "pointer" | "not-allowed";
}>();
</script>

<template>
  <div class="max-w-25 min-w-1 aspect-square flex items-center justify-center">
    <button :style="{ cursor: cursor }" class="w-full h-full p-[10%] hover:bg-DarkSteelGray rounded-[10%]">
      <slot></slot>
    </button>
  </div>
</template>
