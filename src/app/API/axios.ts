import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/app/stores/authStore";
const baseURL = "http://localhost:3030/api/";
let isRefreshing = false;
const $api = axios.create({
  withCredentials: true,
  baseURL: baseURL,
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
  }
);

export default $api;
