import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAuth: (token: string) => void;
  clearAuth: () => void;
}

interface LoginDialogState {
  isLoginDialogOpen: boolean;
  openLoginDialog: VoidFunction;
  closeLoginDialog: VoidFunction;
}

export const useLoginDialogStore = create<LoginDialogState>()((set) => ({
  isLoginDialogOpen: false,
  openLoginDialog: () => set(() => ({ isLoginDialogOpen: true })),
  closeLoginDialog: () => set(() => ({ isLoginDialogOpen: false })),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      setAuth: (token) => set({ isAuthenticated: true, accessToken: token }),
      clearAuth: () => set({ isAuthenticated: false, accessToken: null }),
    }),
    {
      name: "auth-storage", // ключ для localStorage
    }
  )
);
