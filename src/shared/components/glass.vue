<script setup lang="ts"></script>

<template>
  <div class="glass">
    <div class="content"><slot></slot></div>
    <svg width="0" height="0">
      <filter id="blackGlass">
        <!-- Размытие фона -->
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.1" result="blur" />

        <!-- Шум для преломления -->
        <feTurbulence type="turbulence" baseFrequency="0.005" numOctaves="10" seed="0" result="noise" />

        <!-- Преломление -->
        <feDisplacementMap
          in="blur"
          in2="noise"
          scale="30"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />

        <!-- Затемнение -->
        <feColorMatrix
          in="displaced"
          type="matrix"
          values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 1 0
        "
        />
      </filter>
    </svg>
  </div>
</template>

<style scoped>
.glass {
  backdrop-filter: url(#blackGlass);
  -webkit-backdrop-filter: url(#blackGlass);

  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1);
}
</style>
