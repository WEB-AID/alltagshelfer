import { axiosInstance } from "./axios";

export const fetchGoogleAuth = async (token: string) => {
  const response = await axiosInstance.get("api/auth/success-google", {
    params: { token },
  });
  return response.data.accessToken;
};
