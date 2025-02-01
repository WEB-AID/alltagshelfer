"use client";

import { useState } from "react";
import { useFindUser } from "@/shared/lib/hooks/useFindUser";

export default function Block1() {
  const [input, setInput] = useState<string>("");
  const { mutate: findUser, isPending } = useFindUser();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      findUser(input.trim()); // 🚀 Сразу делаем запрос
    }
  };

  return (
    <div className="m-2">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="ID или email пользователя"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Поиск..." : "Найти"}
        </button>
      </form>
    </div>
  );
}
