import { ref, computed } from "vue";
import { type typeUserNotification } from "../model/userNotificationModel";
import { defineStore } from "pinia";
import $api from "@/app/API/axios";

export const useUsersInfo = defineStore("UsersInfo", () => {
  let usersNotifications = ref<typeUserNotification>();

  return { usersNotifications };
});
