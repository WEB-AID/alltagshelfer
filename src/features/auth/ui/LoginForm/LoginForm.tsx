"use client";

import { useLogin } from "@/shared/lib/hooks/useLogin";

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  // Типизация события отправки формы
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    // Тут руками телА запросов собирать (в апи конечно)
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    console.log("Submitting data:", data); // для проверки
    login(data); // вызываем мутацию с данными
  };

  return (
    <form onSubmit={onSubmit} className="m-2">
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Пароль" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Вход..." : "Войти"}
      </button>
    </form>
  );
};
