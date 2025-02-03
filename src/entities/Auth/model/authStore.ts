import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuth: (isAuthenticated: boolean) => void;
  clearAuth: () => void; // Просто очищаем состояние
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

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuth: (isAuthenticated) => set({ isAuthenticated }),
  clearAuth: () => set({ isAuthenticated: false }), // Теперь чисто Zustand
}));
