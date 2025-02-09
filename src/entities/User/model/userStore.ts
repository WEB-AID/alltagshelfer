import { create } from "zustand";

interface User {
  id: string;
  email: string;
  avatar: string;
  roles: ("USER" | "ADMIN")[];
}

interface UserState {
  avatar: string | null;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  avatar: null,
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
