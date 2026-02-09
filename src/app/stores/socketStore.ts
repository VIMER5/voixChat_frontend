import { defineStore } from "pinia";
import { ref } from "vue";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/app/stores/authStore";
import { useUsersInfo } from "@/app/stores/usersInfo";
import { useFriendStore } from "@/app/stores/friendStore";
import { useChatsStore } from "@/app/stores/chatsStore";
export const useSocketStore = defineStore("SocketStore", () => {
  const notificationSound = ref<HTMLAudioElement | null>(null);

  // playSound();
  const variants = {
    notificationSound1: "/sounds/notification.mp3",
  };
  function playSound(audio: keyof typeof variants) {
    notificationSound.value = new Audio(variants[audio]);
    if (notificationSound.value) {
      notificationSound.value.currentTime = 0; // Перемотка в начало
      notificationSound.value.play().catch((e) => {
        console.log("Автовоспроизведение заблокировано:", e);
      });
    }
  }

  const socket = ref<Socket | null>(null);
  const isConnected = ref(false);
  const error = ref<string | null>(null);
  function initSocket(token: string) {
    if (socket.value?.connected) return;
    socket.value = io("http://localhost:3030", {
      auth: { token },
    });
    socket.value.on("error", async (err) => {
      if (err === "Unauthorized") {
        console.log(err);
        await handleRefresh();
      }
    });
    socket.value.on("connect", () => {
      isConnected.value = true;
      error.value = null;
      console.log("Socket connected");
    });

    socket.value.on("emailConfirmed", (data) => {
      const user = useUsersInfo();
      if (user.userInfoCurrent) user.userInfoCurrent.emailConfirmed = data.body;
    });
    socket.value.on("friendRequest", (data) => {
      console.log(data);
      const friendStore = useFriendStore();
      friendStore.getfriendsRequest();
      playSound("notificationSound1");
    });
    socket.value.on("newMessage", (data) => {
      const chatStore = useChatsStore();
      console.log(data);
      chatStore.addNewMessage(data.chatId, data.body);
    });

    socket.value.on("disconnect", () => {
      isConnected.value = false;
    });
  }
  async function handleRefresh() {
    const authStore = useAuthStore();
    try {
      const newToken = await authStore.tokenUpdateByRefreshToken();
      if (newToken && socket.value) {
        if (typeof socket.value.auth === "object") {
          (socket.value.auth as Record<string, any>).token = sessionStorage.getItem("access");
        }
        socket.value.connect();
      }
    } catch (e) {
      console.error(e);
    }
  }
  function emit(event: string, data: any) {
    if (socket.value) {
      socket.value.emit(event, data);
    }
  }
  function disconnect() {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  }
  return { initSocket, emit, disconnect, socket, isConnected, error };
});
