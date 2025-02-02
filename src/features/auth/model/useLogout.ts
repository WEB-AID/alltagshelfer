import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { axiosInstance } from "@/shared/api/axios";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const clearUser = useUserStore((state) => state.clearUser);

  return async () => {
    try {
      await axiosInstance.get("/auth/logout"); // Логаут на сервере
    } catch (error) {
      console.error("Ошибка при логауте:", error);
    } finally {
      localStorage.removeItem("access_token"); // Удаляем accessToken из localStorage
      logout(); // Обновляем Zustand: пользователь не авторизован
      clearUser(); // Очищаем данные пользователя
    }
  };
};
