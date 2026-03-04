import { ref, computed } from "vue";
import { useSocketStore } from "./socketStore";
import { defineStore } from "pinia";
const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
export const useRtcStore = defineStore("rtcStore", () => {
  const SocketStore = useSocketStore();
  const socket = SocketStore.socket;
  const remoteAudio = ref<HTMLAudioElement | null>(null);
  const status = ref("Ожидание...");

  const peerConnection = ref<RTCPeerConnection | null>(null);
  let localStream: MediaStream | null = null;

  async function setupPeerConnection(stream: MediaStream, roomId: string) {
    peerConnection.value = new RTCPeerConnection(config);
    localStream = stream;

    // Добавляем треки микрофона
    stream.getTracks().forEach((track) => {
      peerConnection.value?.addTrack(track, stream);
    });

    peerConnection.value.ontrack = (event) => {
      console.log("Получен удаленный поток");
      if (remoteAudio.value && event.streams[0]) {
        remoteAudio.value.srcObject = event.streams[0];
        status.value = "Связь установлена!";
      }
    };

    peerConnection.value.onicecandidate = (event) => {
      if (event.candidate) {
        SocketStore.emit("ice-candidate", {
          candidate: event.candidate,
          to: roomId,
        });
      }
    };
  }

  async function startCall(roomId: string) {
    status.value = "Запрос доступа к микрофону...";
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    await setupPeerConnection(stream, roomId);

    const offer = await peerConnection.value!.createOffer();
    await peerConnection.value!.setLocalDescription(offer);

    SocketStore.emit("call-user", { sdp: offer, to: roomId });
  }

  async function offerCall(data: any) {
    status.value = "Входящий вызов...";
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    await setupPeerConnection(stream, data.chatID);

    await peerConnection.value!.setRemoteDescription(new RTCSessionDescription(data.sdp));
    const answer = await peerConnection.value!.createAnswer();
    await peerConnection.value!.setLocalDescription(answer);

    SocketStore.emit("offer-answer", { sdp: answer, to: data.from });
  }

  async function answerMade(data: any) {
    if (peerConnection.value) {
      await peerConnection.value.setRemoteDescription(new RTCSessionDescription(data.sdp));
    }
  }

  async function iceCandidate(data: any) {
    try {
      if (peerConnection.value && data.candidate) {
        await peerConnection.value.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    } catch (e) {
      console.error("Ошибка ICE:", e);
    }
  }

  // Добавим метод сброса для порядка
  function endCall() {
    peerConnection.value?.close();
    peerConnection.value = null;
    localStream?.getTracks().forEach((t) => t.stop());
    status.value = "Звонок завершен";
  }

  return { remoteAudio, status, startCall, offerCall, answerMade, iceCandidate, endCall };
});
