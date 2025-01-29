"use client"; // ✅ Делаем клиентским

import { QueryProvider } from "@/shared/lib/providers/QueryProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
