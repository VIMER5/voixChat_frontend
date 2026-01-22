<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from "vue";
import glass from "@/shared/components/ui/glass.vue";
import iconUsers from "@icons/iconUsers.vue";
import iconDesktop from "@/shared/icon/iconDesktop.vue";
import iconMobile from "@/shared/icon/iconMobile.vue";
import logoAuth from "@/shared/icon/logoAuth.vue";
function startDrag(data: any) {
  isDragging.value = true;
}
const position = ref({
  x: 0,
  y: 0,
});
const isDragging = ref(false);
const boxStyle = computed(() => {
  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
  };
});

function onDrag(event: any) {
  if (!isDragging.value) return;

  position.value = {
    x: event.clientX,
    y: event.clientY,
  };
}
const stopDrag = () => {
  isDragging.value = false;
};
onMounted(() => {
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
});
</script>

<template>
  <div
    class="md:max-w-4xl lg:max-w-6xl xl:max-w-7xl m-auto h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-8"
  >
    <div class="daw flex md:items-center items-end justify-center md:justify-end py-8 md:py-0">
      <div class="content w-full max-w-[400px] md:w-[83.36%] md:mr-[10%] lg:max-w-[480px]">
        <div
          class="form__panel bg-BlueGray-Dark rounded-[19px] p-6 sm:p-8 lg:p-8.75 relative flex flex-col items-center shadow-lg md:shadow-xl"
        >
          <div class="mx-auto absolute top-[-48px] sm:top-[-56px] w-[120px] sm:w-[160px] md:w-[37.55%] max-w-[180px]">
            <logoAuth class="w-full" />
          </div>
          <RouterView class="mt-16 sm:mt-20 md:mt-[19%] w-full px-2 sm:px-0" />
        </div>
      </div>
    </div>

    <div
      class="sf box-content flex items-center justify-center md:justify-start md:ml-[20%] py-8 md:py-0 order-first md:order-last"
    >
      <div class="relative w-full max-w-[280px] sm:max-w-[320px] md:w-[35%] lg:w-[40%] aspect-square">
        <div class="d w-full h-full absolute z-10 flex items-center justify-center">
          <div
            class="w-[80%] sm:w-full aspect-square rounded-full blur-[40px] sm:blur-[53px] md:blur-[73px] bg-Ocean-Teal-53 opacity-70 md:opacity-100"
          ></div>
        </div>

        <div class="c w-full h-full absolute z-20 flex items-center justify-center">
          <glass
            class="test1 py-4 px-5 sm:py-[32px] sm:px-[41px] rounded-2xl sm:rounded-[26px] w-max absolute scale-75 sm:scale-90 md:scale-100"
          >
            <iconMobile class="w-8 h-8 sm:w-10 sm:h-10" />
          </glass>

          <glass
            class="test2 py-5 px-4 sm:py-[43px] sm:px-[38px] sm:rounded-[26px] w-max absolute z-10 scale-90 sm:scale-100"
          >
            <iconUsers class="w-10 sm:w-14" />
          </glass>

          <glass
            class="test py-4 px-3 sm:py-[35px] sm:px-[32px] rounded-2xl sm:rounded-[26px] w-max absolute scale-80 sm:scale-95 md:scale-100"
          >
            <iconDesktop class="w-8 h-8 sm:w-10 sm:h-10" />
          </glass>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 767px) {
  .form__panel {
    padding-top: 80px !important;
    padding-bottom: 40px !important;
  }
}

@media (max-width: 639px) {
  .form__panel {
    border-radius: 16px !important;
  }

  .d div {
    width: 60% !important;
  }
}
@keyframes circleMotion {
  0% {
    transform: rotate(0deg) translateX(110px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(110px) rotate(-360deg);
  }
}
@keyframes circleMotion2 {
  0% {
    padding: 43px 38px;
  }
  50% {
    padding: 53px 48px;
  }
  100% {
    padding: 43px 38px;
  }
}
@keyframes circleMotion1 {
  0% {
    transform: rotate(0deg) translateX(-110px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(-110px) rotate(-360deg);
  }
}
.test {
  animation: circleMotion 25s linear infinite;
}
.test1 {
  animation: circleMotion1 25s linear infinite;
}
.test2 {
  /* animation: circleMotion2 3s linear infinite; */
}
.glassd {
  position: absolute;
  padding: 60px 80px;
  border-radius: 24px;
  color: white;
  font-size: 24px;

  backdrop-filter: url(#blackGlass);
  -webkit-backdrop-filter: url(#blackGlass);

  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1);
}
</style>
