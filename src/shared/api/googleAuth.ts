import { axiosInstance } from "./axios";

export const verifyGoogleToken = async (token: string) => {
  const response = await axiosInstance.get("api/auth/success-google", {
    params: { token },
    // withCredentials: true, // Для передачи HttpOnly куки
  });
  return response.data.accessToken;
};
