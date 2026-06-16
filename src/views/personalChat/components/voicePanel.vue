<script setup lang="ts">
import ResizablePanel from "@/app/service/resizablePanel";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import defaultButton from "@/shared/components/ui/buttons/defaultButton.vue";
import { useVoiceStore } from "@/app/stores/voiceStore";
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import iconCallReject from "@/shared/icon/iconCallReject.vue";
import { RoomEvent, Track, type RemoteParticipant, type Room, type TrackPublication, type Participant, ConnectionState } from "livekit-client";

const props = defineProps<{
  chatID: string;
}>();

const panel = ref<HTMLElement | null>(null);
const remoteVideosContainer = ref<HTMLElement | null>(null);
const resizable: ResizablePanel = new ResizablePanel(panel);
const voiceStor = useVoiceStore();

const voiceInfo = computed(() => voiceStor.currentVoice(props.chatID));
const newHeight = computed(() => resizable.panelHeight.value);

const attachTrack = (track: any, participant: Participant) => {
  if (track.kind === Track.Kind.Video) {
    if (remoteVideosContainer.value?.querySelector(`[data-track="${track.sid}"]`)) {
      return;
    }

    const element = track.attach();
    element.setAttribute("data-participant", participant.identity);
    element.setAttribute("data-track", track.sid || "local-" + track.kind);
    element.className = "video-track";
    
    if (track.source === Track.Source.ScreenShare) {
      element.classList.add("screen-share-track");
    }
    
    remoteVideosContainer.value?.appendChild(element);
  } else if (track.kind === Track.Kind.Audio) {
    // Не прикрепляем локальные аудио треки (чтобы не слышать себя)
    if (participant.identity === voiceStor.room?.localParticipant.identity) {
      return;
    }
    
    if (remoteVideosContainer.value?.querySelector(`audio[data-track="${track.sid}"]`)) return;
    
    const element = track.attach();
    element.setAttribute("data-participant", participant.identity);
    element.setAttribute("data-track", track.sid || "local-" + track.kind);
    element.style.display = "none";
    remoteVideosContainer.value?.appendChild(element);
    
    // Explicitly call play to ensure audio playback isn't suspended
    element.play().catch((e: any) => console.error("Audio play failed:", e));
  }
};

const detachTrack = (track: any) => {
  if (track.kind === Track.Kind.Video) {
    const elements = remoteVideosContainer.value?.querySelectorAll(`[data-track="${track.sid || "local-" + track.kind}"]`);
    elements?.forEach((el) => {
      track.detach(el);
      el.remove();
    });
  } else if (track.kind === Track.Kind.Audio) {
    const elements = remoteVideosContainer.value?.querySelectorAll(`audio[data-track="${track.sid || "local-" + track.kind}"]`);
    elements?.forEach((el) => {
      track.detach(el);
      el.remove();
    });
  }
};

const onTrackSubscribed = (track: any, publication: any, participant: any) => {
  attachTrack(track, participant);
};

const onTrackUnsubscribed = (track: any, publication: any, participant: any) => {
  detachTrack(track);
};

const onLocalTrackPublished = (publication: TrackPublication, participant: Participant) => {
  if (publication.track) {
    attachTrack(publication.track, participant);
  }
};

const onLocalTrackUnpublished = (publication: TrackPublication, participant: Participant) => {
  if (publication.track) {
    detachTrack(publication.track);
  }
};

const setupRoomListeners = (room: Room) => {
  cleanupRoomListeners(room); // На всякий случай
  
  room.on(RoomEvent.TrackSubscribed, onTrackSubscribed);
  room.on(RoomEvent.TrackUnsubscribed, onTrackUnsubscribed);
  room.on(RoomEvent.LocalTrackPublished, onLocalTrackPublished);
  room.on(RoomEvent.LocalTrackUnpublished, onLocalTrackUnpublished);
  
  // Синхронизируем уже существующие треки
  room.remoteParticipants.forEach((participant) => {
    participant.videoTrackPublications.forEach((publication) => {
      if (publication.track && publication.isSubscribed) {
        attachTrack(publication.track, participant);
      }
    });
    participant.audioTrackPublications.forEach((publication) => {
      if (publication.track && publication.isSubscribed) {
        attachTrack(publication.track, participant);
      }
    });
  });
  
  room.localParticipant.videoTrackPublications.forEach((publication) => {
    if (publication.track) {
      attachTrack(publication.track, room.localParticipant);
    }
  });
  room.localParticipant.audioTrackPublications.forEach((publication) => {
    if (publication.track) {
      attachTrack(publication.track, room.localParticipant);
    }
  });
};

const cleanupRoomListeners = (room: Room) => {
  room.off(RoomEvent.TrackSubscribed, onTrackSubscribed);
  room.off(RoomEvent.TrackUnsubscribed, onTrackUnsubscribed);
  room.off(RoomEvent.LocalTrackPublished, onLocalTrackPublished);
  room.off(RoomEvent.LocalTrackUnpublished, onLocalTrackUnpublished);
};

const clearVideos = () => {
  if (remoteVideosContainer.value) {
    remoteVideosContainer.value.innerHTML = '';
  }
};

