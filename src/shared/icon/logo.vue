<script setup lang="ts">
import { defineProps } from "vue";

const { color = "#fff" } = defineProps<{
  color?: string;
}>();
</script>

<template>
  <svg class="h-auto" viewBox="0 0 185 179" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_370_689)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17 61L44.5 8H172L131.5 64H104.17L113 86H124.5L89 137.5L51.5 137L28 165L9 134.5L29 88L17 61ZM77.5 14H48.5L25.5 58H95L77.5 14ZM160.5 14H84H83.5L101.5 58H128.5L160.5 14ZM106.5 86L97.5 64H25L34.5 86H106.5ZM85.5 131.5L113 92H37L52 131.5H85.5ZM17 131.5L32 96L45.5 131.5H17ZM28.5 155L18 137.5H43.5L28.5 155Z"
        fill="#37A5B3"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_370_689"
        x="0"
        y="0"
        width="185"
        height="179"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="3" />
        <feGaussianBlur stdDeviation="5.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.647059 0 0 0 0 0.701961 0 0 0 0.6 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_370_689" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_370_689" result="shape" />
      </filter>
    </defs>
  </svg>
</template>

<style scoped></style>
