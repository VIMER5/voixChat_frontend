import { defineStore } from "pinia";
import { ref } from "vue";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/app/stores/authStore";
import { useUsersInfo } from "@/app/stores/usersInfo";
import { useFriendStore } from "@/app/stores/friendStore";
import { useChatsStore } from "@/app/stores/chatsStore";
import { useRtcStore } from "./rtcStore";
import { onlineDataSchema } from "@/app/validators/socketValidator";
import { useOnlineStore } from "@/app/stores/onlineStore";

interface FriendStatus {
  userID: number;
  status: "online" | "offline";
}

export const useSocketStore = defineStore("SocketStore", () => {
  const notificationSound = ref<HTMLAudioElement | null>(null);

  // playSound();
  const variants = {
    notificationSound1: "/sounds/notification.mp3",
  };
  function playSound(audio: keyof typeof variants) {
    notificationSound.value = new Audio(variants[audio]);
    if (notificationSound.value) {
      notificationSound.value.currentTime = 0;
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
    //--------------------[systeam]------------------------
    socket.value.on("emailConfirmed", (data) => {
      const user = useUsersInfo();
      if (user.userInfoCurrent) user.userInfoCurrent.emailConfirmed = data.body;
    });
    //-------------------[friend]--------------------------
    socket.value.on("friendRequest", (data) => {
      console.log(data);
      const friendStore = useFriendStore();
      friendStore.getfriendsRequest();
      playSound("notificationSound1");
    });
    //--------------[MSG]---------------------------
    socket.value.on("newMessage", (data) => {
      const chatStore = useChatsStore();
      console.log(data);
      chatStore.addNewMessage(data.chatId, data.body);
    });
    //--------------------[RTC]------------------------
    socket.value.on("offer-call", async (data) => {
      const RtcStore = useRtcStore();
      await RtcStore.offerCall(data);
    });
    socket.value.on("answer-made", async (data) => {
      const RtcStore = useRtcStore();
      await RtcStore.answerMade(data);
    });
    socket.value.on("ice-candidate", async (data) => {
      const RtcStore = useRtcStore();
      await RtcStore.iceCandidate(data);
    });
    //----------------------[online]-------------------
    socket.value.on("friend-online", async (data) => {
      const onlineStore = useOnlineStore();

      const { error, value } = onlineDataSchema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
      });
      if (error) return console.log(error);
      await onlineStore.setStatus(value);
    });
    socket.value.on("friends-statuses", (statuses: FriendStatus[]) => {
      const onlineStore = useOnlineStore();
      statuses.forEach(({ userID, status }) => {
        onlineStore.setStatus({ userID, status });
      });
    });
    socket.value.on("friend-offline", async (data) => {
      const onlineStore = useOnlineStore();
      const { error, value } = onlineDataSchema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
      });
      if (error) return console.log(error);
      await onlineStore.setStatus(value);
      console.log(value);
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
