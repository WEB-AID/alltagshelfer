"use client";

import { LoginForm } from "@/features/auth/ui/LoginForm/LoginForm";
import Block1 from "./Block1";
import Block2 from "./Block2";
import Block3 from "./Block3";
import { RegisterForm } from "@/features/auth/ui/RegisterForm/RegisterForm";

export default function Home() {
  return (
    <div className="flex flex-col">
      <LoginForm />
      <RegisterForm />
      <Block1 />
      <Block2 />
      <Block3 />
    </div>
  );
}
