"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/shared/lib/hooks/useRegister";

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: login, isPending } = useRegister();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const data = {
      email: form.emailRegister.value,
      password: form.password.value,
    };

    console.log("Submitting data for Register at const RegisterForm():", data); // для проверки
    login(data, {
      onSuccess: () => {
        console.log("Registration successful at const RegisterForm()");
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="m-2">
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
          placeholder="Password"
        />
      </div>
      <Button
        className="mt-4 w-full flex items-center justify-center gap-2"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Registrating..." : "Register"}
      </Button>
    </form>
  );
};
