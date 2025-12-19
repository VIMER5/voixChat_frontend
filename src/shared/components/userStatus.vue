<script setup lang="ts">
import { type TypeStatusProps } from "@model/userStatusModel";
defineProps<{
  status: TypeStatusProps;
}>();
</script>

<template>
  <div class="w-[33.3%] aspect-square rounded-full bg-Graphite-anthracite flex justify-center items-center">
    <div
      :class="{ 'bg-TurquoiseBlue-main': status == 'online', 'bg-BlueGray-Dark': status == 'offline' }"
      class="w-[61%] aspect-square rounded-full"
    />
  </div>
</template>

<style scoped></style>
