import { axiosInstance } from "@/shared/api/axios";

export const fetchNewTokens = async () => {
  try {
    const response = await axiosInstance.get("/auth/refresh-tokens", {
      withCredentials: true,
    });

    return response.data.accessToken;
  } catch (error) {
    console.error("❌ Ошибка при обновлении токена:", error);
    throw error;
  }
};
