import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  email: string;
  updatedAt: string;
  roles: ["USER" | "ADMIN"];
}

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, LoginData>({
    mutationFn: async (data: LoginData): Promise<RegisterResponse> => {
      const response = await axiosInstance.post<RegisterResponse>(
        "/auth/register",
        data
      );
      return response.data;
    },
    onSuccess: (data: RegisterResponse) => {
      const { email } = data;
      console.log(`Registration successful with email: ${email}`);
    },
  });
};
