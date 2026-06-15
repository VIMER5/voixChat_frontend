import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/app/stores/authStore";
import { useUsersInfo } from "@/app/stores/usersInfo";

const { VITE_BASE_URL_SERVER } = import.meta.env;
let isRefreshing = false;
const $api = axios.create({
  withCredentials: true,
  baseURL: VITE_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});
$api.interceptors.request.use((conf) => {
  conf.headers.authorization = `Bearer ${sessionStorage.getItem("access")}`;
  return conf;
});

$api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error) => {
    const authStore = useAuthStore();
    const userStore = useUsersInfo();

    if (error.response?.status === 403) {
        // Если получили 403, обновляем инфо о пользователе, чтобы проверить бан
        await userStore.getCurrentUserInfo();
        return Promise.reject(error);
    }

    if (error.response?.status === 401 && !isRefreshing && !error.request.responseURL.includes("refresh")) {
      isRefreshing = true;
      try {
        const newToken = await authStore.tokenUpdateByRefreshToken();
        if (newToken) {
          return $api.request(error.config);
        }
      } catch (err) {
        console.error("Не удалось обновить токен:", err);
        window.location.reload();
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default $api;
