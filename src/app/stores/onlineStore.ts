import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface DataSetStatus {
  userID: number;
  status: "online" | "offline";
}

export const useOnlineStore = defineStore("onlineStore", () => {
  const usersOnline = ref<Map<number, "online" | "offline">>(new Map());

  function getUserOnline(userID: number): "online" | "offline" | undefined {
    return usersOnline.value.get(userID);
  }

  function setStatus(data: DataSetStatus) {
    usersOnline.value.set(data.userID, data.status);
  }

  return { usersOnline, getUserOnline, setStatus };
});
