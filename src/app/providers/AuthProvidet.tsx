"use client";

import { useAuth } from "@/shared/lib/hooks/useAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuth(); // Проверка авторизации на клиенте

  return <>{children}</>;
};
