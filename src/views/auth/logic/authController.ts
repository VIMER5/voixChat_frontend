import { registerSchema } from "@/app/validators/authValidator";
import $api from "@/app/API/axios";
import { useAuthStore } from "@/app/stores/authStore";
import { AxiosError } from "axios";

class authController {
  async loginIn(
    login: string | null,
    password: string | null
  ): Promise<{ error: string | null; value: string | null }> {
    const store = useAuthStore();
    let error = null;
    let value = null;
    if (!login || login.length < 4 || !password || password.length < 4) error = "Неверный логин или пароль";
    try {
      const t = await $api.post("/auth/login", { login, password });
      value = "ok";
      store.tokenAccess = t.data.access;
      console.log(t.data);
    } catch (err) {
      return { error: err instanceof AxiosError ? err.response?.data : "ошибка", value };
    }
    return { error, value };
  }

  async reg(
    login: string | null,
    email: string | null,
    password: string | null,
    confirmPassword: string | null
  ): Promise<{ errorInfo: string | null; ok: any }> {
    let errorInfo = null;
    let ok = null;
    const { error, value } = registerSchema.validate(
      {
        login,
        email,
        password,
        confirmPassword,
      },
      {
        abortEarly: true,
        stripUnknown: true,
      }
    );
    if (error) return { errorInfo: error.message, ok };
    try {
      const t = await $api.post("/auth/register", { ...value, username: value.login });
      ok = "ok";
    } catch (err) {
      return { errorInfo: err instanceof AxiosError ? err.response?.data : "ошибка", ok };
    }

    return { errorInfo, ok };
  }
}

export default new authController();
