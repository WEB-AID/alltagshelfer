import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";

// Тип данных, которые отправляются при логине
interface LoginData {
  email: string;
  password: string;
}

// Тип ответа от сервера
interface LoginResponse {
  accessToken: string; // Токен доступа
}

export const useLogin = () => {
  // Мы передаем в useMutation объект с параметрами
  return useMutation<LoginResponse, Error, LoginData>({
    // Здесь мы передаем саму функцию, которая выполняет запрос
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        data
      );
      return response.data;
    },
    // Обработчики, которые будут выполнены по мере успеха или ошибки
    onSuccess: (data: LoginResponse) => {
      const { accessToken } = data;
      localStorage.setItem("access_token", accessToken);
      console.log(`Login successful. Access token: ${accessToken}`);
    },
  });
};
