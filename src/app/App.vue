<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import emailConfirmedModal from "@modalWindows/emailConfirmedModal.vue";
import { useUsersInfo } from "./stores/usersInfo";
import { watch, ref } from "vue";
import { useCallModalStore } from "./stores/callModalStorel";
import callModal from "@modalWindows/callModal.vue";

const userStore = useUsersInfo();
const callModalStore = useCallModalStore();
const openEmailConfirmedModal = ref<boolean>(false);
watch(
  () => userStore.userInfoCurrent?.emailConfirmed,
  (isConfirmed) => {
    if (isConfirmed === undefined) return;
    if (!isConfirmed) return (openEmailConfirmedModal.value = true);
    openEmailConfirmedModal.value = false;
  },
);
const ff = {
  avatar: "http://192.168.1.230:3000/image/c841cd87cd04e839/thumb",
  userName: "dd",
};
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <emailConfirmedModal
      :email="userStore.userInfoCurrent?.email ? userStore.userInfoCurrent?.email : ''"
      v-if="openEmailConfirmedModal"
    />
  </Teleport>

  <Teleport to="body">
    <TransitionGroup name="modal-stack-call">
      <div
        v-for="(modal, index) in callModalStore.modals"
        :key="modal.id"
        class="modal-wrapper"
        :style="{ zIndex: 1000 + index }"
      >
        <callModal v-bind="modal.props" @close="callModalStore.closeModal(modal.id)" />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped></style>
