import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  clearAuth: () => void;
}

interface LoginDialogState {
  isLoginDialogOpen: boolean;
  openLoginDialog: VoidFunction;
  closeLoginDialog: VoidFunction;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      setAuth: (token) => set({ isAuthenticated: true, accessToken: token }),
      clearAuth: () => set({ isAuthenticated: false, accessToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useLoginDialogStore = create<LoginDialogState>()((set) => ({
  isLoginDialogOpen: false,
  openLoginDialog: () => set(() => ({ isLoginDialogOpen: true })),
  closeLoginDialog: () => set(() => ({ isLoginDialogOpen: false })),
}));

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   setAuth: (isAuthenticated) => set({ isAuthenticated }),
//   clearAuth: () => set({ isAuthenticated: false }), // Теперь чисто Zustand
// }));
