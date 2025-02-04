"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";

// Тип данных, которые отправляются при логине
interface LoginData {
  email: string;
  password: string;
}

// Тип ответа от сервера
interface RegisterResponse {
  id: string;
  email: string;
  updatedAt: string;
  roles: ["USER" | "ADMIN"];
}

export const useRegister = () => {
  // Мы передаем в useMutation объект с параметрами
  return useMutation<RegisterResponse, Error, LoginData>({
    // Здесь мы передаем саму функцию, которая выполняет запрос
    mutationFn: async (data: LoginData): Promise<RegisterResponse> => {
      const response = await axiosInstance.post<RegisterResponse>(
        "/auth/register",
        data
      );
      return response.data;
    },
    // Обработчики, которые будут выполнены по мере успеха или ошибки
    onSuccess: (data: RegisterResponse) => {
      const { email } = data;
      localStorage.setItem("email_current", email);
      console.log(`Registration successful with email: ${email}`);
    },
  });
};

// import { useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "@/shared/api/axios";

// // Тип данных, которые отправляются при логине
// interface LoginData {
//   email: string;
//   password: string;
// }

// // Тип ответа от сервера
// interface RegisterResponse {
//   id: string;
//   email: string;
//   updatedAt: string;
//   roles: ["USER" | "ADMIN"];
// }

// export const useRegister = () => {
//   // Мы передаем в useMutation объект с параметрами
//   return useMutation<RegisterResponse, Error, LoginData>({
//     // Здесь мы передаем саму функцию, которая выполняет запрос
//     mutationFn: async (data: LoginData): Promise<RegisterResponse> => {
//       const response = await axiosInstance.post<RegisterResponse>(
//         "/auth/register",
//         data
//       );
//       return response.data;
//     },
//     // Обработчики, которые будут выполнены по мере успеха или ошибки
//     onSuccess: (data: RegisterResponse) => {
//       const { email } = data;
//       localStorage.setItem("email_current", email);
//       console.log(`Registration successful with email: ${email}`);
//     },
//   });
// };
