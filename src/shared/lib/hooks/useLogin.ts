import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axios";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        data
      );
      return response.data;
    },
    onSuccess: async (data) => {
      const { accessToken } = data;
      console.log(`Login successful. Access token: ${accessToken}`);
      setAuth(accessToken);

      try {
        const userResponse = await axiosInstance.get("/user/info/me", {
          headers: {
            Authorization: `${accessToken}`,
          },
        });

        console.log("User data:", userResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    },
  });
};
