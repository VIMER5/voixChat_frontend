import { shallowRef, ref, computed } from "vue";
import { Room, RoomEvent, Track, LocalAudioTrack, type TrackPublication } from "livekit-client";
import { defineStore } from "pinia";
import type { VoicesChannelsInfo } from "@/app/model/voicesChannelsInfoModel";
import $api from "../API/axios";

const { VITE_WSS_URL_SFU } = import.meta.env;

export const useVoiceStore = defineStore("VoiceStore", () => {
  const isCameraOn = ref(false);
  const isMicOn = ref(false);
  const voicesChannelsInfo = ref<Map<string, VoicesChannelsInfo>>(new Map<string, VoicesChannelsInfo>());
  const currentVoice = computed(() => (id: string) => {
    return voicesChannelsInfo.value.get(id) || null;
  });
  async function getVoicesInfo() {
    const data = await $api.get("/voice/info");
    if (data) {
      for (const item of data.data) {
        voicesChannelsInfo.value.set(item.id, item);
      }
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
    }
  }
  async function toggleCamera() {
    isCameraOn.value = !isCameraOn.value;
    await room.value.localParticipant.setCameraEnabled(isCameraOn.value);
  }

  async function toggleMicrophone() {
    if (room.value.state !== "connected") return;
    isMicOn.value = !isMicOn.value;
    await room.value.localParticipant.setMicrophoneEnabled(isMicOn.value, {
      noiseSuppression: true,
      echoCancellation: true,
      autoGainControl: false,
    });

    // {
    //   echoCancellation: true, // Эхоподавление
    //   noiseSuppression: true, // Шумоподавление (стандартное)
    //   autoGainControl: true, // Автоусиление громкости
    // }
  }
  const room = shallowRef(
    new Room({
      adaptiveStream: true,
      dynacast: true,
    }),
  );
  const roomState = ref(room.value.state);
  const updateState = () => {
    roomState.value = room.value.state;
  };

  async function connect(token: string) {
    if (room.value.state === "connected") return;

    await room.value.connect(VITE_WSS_URL_SFU, token);
    await room.value.localParticipant.setCameraEnabled(isCameraOn.value);
    await room.value.localParticipant.setMicrophoneEnabled(isMicOn.value);
    updateState();
  }

  async function disconnect() {
    if (room.value) {
      await room.value.disconnect();
      room.value = new Room({ adaptiveStream: true, dynacast: true });
    }
    updateState();
  }

  //----------------
  const onTrackSubscribed = (track: any, publication: any, participant: any) => {
    if (track.kind === "video") {
      const element = track.attach();
      element.setAttribute("data-participant", participant.identity);

      element.style.width = "100%";
      // remoteVideos.value?.appendChild(element);
    } else if (track.kind === "audio") {
      const audioElement = track.attach();
      document.body.appendChild(audioElement);
    }
  };

  async function handleJoin(chatID: string = "318343e4-03f4-11f1-9289-bc24110cce17") {
    try {
      console.log(chatID);
      await disconnect();
      const res = await $api.post("/sfu/live-token", {
        roomName: chatID,
      });

      if (res.data?.token) {
        room.value.off(RoomEvent.TrackSubscribed, onTrackSubscribed);

        room.value.on(RoomEvent.TrackSubscribed, onTrackSubscribed);
        // room.value.on(RoomEvent.ParticipantConnected, (d) => {
        //   const f = ChatsStore.chatById(d.name!);
        //   console.log(
        //     f!.chatMembers.filter((g) => {
        //       return g.id == Number(d.identity.split("_")[1]);
        //     }),
        //   );
        // });
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
    connect,
    disconnect,
    toggleCamera,
    toggleMicrophone,
    getVoicesInfo,
    disconnectedUserInVoice,
    connectedUserInVoice,
    handleJoin,
  };
});
