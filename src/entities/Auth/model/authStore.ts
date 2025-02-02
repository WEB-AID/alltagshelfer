import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuth: (isAuthenticated) => set({ isAuthenticated }),
  logout: () => {
    localStorage.removeItem("access_token");
    set({ isAuthenticated: false });
  },
}));
