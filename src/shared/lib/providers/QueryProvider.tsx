"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient()); // Обертка useState для мемоизации

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
