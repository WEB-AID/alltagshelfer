"use client";

import { useLayoutEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyGoogleToken } from "@/shared/api/googleAuth";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { axiosInstance } from "@/shared/api/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function AuthSuccess({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);

  useLayoutEffect(() => {
    const handleAuth = async () => {
      if (token) {
        try {
          const accessToken = await verifyGoogleToken(token);

          if (accessToken) {
            setAuth(accessToken);
            console.log("Все ок перенаправляем на главную токен:", accessToken);

            const userResponse = await axiosInstance.get("user/info/me", {
              headers: {
                Authorization: `${accessToken}`,
              },
            });

            setUser(userResponse.data);

            onSuccess?.();
            router.push("/");
          } else {
            console.error("Ошибка при проверке access токена:", accessToken);
          }
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
          router.push("/auth/error"); // редирект на страницу ошибки
        }
      }
    };

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center text-red-500">
        <h1 className="text-4xl font-bold">403 – Доступ запрещён</h1>
        <p className="text-lg mt-2">Упс... Видимо чтото пошло не по плану.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    token && (
      <Dialog open={true}>
        <DialogContent
          hideCloseButton
          className="w-max bg-zinc-700 rounded-xl shadow-xl"
        >
          <DialogHeader>
            <DialogTitle className="mx-auto">Вход через Google</DialogTitle>
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
              Пожалуйста, подождите...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  );
}
