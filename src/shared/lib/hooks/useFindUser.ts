import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";

// Тип ответа от сервера
interface UserResponse {
  id: string;
  email: string;
  updatedAt: string;
  roles: ["USER" | "ADMIN"];
}

// Тип данных для поиска
type FindUserData = string; // ID или email пользователя

export const useFindUser = () => {
  return useMutation<UserResponse, Error, FindUserData>({
    mutationFn: async (idOrEmail: FindUserData): Promise<UserResponse> => {
      const response = await axiosInstance.get<UserResponse>(
        `/user/${idOrEmail}`
      );

      // ✅ Если сервер прислал новый токен в заголовке — обновляем его в localStorage
      const newAccessToken = response.headers["x-new-access-token"];
      if (newAccessToken) {
        localStorage.setItem("access_token", newAccessToken);
        console.log("🔄 Новый accessToken сохранён:", newAccessToken);
      }

      return response.data;
    },
    onSuccess: (data) => {
      console.log("✅ Найден пользователь:", data);
    },
  });
};
