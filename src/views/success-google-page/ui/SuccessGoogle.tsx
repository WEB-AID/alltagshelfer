"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Сохраняем токен в localStorage
      localStorage.setItem("accessToken", token);

      // Перенаправляем на главную страницу
      router.push("/");
    }
  }, [router, token]);

  console.log(`Авторизация успешна, перенаправление... token: ${token}`);

  return <div>Авторизация успешна, перенаправление...</div>;
}
