import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  clearAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      setAuth: (token) => set({ isAuthenticated: true, accessToken: token }),
      clearAuth: () => set({ isAuthenticated: false, accessToken: null }),
      clearAuthenticated: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
