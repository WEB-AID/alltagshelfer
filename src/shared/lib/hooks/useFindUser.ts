import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";

interface UserResponse {
  id: string;
  email: string;
  updatedAt: string;
  roles: ["USER" | "ADMIN"];
}

type FindUserData = string;

export const useFindUser = () => {
  return useMutation<UserResponse, Error, FindUserData>({
    mutationFn: async (idOrEmail: FindUserData): Promise<UserResponse> => {
      const response = await axiosInstance.get<UserResponse>(
        `user/${idOrEmail}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("✅ Найден пользователь:", data);
    },
  });
};
