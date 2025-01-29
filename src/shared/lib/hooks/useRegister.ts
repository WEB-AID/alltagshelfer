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
interface RegisterResponse {
  id: string;
  email: string;
  updatedAt: string;
  roles: ["USER" | "ADMIN"];
}

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, LoginData>({
    mutationFn: async (data: LoginData): Promise<RegisterResponse> => {
      const fullUrl = `${API_BASE_URL}/auth/register`;
      console.log("Sending request to:", fullUrl);

      const response = await axios.post<RegisterResponse>(fullUrl, data, {
        withCredentials: true, // Чтобы куки refresh-токена отправлялись
      });

      return response.data;
    },
    onSuccess: (data: RegisterResponse) => {
      const { email } = data;
      localStorage.setItem("email_current", email);
      console.log(`Registration successful with email: ${email}`);
    },
  });
};
