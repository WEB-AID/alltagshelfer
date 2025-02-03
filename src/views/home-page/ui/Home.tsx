"use client";

// import { LoginForm, RegisterForm } from "@/features/auth";
import Block1 from "./Block1";
import Block2 from "./Block2";
import Block3 from "./Block3";

console.log("Base URL:", process.env.NEXT_PUBLIC_API_URL);

export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <Block1 />
        <Block2 />
        <Block3 />
      </div>
    </main>
  );
}
