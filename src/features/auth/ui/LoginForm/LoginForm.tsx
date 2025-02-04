"use client";

import Image from "next/image";
import { useLogin } from "@/shared/lib/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GOOGLE_AUTH_URL =
  "https://alltagshelfer-nest-production.up.railway.app/api/auth/google";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const data = {
      email: form.emailLogin.value,
      password: form.password.value,
    };

    console.log("Submitting data for Login at const LoginForm():", data);
    login(data, {
      onSuccess: () => {
        console.log("Login successful at const LoginForm()");
        onSuccess();
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <form onSubmit={onSubmit} className="m-2">
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
          placeholder="Password"
        />
      </div>
      <Button
        className="mt-4 w-full flex items-center justify-center gap-2"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Checking..." : "Login"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
        Login with Google
      </Button>
    </form>
  );
};
