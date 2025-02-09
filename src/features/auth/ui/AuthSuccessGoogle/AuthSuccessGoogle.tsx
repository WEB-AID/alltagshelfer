"use client";

import { useLayoutEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { fetchUserInfo } from "@/shared/api/fetchUserInfo";
import { fetchGoogleAuth } from "@/shared/api/fetchGoogleAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AuthSuccessGoogle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);
  // const user = useUserStore((state) => state.user);

  useLayoutEffect(() => {
    const handleAuth = async () => {
      if (token) {
        try {
          const accessToken = await fetchGoogleAuth(token);

          if (accessToken) {
            setAuth(accessToken);
            const userResponse = await fetchUserInfo();
            setUser(userResponse);

            console.log("Все ок перенаправляем на главную токен:", accessToken);
            // console.log(`user`, user);

            router.push("/");
          } else {
            console.error("Ошибка при проверке access токена:", accessToken);
          }
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
          router.push("/auth/error");
        }
      }
    };

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center text-red-500">
        <h1 className="text-4xl font-bold">403 – Access denied</h1>
        <p className="text-lg mt-2">Oops... Something went wrong.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Return to main page
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
