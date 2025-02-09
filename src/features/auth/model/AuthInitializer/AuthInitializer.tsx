// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { usePathname } from "next/navigation";
import { fetchNewTokens } from "../fetchNewTokens";
import { fetchUserInfo } from "@/shared/api/fetchUserInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthInitializer = () => {
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { setAuth, clearAuth } = useAuthStore();

  const [isRehydrated, setIsRehydrated] = useState(false);
  const [isPendingAuth, setIsPendingAuth] = useState(false);

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
          setIsPendingAuth(true);
        } catch (error) {
          console.error("❌ Ошибка парсинга auth-storage:", error);
          return;
        }
      }

      if (!storedAccessToken) {
        console.log("ℹ️ No tokens found, skipping auth initialization.");
        return;
      }
      console.log("isPendingAuth", isPendingAuth);

      try {
        const newAccessToken = await fetchNewTokens();
        console.log(`🔄 Новый access token: ${newAccessToken}`);
        console.log("isPendingAuth", isPendingAuth);
        if (newAccessToken) {
          setAuth(newAccessToken);
          console.log(`✅ Access token обновлён: ${newAccessToken}`);
          console.log("isPendingAuth", isPendingAuth);
          const userResponse = await fetchUserInfo();
          setUser(userResponse);
          console.log("✅ User data обновлены:", userResponse.data);
          console.log("isPendingAuth", isPendingAuth);
          setIsPendingAuth(false);
        } else {
          console.log("isPendingAuth", isPendingAuth);
          setIsPendingAuth(false);
          console.log("isPendingAuth", isPendingAuth);
          throw new Error("❌ Сервер не вернул access token.");
        }
      } catch (error) {
        console.log("isPendingAuth", isPendingAuth);
        setIsPendingAuth(false);
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

  return isPendingAuth ? (
    <Dialog open={isPendingAuth}>
      <DialogContent
        hideCloseButton
        className="w-max bg-zinc-700 rounded-xl shadow-xl"
      >
        <DialogHeader>
          <DialogTitle className="mx-auto">Loggining</DialogTitle>
          <div className="flex justify-center my-4">
            <Image
              src="/spin.svg"
              alt="Loading Spinner"
              width={100}
              height={100}
              className="animate-spin-slow my-4"
            />
          </div>
          <DialogDescription className="mx-auto">
            Please wait...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ) : null;
  // { isPendingAuth ? <El /> : null }
};
