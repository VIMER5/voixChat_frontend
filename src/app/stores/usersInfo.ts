import { ref, computed } from "vue";
import { type typeUserNotification, type currentUserInfo } from "../model/userModel";

import { defineStore } from "pinia";
import $api from "@/app/API/axios";

export const useUsersInfo = defineStore("UsersInfo", () => {
  let userInfoCurrent = ref<currentUserInfo>();
  let usersNotifications = ref<typeUserNotification>();

  async function getCurrentUserInfo() {
    if (userInfoCurrent.value) return userInfoCurrent.value;
    try {
      const userInfo = await $api.get("user");
      userInfoCurrent.value = userInfo.data;
      return userInfoCurrent.value;
    } catch (err) {}
  }

  return { usersNotifications, userInfoCurrent, getCurrentUserInfo };
});
