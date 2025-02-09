import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { axiosInstance } from "@/shared/api/axios";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  return async () => {
    try {
      await axiosInstance.get("/auth/logout");
    } catch (error) {
      console.error("Ошибка при логауте:", error);
    } finally {
      clearAuth();
      clearUser();
    }
  };
};
