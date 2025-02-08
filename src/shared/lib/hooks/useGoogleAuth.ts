import { useLayoutEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchGoogleAuth } from "@/shared/api/fetchGoogleAuth";
import { useAuthStore } from "@/entities/Auth/model/authStore";
import { useUserStore } from "@/entities/User/model/userStore";
import { fetchUserInfo } from "@/shared/api/fetchUserInfo";

export const useGoogleAuth = (onSuccess?: () => void) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const setAuth = useAuthStore((state) => state.setAuth);
  const setUser = useUserStore((state) => state.setUser);

  useLayoutEffect(() => {
    const handleAuth = async () => {
      if (!token) return;

      try {
        const accessToken = await fetchGoogleAuth(token);

        if (accessToken) {
          const userResponse = await fetchUserInfo();
          setAuth(accessToken);
          setUser(userResponse);
          onSuccess?.();
          router.push("/");
        } else {
          console.error("Ошибка при проверке access токена:", accessToken);
        }
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        router.push("/auth/error");
      }
    };

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
