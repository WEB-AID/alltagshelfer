"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyGoogleToken } from "@/shared/api/googleAuth";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { axiosInstance } from "@/shared/api/axios";

export default function AuthSuccess({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleAuth = async () => {
      if (token) {
        try {
          const accessToken = await verifyGoogleToken(token);

          localStorage.setItem("accessToken", accessToken);
          setAuth(true);

          const userResponse = await axiosInstance.get("/user/info/me", {
            headers: {
              Authorization: `${accessToken}`,
            },
          });

          setUser(userResponse.data);

          console.log("Все ок перенаправляем на главную токен:", token);
          console.log("Авторизация успешна:", userResponse.data);
          onSuccess?.();
          router.push("/");
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
          router.push("/auth/error");
        }
      }
    };

    handleAuth();
  }, [token, router, setAuth, setUser, onSuccess]);

  return <div>Авторизация успешна, перенаправление...</div>;
}
