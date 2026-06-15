import { shallowRef, ref, computed } from "vue";
import { Room, RoomEvent, Track, LocalAudioTrack, type TrackPublication, ConnectionState } from "livekit-client";
import { defineStore } from "pinia";
import type { VoicesChannelsInfo } from "@/app/model/voicesChannelsInfoModel";
import $api from "../API/axios";

const { VITE_WSS_URL_SFU } = import.meta.env;

export const useVoiceStore = defineStore("VoiceStore", () => {
  const isCameraOn = ref(false);
  const isMicOn = ref(false);
  const isScreenShareOn = ref(false);
  const voicesChannelsInfo = ref<Map<string, VoicesChannelsInfo>>(new Map<string, VoicesChannelsInfo>());

  const currentVoice = computed(() => (id: string) => {
    return voicesChannelsInfo.value.get(id) || null;
  });

  async function getVoicesInfo() {
    try {
      const data = await $api.get("/voice/info");
      if (data) {
        for (const item of data.data) {
          voicesChannelsInfo.value.set(item.id, item);
        }
      }
    } catch (err) {
      console.error("Ошибка при получении инфо о голосе:", err);
    }
  }

  async function disconnectedUserInVoice(id: string, UserID: number) {
    const temp = voicesChannelsInfo.value.get(id);
    if (temp) {
      temp.members = temp.members.filter((item) => item.id != UserID);
    }
  }

  async function connectedUserInVoice(id: string, UserInfo: any) {
    const temp = voicesChannelsInfo.value.get(id);
    if (temp) {
      temp.members = temp.members.filter((item) => item.id != UserInfo.id);
      temp.members.push(UserInfo);
    } else {
      try {
        const data = await $api.post("/voice/info", {
          chatID: id,
        });
        if (data && data.data) {
          voicesChannelsInfo.value.set(data.data.id, data.data);
        }
      } catch (err) {
        console.error("Ошибка при создании инфо о голосе:", err);
      }
    }
  }

  const room = shallowRef(
    new Room({
      adaptiveStream: true,
      dynacast: true,
    }),
  );

  const roomState = ref<ConnectionState>(ConnectionState.Disconnected);

  const updateState = () => {
    roomState.value = room.value.state;
  };

  async function toggleCamera() {
    if (room.value.state !== ConnectionState.Connected) return;
    try {
      const newState = !isCameraOn.value;
      await room.value.localParticipant.setCameraEnabled(newState);
      isCameraOn.value = newState;
    } catch (err) {
      console.error("Ошибка при переключении камеры:", err);
    }
  }

  async function toggleScreenShare() {
    if (room.value.state !== ConnectionState.Connected) return;
    try {
      const newState = !isScreenShareOn.value;
      await room.value.localParticipant.setScreenShareEnabled(newState);
      isScreenShareOn.value = newState;
    } catch (err) {
      console.error("Ошибка при переключении демонстрации экрана:", err);
      // Если пользователь отменил выбор окна, состояние должно остаться прежним
      isScreenShareOn.value = room.value.localParticipant.isScreenShareEnabled;
    }
  }

  async function toggleMicrophone() {
    if (room.value.state !== ConnectionState.Connected) return;
    try {
      const newState = !isMicOn.value;
      await room.value.localParticipant.setMicrophoneEnabled(newState, {
        noiseSuppression: true,
        echoCancellation: true,
        autoGainControl: false,
      });
      isMicOn.value = newState;
    } catch (err) {
      console.error("Ошибка при переключении микрофона:", err);
    }
  }

  async function connect(token: string) {
    if (room.value.state === ConnectionState.Connected) return;

    try {
      await room.value.connect(VITE_WSS_URL_SFU, token);
      updateState();

      if (isCameraOn.value) await room.value.localParticipant.setCameraEnabled(true);
      if (isMicOn.value) await room.value.localParticipant.setMicrophoneEnabled(true);

      room.value.on(RoomEvent.Connected, updateState);
      room.value.on(RoomEvent.Disconnected, updateState);
      room.value.on(RoomEvent.Reconnecting, updateState);
      room.value.on(RoomEvent.Reconnected, updateState);
    } catch (err) {
      console.error("Ошибка при подключении к комнате:", err);
      updateState();
      throw err;
    }
  }

  async function disconnect() {
    if (room.value) {
      room.value.removeAllListeners();
      await room.value.disconnect();
      // Вместо создания нового объекта Room, просто очищаем текущий?
      // LiveKit рекомендует новый объект, но нам нужно сохранить реактивность и слушателей в компонентах.
      // Поэтому мы заменяем room.value, но компоненты должны это учитывать.
      room.value = new Room({ adaptiveStream: true, dynacast: true });
    }
    isCameraOn.value = false;
    isMicOn.value = false;
    isScreenShareOn.value = false;
    updateState();
  }

  async function handleJoin(chatID: string) {
    try {
      console.log("Joining chat:", chatID);
      await disconnect();
      const res = await $api.post("/sfu/live-token", {
        roomName: chatID,
      });

      if (res.data?.token) {
        await connect(res.data.token);
      }
    } catch (err) {
      console.error("Ошибка при входе в комнату:", err);
    }
  }

  return {
    room,
    roomState,
    voicesChannelsInfo,
    currentVoice,
    isMicOn,
    isCameraOn,
    isScreenShareOn,
    connect,
    disconnect,
    toggleCamera,
    toggleScreenShare,
    toggleMicrophone,
    getVoicesInfo,
    disconnectedUserInVoice,
    connectedUserInVoice,
    handleJoin,
  };
});
