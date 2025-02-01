import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthSuccess() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Сохраняем токен в localStorage
      localStorage.setItem("accessToken", token as string);

      // Перенаправляем на защищённую страницу
      router.push("/");
    }
  }, [router, token]);

  console.log(`Авторизация успешна, перенаправление... token: ${token}`);

  return <div>Авторизация успешна, перенаправление...</div>;
}
