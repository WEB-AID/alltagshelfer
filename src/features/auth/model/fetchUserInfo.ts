import { axiosInstance } from "@/shared/api/axios";

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user/info/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Ошибка при обновлении юзера:", error);
    throw error;
  }
};
