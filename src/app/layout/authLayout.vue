<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from "vue";
import glass from "@/shared/components/glass.vue";
import iconUsers from "@icons/iconUsers.vue";
import iconDesktop from "@/shared/icon/iconDesktop.vue";
import iconMobile from "@/shared/icon/iconMobile.vue";
import logo from "@/shared/icon/logo.vue";
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
  <div class="max-w-360 m-auto h-full grid grid-cols-2">
    <div class="daw border flex items-end flex-col justify-center">
      <div class="content w-[72.36%] mr-[10%]">
        <div class="form__panel bg-BlueGray-Dark rounded-[19px] p-8.75 relative flex flex-col items-center">
          <div class="mx-auto absolute top-[calc(0px-48px)] w-[37.55%]">
            <logo class="w-full" />
          </div>
          <RouterView class="mt-[19%] w-full" />
        </div>
      </div>
    </div>
    <div class="sf box-content flex items-center justify-center">
      <!-- <div class="w-[44%] aspect-square rounded-full blur-[73px] my-auto bg-Ocean-Teal-53 p-6"></div> -->
      <!-- <div class="glass">dadawd</div> -->
      <div class="relative w-[35%] aspect-square">
        <div class="d w-full h-full absolute z-10">
          <div class="w-full aspect-square rounded-full blur-[73px] my-auto bg-Ocean-Teal-53"></div>
        </div>
        <div class="c w-full h-full absolute z-10 flex items-center justify-center">
          <glass class="test1 py-[32px] px-[41px] rounded-[26px] w-max absolute"><iconMobile /></glass>
          <glass class="test2 py-[43px] px-[38px] rounded-[26px] w-max absolute z-10"><iconUsers /></glass>
          <glass class="test py-[35px] px-[32px] rounded-[26px] w-max absolute"><iconDesktop /></glass>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
