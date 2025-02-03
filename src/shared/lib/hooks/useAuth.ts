// "use client";

// import { useAuthStore } from "@/entities/Auth/model/authStore";
// import { useUserStore } from "@/entities/User/model/userStore";
// import { useEffect } from "react";
// import { useLogout } from "./useLogout";
// import { axiosInstance } from "@/shared/api/axios";

// export const useAuth = () => {
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const setUser = useUserStore((state) => state.setUser);
//   const logout = useLogout();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const accessToken = localStorage.getItem("accessToken");
//       if (accessToken) {
//         try {
//           const response = await axiosInstance.get("user/info/me", {
//             headers: {
//               Authorization: `${accessToken}`,
//             },
//             withCredentials: true,
//           });
//           setAuth(true);
//           setUser(response.data);
//         } catch (error) {
//           console.error("Ошибка авторизации:", error);
//           logout();
//         }
//       }
//     };

//     checkAuth();
//   }, [setAuth, setUser, logout]);
// };
