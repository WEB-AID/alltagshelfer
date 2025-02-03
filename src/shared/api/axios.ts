import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://alltagshelfer-nest-production.up.railway.app/",
  withCredentials: true, // Для передачи refresh-token в cookies
});

// Перехватчик для обновления токенов
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

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
//         localStorage.setItem("access_token", data.accessToken);
//         error.config.headers.Authorization = `Bearer ${data.accessToken}`;
//         return axiosInstance(error.config);
//       } catch {
//         localStorage.removeItem("access_token");
//       }
//     }
//     return Promise.reject(error);
//   }
// );
