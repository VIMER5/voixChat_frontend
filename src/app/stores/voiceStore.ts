import { shallowRef, ref, computed } from "vue";
import { Room, RoomEvent, Track, LocalAudioTrack, type TrackPublication } from "livekit-client";
import { defineStore } from "pinia";

const { VITE_WSS_URL_SFU } = import.meta.env;

export const useVoiceStore = defineStore("VoiceStore", () => {
  const isCameraOn = ref(false);
  const isMicOn = ref(false);
  async function toggleCamera() {
    isCameraOn.value = !isCameraOn.value;
    await room.value.localParticipant.setCameraEnabled(isCameraOn.value);
  }

  async function toggleMicrophone() {
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

  function disconnect() {
    if (room.value) {
      room.value.disconnect();
      room.value = new Room({ adaptiveStream: true, dynacast: true });
    }
    updateState();
  }

  return { room, roomState, connect, disconnect, toggleCamera, toggleMicrophone };
});
