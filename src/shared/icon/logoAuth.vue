<script setup lang="ts">
import { defineProps } from "vue";

const { color = "#fff" } = defineProps<{
  color?: string;
}>();
</script>

<template>
  <svg viewBox="0 0 204 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M28.9264 53.5785L65.3938 6.2987L190.871 28.9208L141.077 76.8465L114.181 71.9974L118.968 95.215L130.285 97.2554L86.2108 141.64L49.3945 134.494L21.2993 157.88L8.01235 124.493L35.9454 82.2793L28.9264 53.5785ZM96.8056 18.0586L68.2657 12.9132L37.8238 52.1343L106.221 64.4655L96.8056 18.0586ZM178.489 32.7852L103.202 19.2119L102.71 19.1232L112.618 65.6188L139.19 70.4094L178.489 32.7852ZM112.571 94.0617L107.617 70.8139L36.2672 57.9503L41.713 81.2869L112.571 94.0617ZM83.8309 135.114L117.903 101.12L43.1088 87.6352L50.8624 129.17L83.8309 135.114ZM16.4177 122.96L37.4784 90.6846L44.4655 128.017L16.4177 122.96ZM23.5657 148.128L16.3373 129.042L41.4327 133.567L23.5657 148.128Z"
      fill="#37A5B3"
    />
    <g filter="url(#filter0_d_376_686)">
      <path
        d="M11.8116 123.146L22.7672 152.556L47.8697 131.679L84.7747 138.332L123.848 99.1433L116.467 97.8126L110.117 68.2164L140.133 73.628L184.434 30.8087L171.64 28.5022"
        stroke="#37A5B3"
        stroke-width="6"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_376_686"
        x="0"
        y="17.5498"
        width="203.729"
        height="154.018"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_376_686" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_376_686" result="shape" />
      </filter>
    </defs>
  </svg>
</template>

<style scoped></style>
