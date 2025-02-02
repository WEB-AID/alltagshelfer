import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (isAuthenticated: boolean) => void;
  clearAuth: () => void; // Просто очищаем состояние
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuth: (isAuthenticated) => set({ isAuthenticated }),
  clearAuth: () => set({ isAuthenticated: false }), // Теперь чисто Zustand
}));
