// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useAuthStore } from "@/entities/Auth/model/authStore";
// import { useUserStore } from "@/entities/User/model/userStore";
// import { fetchUserInfo } from "@/shared/api/fetchUserInfo";
// import { verifyGoogleToken } from "@/shared/api/googleAuth";

// export const useGoogleAuth = (onSuccess?: () => void) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const setAuth = useAuthStore((state) => state.setAuth);
//   const setUser = useUserStore((state) => state.setUser);

//   useEffect(() => {
//     if (!token) return;

//     const handleAuth = async () => {
//       try {
//         const accessToken = await verifyGoogleToken(token);

//         if (!accessToken) {
//           console.error("Ошибка при проверке access токена:", accessToken);
//           router.push("/auth/error");
//           return;
//         }

//         const userResponse = await fetchUserInfo();

//         setAuth(accessToken);
//         setUser(userResponse);

//         onSuccess?.();
//         router.push("/");
//       } catch (error) {
//         console.error("Ошибка при проверке токена:", error);
//         router.push("/auth/error");
//       }
//     };

//     void handleAuth(); // Запускаем функцию без ожидания

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]); // Добавляем зависимость token
// };
