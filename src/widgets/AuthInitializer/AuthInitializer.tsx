// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { axiosInstance } from "@/shared/api/axios";

export const AuthInitializer = () => {
  const { accessToken, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (accessToken) {
        try {
          const response = await axiosInstance.get("/auth/refresh-tokens", {
            withCredentials: true, // ВАЖНО для работы с HttpOnly куками
          }); // Правильный эндпоинт
          const newAccessToken = response.data.accessToken;
          console.log(`✅ Access token refreshed: ${newAccessToken}`);

          // Сохраняем новый access token
          setAuth(newAccessToken);

          console.log(
            `✅setAuth true & Access token refreshed:${newAccessToken}`
          );
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          clearAuth();
        }
      } else {
        console.log("ℹ️ No tokens found, skipping auth initialization.");
      }
    };

    refreshAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // Не рендерит UI
};
