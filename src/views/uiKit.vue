<script setup lang="ts">
import co from "@/shared/components/userUI/notification.vue";
import userStatus from "@/shared/components/userUI/userStatus.vue";
import userAvatar from "@/shared/components/userUI/userAvatar.vue";
import usernamePlate from "@/shared/components/userUI/usernamePlate.vue";
import buttonIcons from "@/shared/components/ui/buttons/buttonIcons.vue";
import iconDeafen from "@icons/iconDeaf.vue";
import iconMute from "@icons/iconMute.vue";
import iconSettings from "@icons/iconSettings.vue";
import { computed, ref, onUnmounted, onBeforeUnmount } from "vue";
import { useOnlineStore } from "@/app/stores/onlineStore";

import { RoomEvent, Track } from "livekit-client";
import { useVoiceStore } from "@/app/stores/voiceStore";
import $api from "@/app/API/axios";

const stored = useVoiceStore();
const remoteVideos = ref<HTMLDivElement | null>(null);

// Выносим функцию, чтобы ссылка была постоянной для .off()
const onTrackSubscribed = (track: any, publication: any, participant: any) => {
  if (track.kind === "video") {
    const element = track.attach();
    element.setAttribute("data-participant", participant.identity);

    element.style.width = "100%";
    remoteVideos.value?.appendChild(element);
  } else if (track.kind === "audio") {
    const audioElement = track.attach();
    document.body.appendChild(audioElement);
  }
};

async function handleJoin() {
  try {
    const res = await $api.post("/sfu/live-token", {
      roomName: "318343e4-03f4-11f1-9289-bc24110cce17",
      participantName: "ddawd",
    });

    if (res.data?.token) {
      stored.room.off(RoomEvent.TrackSubscribed, onTrackSubscribed);

      stored.room.on(RoomEvent.TrackSubscribed, onTrackSubscribed);

      await stored.connect(res.data.token);
    }
  } catch (err) {
    console.error("Ошибка при входе в комнату:", err);
  }
}

// Очистка ресурсов
onBeforeUnmount(() => {
  // 1. Снимаем слушатель событий
  stored.room.off(RoomEvent.TrackSubscribed, onTrackSubscribed);

  // 2. Отвязываем ВСЕ треки (и свои, и чужие)
  // Это уберет ошибку "native event handler", так как элементы DOM еще существуют
  const allParticipants = [stored.room.localParticipant, ...Array.from(stored.room.remoteParticipants.values())];

  allParticipants.forEach((p) => {
    p.trackPublications.forEach((pub) => {
      const track = pub.track;
      if (!track) return;
      track.detach();
      if (track.kind === "audio") {
        track.attachedElements.forEach((el) => {
          el.remove();
        });
      }
    });
  });

  // 3. Важно: очищаем контейнер
  if (remoteVideos.value) {
    remoteVideos.value.innerHTML = "";
  }

  // 4. Если хочешь, чтобы при уходе с роута звук/видео гасли:
  stored.disconnect();
});

const store = useOnlineStore();
const userStatusf = computed(() => {
  return store.getUserOnline(1);
});

const url = "https://cdn.discordapp.com/avatars/555259684584554497/30c74f18defc66cc70aff045b8730032.webp?size=100";
</script>

<template>
  <h1 class="font-semibold text-CTA_red not-italic">Hello world! {{ userStatusf }}</h1>
  <div class="d flex gap-10 flex-col">
    <co notification-text="12" />
    <div class="dd flex gap-10">
      <userStatus status="offline" class="w-[45px]" />
      <userStatus status="online" class="w-[45px]" />
    </div>
    <div class="userA flex gap-10">
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="default" status="offline" class="w-[45px]" />
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="default" status="online" class="w-[45px]" />
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="voice" :speak="true" class="w-[45px]" />
      <userAvatar :img-url="url" user-name="-=V.I.M.E.R=-" type="voice" :speak="false" class="w-[45px]" />
      <userAvatar
        :img-url="url"
        user-name="-=V.I.M.E.R=-"
        type="big"
        :notification="991"
        :speak="true"
        class="w-[45px]"
      />
    </div>
    <usernamePlate
      status="online"
      :url-user-avatar="url"
      userStatus="Vue Is My Everyday Routine"
      userName="-=V.I.M.E.R=-"
      class="mx-10 max-w-[400px]"
    />
  </div>

  <div class="chat">
    <div class="video-chat">
      <button @click="handleJoin" v-if="stored.room.state !== 'connected'">Начать звонок</button>
      <button @click="stored.disconnect()" v-else>Выйти</button> <br />
      <button @click="stored.toggleMicrophone()">микро</button>
      {{ stored.roomState }}
      <div ref="remoteVideos" class="grid"></div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}
:deep(video) {
  width: 100%;
  border-radius: 8px;
  background: #222;
}
</style>
