import { useAuthStore } from "@/entities/Auth/model/authStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://alltagshelfer-nest-production.up.railway.app/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
  }
  return config;
});

// const { accessToken, setAuth, clearAuth } = useAuthStore();
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const { data } = await axios.get(
//           `https://alltagshelfer-nest-production.up.railway.app/auth/refresh-tokens`,
//           {
//             withCredentials: true,
//           }
//         );
//         setAuth(newAccessToken);
//         error.config.headers.Authorization = `Bearer ${data.accessToken}`;
//         return axiosInstance(error.config);
//       } catch {
//         localStorage.removeItem("access_token");
//       }
//     }
//     return Promise.reject(error);
//   }
// );
