import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),

  setIsLoading: (value) => set({ isLoading: value }),
}));