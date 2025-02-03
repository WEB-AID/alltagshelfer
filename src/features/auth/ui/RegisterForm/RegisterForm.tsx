"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/shared/lib/hooks/useRegister";

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: login, isPending } = useRegister();

  // Типизация события отправки формы
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = {
      email: form.emailRegister.value,
      password: form.password.value,
    };

    console.log("Submitting data:", data); // для проверки
    login(data, {
      onSuccess: () => {
        console.log("Registration successful");
        onSuccess(); // Закрываем диалог после успешного логина
      },
    }); // вызываем мутацию с данными
  };

  return (
    <form onSubmit={onSubmit} className="m-2">
      {/* <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Пароль" /> */}
      <div className="space-y-1">
        <Label htmlFor="nameRegister">Name</Label>
        <Input
          id="nameRegister"
          type="email"
          name="emailRegister"
          placeholder="Email"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="usernameRegister">Username</Label>
        <Input
          id="usernameRegister"
          type="password"
          name="password"
          placeholder="Пароль"
        />
      </div>
      <Button className="mt-8" type="submit" disabled={isPending}>
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
};
