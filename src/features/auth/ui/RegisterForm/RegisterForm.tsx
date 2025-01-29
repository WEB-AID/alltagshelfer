"use client";

import { useRegister } from "@/shared/lib/hooks/useRegister";

export const RegisterForm = () => {
  const { mutate: login, isPending } = useRegister();

  // Типизация события отправки формы
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    console.log("Submitting data:", data); // для проверки
    login(data); // вызываем мутацию с данными
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Пароль" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};
