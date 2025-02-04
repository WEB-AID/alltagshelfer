import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { axiosInstance } from "@/shared/api/axios";

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  return async () => {
    try {
      console.log("Now logout will begin");

      // 1️⃣ Вызываем сервер для удаления refresh-токена и куки
      await axiosInstance.get("/auth/logout");
    } catch (error) {
      console.error("Ошибка при логауте:", error);
    } finally {
      // 2️⃣ Очищаем локальные данные
      clearAuth(); // Сбрасываем авторизацию в Zustand
      clearUser(); // Очищаем данные пользователя
    }
  };
};

// import { useAuthStore } from "@/entities/Auth/model/authStore";
// import { useUserStore } from "@/entities/User/model/userStore";
// import { axiosInstance } from "@/shared/api/axios";

// export const useLogout = () => {
//   const logout = useAuthStore((state) => state.logout);
//   const clearUser = useUserStore((state) => state.clearUser);

//   return async () => {
//     try {
//       console.log("Now logout will begin");

//       await axiosInstance.get("/auth/logout"); // Логаут на сервере
//     } catch (error) {
//       console.error("Ошибка при логауте:", error);
//     } finally {
//       localStorage.removeItem("access_token"); // Удаляем accessToken из localStorage
//       logout(); // Обновляем Zustand: пользователь не авторизован
//       clearUser(); // Очищаем данные пользователя
//     }
//   };
// };
