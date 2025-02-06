"use client";

import { useLayoutEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyGoogleToken } from "@/shared/api/googleAuth";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { axiosInstance } from "@/shared/api/axios";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import Image from "next/image";

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

          // localStorage.setItem("access_token", accessToken);

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

  return (
    // <div className="fixed inset-0 bg-zinc-900 bg-opacity-80 z-50 flex items-center justify-center">
    <div>success google WAIT!!!!!!!!!!!</div>
    // <Dialog open={true}>
    //   <DialogContent
    //     hideCloseButton
    //     className="w-max bg-zinc-700 rounded-xl shadow-xl"
    //   >
    //     <DialogHeader>
    //       <DialogTitle className="mx-auto">Вход через Google</DialogTitle>
    //       <div className="flex justify-center my-4">
    //         <Image
    //           src="/spin.svg" // Укажите правильный путь к вашему SVG
    //           alt="Loading Spinner"
    //           width={100}
    //           height={100}
    //           className="animate-spin-slow my-4" // Кастомное вращение
    //         />
    //       </div>
    //       <DialogDescription className="mx-auto">
    //         Пожалуйста, подождите...
    //       </DialogDescription>
    //     </DialogHeader>
    //   </DialogContent>
    // </Dialog>
    // </div>
  );

  // return <div>Авторизация успешна, перенаправление...</div>;
}

// const setAuth = useAuthStore((state) => state.setAuth);
// const setUser = useUserStore((state) => state.setUser);

// useEffect(() => {
//   const handleAuth = async () => {
//     if (token) {
//       try {
//         const accessToken = await verifyGoogleToken(token);

//         // localStorage.setItem("access_token", accessToken);
//         setAuth(accessToken);

//         const userResponse = await axiosInstance.get("user/info/me", {
//           headers: {
//             Authorization: `${accessToken}`,
//           },
//         });

//         setUser(userResponse.data);

//         console.log("Все ок перенаправляем на главную токен:", token);
//         console.log("Авторизация успешна:", userResponse.data);
//         onSuccess?.();
//         router.push("/");
//       } catch (error) {
//         console.error("Ошибка при проверке токена:", error);
//         router.push("/auth/error");
//       }
//     }
//   };

//   handleAuth();
// }, [router, setAuth, setUser, onSuccess]);
