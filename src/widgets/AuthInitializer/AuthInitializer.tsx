// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { axiosInstance } from "@/shared/api/axios";
import { useUserStore } from "@/entities/User/model/userStore";
import { usePathname } from "next/navigation";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthInitializer = () => {
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { accessToken, setAuth, clearAuth } = useAuthStore();

  const [isRehydrated, setIsRehydrated] = useState(false);

  // useEffect(() => {
  //   const handleStorageChange = (event: StorageEvent) => {
  //     if (event.key === "auth-storage") {
  //       console.log(
  //         "🔄 Данные авторизации изменены в другой вкладке. Обновляем Zustand..."
  //       );

  //       // Загружаем новые данные из localStorage
  //       const storedAuth = localStorage.getItem("auth-storage");
  //       if (storedAuth) {
  //         try {
  //           const parsed = JSON.parse(storedAuth);
  //           if (parsed.state.accessToken) {
  //             setAuth(parsed.state.accessToken);
  //             console.log(
  //               "✅ Zustand синхронизирован с новым токеном:",
  //               parsed.state.accessToken
  //             );
  //           }
  //         } catch (error) {
  //           console.error("❌ Ошибка парсинга токена из localStorage:", error);
  //         }
  //       }
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, [setAuth]);

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
    if (pathname === "/auth/google-success") {
      console.log(
        "🚫 Находимся на /auth/google-success, пропускаем refresh токенов."
      );
      return;
    }

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
