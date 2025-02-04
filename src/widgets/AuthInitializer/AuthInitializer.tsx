// src/widgets/AuthInitializer/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { axiosInstance } from "@/shared/api/axios";

export const AuthInitializer = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        try {
          const response = await axiosInstance.get("/auth/refresh-tokens", {
            withCredentials: true, // ВАЖНО для работы с HttpOnly куками
          }); // Правильный эндпоинт
          const newAccessToken = response.data.accessToken;
          console.log(`new access token ${newAccessToken}`);

          // Сохраняем новый access token.
          // localStorage.setItem("access_token", newAccessToken);

          // Устанавливаем состояние авторизации
          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            setAuth(true);
            console.log(`✅ Access token refreshed: ${newAccessToken}`);
          } else {
            throw new Error("No access token returned from server.");
          }

          console.log(`Access token refreshed: ${newAccessToken}`);
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          localStorage.removeItem("access_token");
          clearAuth();
        }
      } else {
        console.log("ℹ️ No tokens found, skipping auth initialization.");
      }
    };

    refreshAccessToken();
  }, [setAuth, clearAuth]);

  return null; // Не рендерит UI
};

// // src/widgets/AuthInitializer/AuthInitializer.tsx
// "use client";

// import { useEffect } from "react";
// import { useAuthStore } from "@/entities/Auth/model/authStore";
// import { axiosInstance } from "@/shared/api/axios";
// import { useUserStore } from "@/entities/User/model/userStore";

// export const AuthInitializer = () => {
//   const { accessToken, setAuth, clearAuth } = useAuthStore();
//   const setUser = useUserStore((state) => state.setUser);
//   const clearUser = useUserStore((state) => state.clearUser);

//   useEffect(() => {
//     const refreshAccessToken = async () => {
//       if (accessToken) {
//         try {
//           const response = await axiosInstance.get("auth/refresh-tokens", {
//             withCredentials: true, // ВАЖНО для работы с HttpOnly куками
//           }); // Правильный эндпоинт
//           const newAccessToken = response.data.accessToken;
//           console.log(`✅ Access token refreshed: ${newAccessToken}`);

//           // Сохраняем новый access token
//           setAuth(newAccessToken);
//           console.log(
//             `✅setAuth true & Access token refreshed:${newAccessToken}`
//           );

//           const userResponse = await axiosInstance.get("/user/info/me", {
//             headers: {
//               Authorization: `${newAccessToken}`, // Добавляем новый токен в заголовок
//             },
//           });
//           setUser(userResponse.data);
//           console.log("✅ User data synced:", userResponse.data);
//         } catch (error) {
//           console.error("Failed to refresh access token:", error);
//           clearAuth();
//           clearUser();
//         }
//       } else {
//         console.log("ℹ️ No tokens found, skipping auth initialization.");
//       }
//     };

//     refreshAccessToken();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [clearAuth, clearUser, setAuth, setUser]);

//   return null; // Не рендерит UI
// };