// Следим за сменой объекта Room в сторе (происходит при disconnect)
watch(() => voiceStor.room, (newRoom, oldRoom) => {
  if (oldRoom) {
    cleanupRoomListeners(oldRoom);
  }
  if (newRoom) {
    clearVideos();
    setupRoomListeners(newRoom);
  }
}, { immediate: true });

onMounted(() => {
  resizable.init();
  if (voiceStor.room) {
    setupRoomListeners(voiceStor.room);
  }
});

onUnmounted(() => {
  resizable.destroy();
  if (voiceStor.room) {
    cleanupRoomListeners(voiceStor.room);
  }
  clearVideos();
});
</script>

<template>
  <div
    v-if="voiceInfo && voiceInfo.members.length > 0"
    class="voicePanel"
    ref="panel"
    :style="{ height: (newHeight !== null ? newHeight : 0) + 'px' }"
  >
    <div class="voicePanel-content">
      <div class="users">
        <ul class="users-ul">
          <li v-for="user in voiceInfo.members" :key="user.id">
            <userAvatar
              class="userAvatarVoicePanel"
              :img-url="user.avatar"
              type="voice"
              :speak="false"
              :user-name="user.userName"
            />
          </li>
        </ul>
      </div>
      <slot></slot>
    </div>
    <div class="remote-videos" ref="remoteVideosContainer">
    </div>
    <div class="voice__channel__management">
      <defaultButton
        @click="voiceStor.handleJoin(chatID)"
        v-if="voiceStor.roomState !== ConnectionState.Connected || voiceStor.room.name !== chatID"
        class="join__voice-button"
      >
        Присоединиться к звонку
      </defaultButton>
      <ul v-else class="voice__channel__management__buttons">
        <li>
          <button
            @click="voiceStor.toggleCamera"
            :class="['management-btn', voiceStor.isCameraOn ? 'bg-green-600' : 'bg-gray-600']"
            title="Камера"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
              v-if="voiceStor.isCameraOn"
            >
              <path
                d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" v-else>
              <path
                d="M1.72 2.22a.75.75 0 011.06 0L15.53 15l2.69 2.69a.75.75 0 11-1.06 1.06l-2.69-2.69-2.69-2.69L1.72 3.28a.75.75 0 010-1.06zM4.5 19.5a3 3 0 01-3-3v-9a3 3 0 01.384-1.454l13.116 13.116V16.5a3 3 0 01-3 3H4.5zM19.94 18.75l-2.69-2.69v-1.121l2.69 2.69c.944.945 2.56.276 2.56-1.06V7.06c0-1.336-1.616-2.005-2.56-1.06l-2.69 2.69V6.31l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06zM15.75 12.31l-3.21-3.21A3 3 0 0115.75 10.5v1.81z"
              />
            </svg>
          </button>
        </li>
        <li>
          <button
            @click="voiceStor.toggleScreenShare"
            :class="['management-btn', voiceStor.isScreenShareOn ? 'bg-green-600' : 'bg-gray-600']"
            title="Демонстрация экрана"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                d="M4.5 3.75a3 3 0 00-3 3v9.75a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zM3.75 6.75a.75.75 0 01.75-.75h15a.75.75 0 01.75.75v9.75a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V6.75zM12 9a.75.75 0 01.75.75v2.54l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06L11.25 12.29V9.75A.75.75 0 0112 9z"
              />
            </svg>
          </button>
        </li>
        <li>
          <button @click="voiceStor.disconnect" class="management-btn bg-CTA_red" title="Отключиться">
            <iconCallReject />
          </button>
        </li>
      </ul>
    </div>
    <div class="resize-handle" @mousedown="resizable.start"></div>
  </div>
</template>

<style scoped>
.voicePanel {
  background-color: var(--c-BlueGray-Dark);
  min-height: 30%;
  max-height: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-block: 15px;
  align-items: center;
}
@media (min-width: 768px) {
  .voicePanel {
    container-type: size;
  }
}

.voicePanel-content {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  cursor: ns-resize;
  background-color: transparent;
}

.voice__channel__management {
  margin-top: auto;
  padding-top: 10px;
}
.join__voice-button {
  padding: 8px 12px 8px 12px !important;
}
.userAvatarVoicePanel {
  width: 60px;
  height: 60px;
}
@media (min-width: 768px) {
  .userAvatarVoicePanel {
    width: 31cqh;
    max-width: 95px;
    height: auto;
  }
}
.users-ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0 10px;
}
.voice__channel__management__buttons {
  display: flex;
  gap: 5px;
}
.voice__channel__management__buttons button {
  height: 35px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.voice__channel__management__buttons button svg {
  height: 70%;
  width: auto;
}

.remote-videos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  width: 100%;
  overflow-y: auto;
}

:deep(.video-track) {
  width: 100%;
  max-width: 240px;
  aspect-ratio: 4/3;
  background-color: black;
  border-radius: 8px;
  object-fit: cover;
}

:deep(.screen-share-track) {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 16/9;
}

.management-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin: 0 5px;
  transition: opacity 0.2s;
  color: white;
}

.management-btn:hover {
  opacity: 0.8;
}

.bg-green-600 {
  background-color: #16a34a;
}

.bg-gray-600 {
  background-color: #4b5563;
}
</style>
