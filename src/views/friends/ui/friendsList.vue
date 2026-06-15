<script setup lang="ts">
import friendBar from "@views/friends/ui/components/friendBar.vue";
import { useFriendStore } from "@/app/stores/friendStore";
import { useOnlineStore } from "@/app/stores/onlineStore";
import iconDel from "@/shared/icon/iconDel.vue";
import { onMounted } from "vue";
const storeFriend = useFriendStore();
const onlineStore = useOnlineStore();
onMounted(() => {
  storeFriend.getFriend();
});
</script>

<template>
  <div class="friendsList">
    <ul class="friends">
      <li v-for="[id, friend] in storeFriend.friends" :key="id">
        <friendBar
          :id="friend.id"
          :login="friend.login"
          :img-url="friend.avatar"
          :user-status="onlineStore.getUserOnline(friend.id) || 'offline'"
          :userName="friend.username"
        >
          <template #actions>
            <button @click="storeFriend.removeFriend(friend.id)" class="action-btn delete" title="Удалить из друзей">
              <iconDel class="w-5 h-5" />
            </button>
          </template>
        </friendBar>
      </li>
    </ul>
  </div>
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
.delete:hover {
  color: #f23f42;
}
</style>
