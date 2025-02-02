import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const clearUser = useUserStore((state) => state.clearUser);

  return () => {
    logout();
    clearUser();
  };
};
