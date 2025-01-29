"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Жестко заданный URL для бэкенда, чтобы обойти baseURL Vercel
const API_BASE_URL = "https://alltagshelfer-nest-production.up.railway.app";

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
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const fullUrl = `${API_BASE_URL}/auth/login`;
      console.log("Sending request to:", fullUrl);

      const response = await axios.post<LoginResponse>(fullUrl, data, {
        withCredentials: true, // Чтобы сервер видел refresh-токен в куках
      });

      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      const { accessToken } = data;
      localStorage.setItem("access_token", accessToken);
      console.log(`Login successful. Access token: ${accessToken}`);
    },
  });
};
