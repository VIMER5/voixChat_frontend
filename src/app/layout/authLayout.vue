<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from "vue";
import glass from "@/shared/components/glass.vue";
import iconUsers from "@icons/iconUsers.vue";
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
    <div class="daw border">
      da<RouterView />
      <svg width="56" height="41" viewBox="0 0 56 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M33.3887 0C36.0186 0 38.1589 2.2993 38.1592 5.125V13.1211C38.221 13.0618 51.7412 0.109634 54.2705 2.61426C56.8049 5.12628 56.3354 36.8184 54.2705 38.3857C52.2117 39.9432 38.2517 27.9594 38.1592 27.8799V35.875C38.1591 38.7008 36.0187 41 33.3887 41H4.76953C2.13956 40.9999 0.000106409 38.7008 0 35.875V5.125C0.000246455 2.29935 2.13964 8.14122e-05 4.76953 0H33.3887ZM20.2637 9.25781C13.9978 9.25789 8.9181 14.2113 8.91797 20.3213C8.91853 26.4309 13.9981 31.3837 20.2637 31.3838C26.5292 31.3837 31.6088 26.4309 31.6094 20.3213C31.6092 14.2114 26.5295 9.25792 20.2637 9.25781Z"
          fill="#72767D"
          fill-opacity="0.45"
        />
      </svg>
    </div>
    <div class="sf pl-[20%] box-content">
      <!-- <div class="w-[44%] aspect-square rounded-full blur-[73px] my-auto bg-Ocean-Teal-53 p-6"></div> -->
      <!-- <div class="glass">dadawd</div> -->
      <div class="my-auto relative">
        <glass class="absolute py-[43px] px-[38px] rounded-[26px]" @mousedown="startDrag" :style="boxStyle"
          ><iconUsers
        /></glass>
        <glass class="absolute py-[43px] px-[38px] rounded-[26px]" @mousedown="startDrag"><iconUsers /></glass>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
