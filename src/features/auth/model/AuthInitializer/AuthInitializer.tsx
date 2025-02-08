"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { fetchNewTokens } from "../fetchNewTokens";
import { fetchUserInfo } from "../../../../shared/api/fetchUserInfo";

export const AuthInitializer = () => {
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { setAuth, clearAuth, setLoadingAuth, clearAuthenticated } =
    useAuthStore();

  const [isRehydrated, setIsRehydrated] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-storage") {
        const storedAuth = localStorage.getItem("auth-storage");

        if (storedAuth) {
          try {
            const parsed = JSON.parse(storedAuth);
            const storedAccessToken = parsed.state.accessToken;
            if (!storedAccessToken) {
              clearAuth();
            }
            // if (storedAccessToken !== accessToken && storedAccessToken) {
            //   setAuth(storedAccessToken);
            // } else if (!storedAccessToken) {
            //   clearAuth();
            // }
          } catch (error) {
            console.error("❌ Parsing error with auth-storage:", error);
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
          console.error("❌ Parsing error with auth-storage:", error);
          return;
        }
      }

      if (!storedAccessToken) {
        console.log("🚫 No tokens found, skipping auth initialization.");
        return;
      }

      try {
        setLoadingAuth(true);

        const newAccessToken = await fetchNewTokens();
        console.log("await fetchNewTokens()");

        if (newAccessToken) {
          setAuth(newAccessToken);
          console.log("await fetchUserInfo()");
          const userResponse = await fetchUserInfo();

          console.log("setAuth(newAccessToken)");
          setUser(userResponse);
          console.log("setUser(userResponse)");
        } else {
          throw new Error("❌ Server did not returned access token.");
        }
      } catch (error) {
        console.error("❌ Refresh-tokens update error:", error);
        clearAuth();
        clearUser();
      } finally {
        setLoadingAuth(false);
      }
    };

    if (isRehydrated) {
      refreshAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRehydrated]);

  useEffect(() => {
    clearAuthenticated();
    const hydrateStore = async () => {
      if (useAuthStore.persist?.rehydrate) {
        await useAuthStore.persist.rehydrate(); // Явно вызываем rehydrate
      }
      setIsRehydrated(true);
    };

    hydrateStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
