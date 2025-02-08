// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { usePathname } from "next/navigation";
import { fetchNewTokens } from "../fetchNewTokens";
import { fetchUserInfo } from "@/shared/api/fetchUserInfo";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthInitializer = () => {
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { setAuth, clearAuth } = useAuthStore();

  const [isRehydrated, setIsRehydrated] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage") {
        console.log(
          "🔄 Данные авторизации изменены в другой вкладке. Обновляем Zustand..."
        );

        const storedAuth = localStorage.getItem("auth-storage");

        if (storedAuth) {
          try {
            const parsed = JSON.parse(storedAuth);
            const storedAccessToken = parsed.state.accessToken;
            if (!storedAccessToken) {
              clearAuth();
            }
            // if (storedAccessToken !== accessToken) {
            //   setAuth(storedAccessToken);
            // } else if (!storedAccessToken) {
            //   clearAuth();
            // }
          } catch (error) {
            console.error("❌ Ошибка парсинга auth-storage:", error);
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname === "/auth/google-success") {
      console.log("🚫 Skip refresh-tokens. OAuth tech page.");
      return;
    }

    const refreshAccessToken = async () => {
      const storedAuth = localStorage.getItem("auth-storage");

      let storedAccessToken: string | null = null;

      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          storedAccessToken = parsed.state.accessToken;

          if (!storedAccessToken) {
            clearAuth();
            return;
          }
        } catch (error) {
          console.error("❌ Ошибка парсинга auth-storage:", error);
          return;
        }
      }

      if (!storedAccessToken) {
        console.log("ℹ️ No tokens found, skipping auth initialization.");
        return;
      }

      try {
        const newAccessToken = await fetchNewTokens();
        console.log(`🔄 Новый access token: ${newAccessToken}`);

        if (newAccessToken) {
          setAuth(newAccessToken);
          console.log(`✅ Access token обновлён: ${newAccessToken}`);

          const userResponse = await fetchUserInfo();
          setUser(userResponse);
          console.log("✅ User data обновлены:", userResponse.data);
        } else {
          throw new Error("❌ Сервер не вернул access token.");
        }
      } catch (error) {
        console.error("❌ Ошибка при обновлении токена:", error);
        clearAuth();
        clearUser();
      }
    };

    if (isRehydrated) {
      refreshAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRehydrated]);

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

  return null;
};
