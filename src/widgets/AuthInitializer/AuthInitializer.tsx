// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { axiosInstance } from "@/shared/api/axios";

export const AuthInitializer = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axiosInstance.get("/auth/refresh-tokens", {
          withCredentials: true, // ВАЖНО для работы с HttpOnly куками
        }); // Правильный эндпоинт
        const newAccessToken = response.data.accessToken;
        console.log(`new access token ${newAccessToken}`);

        // Сохраняем новый access token
        localStorage.setItem("access_token", newAccessToken);

        // Устанавливаем состояние авторизации
        setAuth(true);

        console.log(`Access token refreshed: ${newAccessToken}`);
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        localStorage.removeItem("access_token");
        clearAuth();
      }
    };

    refreshAccessToken();
  }, [setAuth, clearAuth]);

  return null; // Не рендерит UI
};
