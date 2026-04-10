import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUsersInfo } from "@/app/stores/usersInfo";
import { useSocketStore } from "@/app/stores/socketStore";
import { useFriendStore } from "@/app/stores/friendStore";
import { useChatsStore } from "@/app/stores/chatsStore";
import { useVoiceStore } from "../stores/voiceStore";

export const useAppStore = defineStore("AppStore", () => {
  const appReady = ref<boolean>(false);
  async function initApp() {
    appReady.value = false;
    const socketStore = useSocketStore();
    const store = useUsersInfo();
    const storeFriend = useFriendStore();
    const storeChats = useChatsStore();
    const voiceStore = useVoiceStore();
    await Promise.all([
      store.getCurrentUserInfo(),
      storeChats.getMyChats(),
      storeFriend.getfriendsRequest(),
      storeFriend.getFriend(),
      voiceStore.getVoicesInfo(),
    ]);
    socketStore.initSocket(sessionStorage.getItem("access")!);
    appReady.value = true;
  }
  return { initApp, appReady };
});
