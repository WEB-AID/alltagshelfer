"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyGoogleToken } from "@/shared/api/googleAuth";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const handleAuth = async () => {
      if (token) {
        try {
          const accessToken = await verifyGoogleToken(token);
          localStorage.setItem("accessToken", accessToken);
          router.push("/");
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
          router.push("/auth/error"); // редирект на страницу ошибки
        }
      }
    };

    handleAuth();
  }, [token, router]);

  return <div>Авторизация успешна, перенаправление...</div>;
}
