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
import { useVoiceStore } from "./voiceStore";
import { useCallModalStore } from "./callModalStorel";

const { VITE_BASE_URL_SOCKET } = import.meta.env;

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
  const isReady = ref(false);
  const error = ref<string | null>(null);
  function initSocket(token: string) {
    if (socket.value?.connected) return;
    socket.value = io(VITE_BASE_URL_SOCKET, {
      auth: { token },
    });
    socket.value.on("error", async (err) => {
      error.value = err;
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
    socket.value.on("socketReady", (data) => {
      if (data.status == "ready") isReady.value = true;
      else isReady.value = false;
    });

    //--------------------[system]------------------------
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
    // ------------------[Voice]-----------------------
    socket.value.on("disconnectedUserInVoice", async (data) => {
      const voiceStore = useVoiceStore();
      voiceStore.disconnectedUserInVoice(data.body.id, data.body.userID);
    });
    socket.value.on("connectedUserInVoice", async (data) => {
      const voiceStore = useVoiceStore();
      await voiceStore.connectedUserInVoice(data.body.id, data.body.userInfo);
    });
    socket.value.on("newCallVoice", async (data) => {
      const CallModalStore = useCallModalStore();
      CallModalStore.openModal({
        avatar: data.body.avatar,
        chatName: data.body.chatName,
        chatID: data.body.chatID,
      });
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
      onlineStore.setStatus(value);
      console.log(value);
    });
    socket.value.on("disconnect", () => {
      isConnected.value = false;
      isReady.value = false;
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
  return { initSocket, emit, disconnect, isReady, socket, isConnected, error };
});
