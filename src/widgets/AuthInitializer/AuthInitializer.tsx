// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { axiosInstance } from "@/shared/api/axios";
import { useUserStore } from "@/entities/User/model/userStore";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthInitializer = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { accessToken, setAuth, clearAuth } = useAuthStore();

  const [isRehydrated, setIsRehydrated] = useState(false);

  useEffect(() => {
    const hydrateStore = async () => {
      console.log("⏳ Начинаем гидратацию Zustand...");
      if (useAuthStore.persist?.rehydrate) {
        await useAuthStore.persist.rehydrate(); // Явно вызываем rehydrate
      }
      setIsRehydrated(true);
      console.log("✅ Гидратация завершена.");
    };

    hydrateStore();
  }, []);

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (accessToken) {
        // console.log("⏳ Задержка 25 секунд старт ЯГАЙБЛЯ...");
        // await delay(25000); // ИСКУССТВЕННАЯ ЗАДЕРЖКА на 1 секунду
        // console.log("✅ Задержка кончилась сейчас делаем рефреш токен...");

        try {
          const response = await axiosInstance.get("/auth/refresh-tokens", {
            withCredentials: true,
          });
          const newAccessToken = response.data.accessToken;
          console.log(`new access token ${newAccessToken}`);

          if (newAccessToken) {
            setAuth(newAccessToken);
            console.log(`✅ Access token refreshed: ${newAccessToken}`);

            const userResponse = await axiosInstance.get("/user/info/me", {
              headers: {
                Authorization: `${newAccessToken}`, // Добавляем новый токен в заголовок
              },
            });
            setUser(userResponse.data);
            console.log("✅ User data synced:", userResponse.data);
          } else {
            throw new Error("No access token returned from server.");
          }
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          clearAuth();
          clearUser();
        }
      } else {
        console.log("ℹ️ No tokens found, skipping auth initialization.");
        console.log(`Error not found token: ${accessToken}`);
      }
    };

    if (isRehydrated) {
      refreshAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRehydrated]);

  return null;
};
