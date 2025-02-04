import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";

// Тип данных, которые отправляются при логине
interface LoginData {
  email: string;
  password: string;
}

// Тип ответа от сервера
interface LoginResponse {
  accessToken: string; // Токен доступа
}

export const useLogin = () => {
  // Мы передаем в useMutation объект с параметрами
  return useMutation<LoginResponse, Error, LoginData>({
    // Здесь мы передаем саму функцию, которая выполняет запрос
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        data
      );
      return response.data;
    },
    // Обработчики, которые будут выполнены по мере успеха или ошибки
    onSuccess: (data: LoginResponse) => {
      const { accessToken } = data;
      localStorage.setItem("access_token", accessToken);
      console.log(`Login successful. Access token: ${accessToken}`);
    },
  });
};

// import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "@/shared/api/axios";
// import { useAuthStore } from "@/entities/Auth/model/authStore";
// import { useUserStore } from "@/entities/User/model/userStore";

// // Тип данных, которые отправляются при логине
// interface LoginData {
//   email: string;
//   password: string;
// }

// // Тип ответа от сервера
// interface LoginResponse {
//   accessToken: string; // Токен доступа
// }

// export const useLogin = () => {
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const setUser = useUserStore((state) => state.setUser);

//   return useMutation<LoginResponse, Error, LoginData>({
//     mutationFn: async (data: LoginData) => {
//       const response = await axiosInstance.post("/auth/login", data);
//       return response.data;
//     },
//     onSuccess: async (data) => {
//       const { accessToken } = data;

//       // 1️⃣ Сохраняем access_token
//       // setAuth(accessToken);
//       localStorage.setItem("access_token", accessToken);
//       console.log(`Login successful. Access token: ${accessToken}`);

//       // 2️⃣ Обновляем состояние авторизации
//       setAuth(true);
//       // 3️⃣ Явно ждем, пока токен установится
//       await new Promise((resolve) => setTimeout(resolve, 100)); // Микро-задержка для отладки

//       // 4️⃣ Получаем данные пользователя
//       try {
//         const userResponse = await axiosInstance.get("/user/info/me", {
//           headers: {
//             Authorization: `${accessToken}`,
//           },
//         });
//         setUser(userResponse.data);
//         console.log("User data:", userResponse.data);
//       } catch (error) {
//         console.error("Failed to fetch user data", error);
//       }
//     },
//   });
// };

// // export const useLogin = () => {
// //   // Мы передаем в useMutation объект с параметрами
// //   return useMutation<LoginResponse, Error, LoginData>({
// //     // Здесь мы передаем саму функцию, которая выполняет запрос
// //     mutationFn: async (data: LoginData): Promise<LoginResponse> => {
// //       const response = await axiosInstance.post<LoginResponse>(
// //         "/auth/login",
// //         data
// //       );
// //       return response.data;
// //     },
// //     // Обработчики, которые будут выполнены по мере успеха или ошибки
// //     onSuccess: (data: LoginResponse) => {
// //       const { accessToken } = data;
// //       localStorage.setItem("access_token", accessToken);
// //       console.log(`Login successful. Access token: ${accessToken}`);
// //     },
// //   });
// // };
