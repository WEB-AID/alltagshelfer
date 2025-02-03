"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/shared/lib/hooks/useLogin";
import Image from "next/image";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: login, isPending } = useLogin();

  // Типизация события отправки формы
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    // Тут руками телА запросов собирать (в апи конечно)
    const data = {
      email: form.emailLogin.value,
      password: form.password.value,
    };

    console.log("Submitting data:", data); // для проверки
    login(data, {
      onSuccess: () => {
        console.log("Login successful");
        onSuccess(); // Закрываем диалог после успешного логина
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"; // Редирект на Google OAuth
  };

  return (
    <form onSubmit={onSubmit} className="m-2">
      {/* <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Пароль" /> */}
      <div className="space-y-1">
        <Label htmlFor="nameLogin">Name</Label>
        <Input
          id="nameLogin"
          type="email"
          name="emailLogin"
          placeholder="Email"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="usernamelogin">Username</Label>
        <Input
          id="usernamelogin"
          type="password"
          name="password"
          placeholder="Пароль"
        />
      </div>
      <Button className="mt-8" type="submit" disabled={isPending}>
        {isPending ? "Вход..." : "Войти"}
      </Button>
      {/* Google Auth Button */}
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
        Войти через Google
      </Button>
    </form>
  );
};
