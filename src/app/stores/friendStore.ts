import { ref, computed } from "vue";
import { type typeUserNotification, type currentUserInfo } from "../model/userModel";

import { defineStore } from "pinia";
import $api from "@/app/API/axios";

export const useFriendStore = defineStore("FriendStore", () => {
  const friends = ref<any>(new Map());
  const friendsRequest = ref<any>(new Map());

  //   function addFriendToMap(friend: any) {
  //     if (friends.value.get(friend.id)) friends.value.set(friend.id, friend);
  //   }
  async function getFriend() {
    const data = await $api.get("/user/friend/");
    if (data) {
      for (const item of data.data) {
        friends.value.set(item.id, item);
      }
    }
  }
  async function getfriendsRequest() {
    const data = await $api.get("/user/friend/request");
    if (data) {
      for (const item of data.data) {
        friendsRequest.value.set(item.id, item);
      }
    }
  }
  return { friends, getFriend, getfriendsRequest, friendsRequest };
});
