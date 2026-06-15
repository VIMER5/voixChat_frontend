<script setup lang="ts">
import { useFriendStore } from "@/app/stores/friendStore";
import { useOnlineStore } from "@/app/stores/onlineStore";
import friendBar from "@views/friends/ui/components/friendBar.vue";
import iconAddFriend from "@/shared/icon/iconAddFriend.vue";
import iconCallReject from "@/shared/icon/iconCallReject.vue";
const storeFriend = useFriendStore();
const onlineStore = useOnlineStore();
</script>

<template>
  <ul class="friends">
    <li v-for="[id, friend] in storeFriend.friendsRequest" :key="id">
      <friendBar
        :id="friend.id"
        :login="friend.login"
        :img-url="friend.avatar"
        :user-status="onlineStore.getUserOnline(friend.id) || 'offline'"
        :userName="friend.username"
      >
        <template #actions>
          <button @click="storeFriend.acceptFriend(friend.id)" class="action-btn accept" title="Принять">
            <iconAddFriend class="w-5 h-5" />
          </button>
          <button @click="storeFriend.declineFriend(friend.id)" class="action-btn decline" title="Отклонить">
            <iconCallReject class="w-5 h-5" />
          </button>
        </template>
      </friendBar>
    </li>
  </ul>
</template>

<style scoped>
.friends {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--с-SpaceCharcoal_69);
  cursor: pointer;
  transition: background-color 0.2s;
  color: #b5bac1;
}
.action-btn:hover {
  background-color: #41434a;
}
.accept:hover {
  color: #23a559;
}
.decline:hover {
  color: #f23f42;
}
</style>
