<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import emailConfirmedModal from "@modalWindows/emailConfirmedModal.vue";
import { useUsersInfo } from "./stores/usersInfo";
import { watch, ref } from "vue";
const userStore = useUsersInfo();
const openEmailConfirmedModal = ref<boolean>(false);
watch(
  () => userStore.userInfoCurrent?.emailConfirmed,
  (isConfirmed) => {
    if (isConfirmed === undefined) return;
    if (!isConfirmed) return (openEmailConfirmedModal.value = true);
    openEmailConfirmedModal.value = false;
  },
);
</script>

<template>
  <RouterView />
  <Teleport to="body"
    ><emailConfirmedModal
      :email="userStore.userInfoCurrent?.email ? userStore.userInfoCurrent?.email : ''"
      v-if="openEmailConfirmedModal"
    />
  </Teleport>
</template>

<style scoped></style>
