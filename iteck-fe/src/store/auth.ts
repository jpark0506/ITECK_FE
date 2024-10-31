import { create } from "zustand";
import { persist } from "zustand/middleware";

interface isLoginStore {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useLoginStore = create(
  persist<isLoginStore>(
    (set) => ({
      isLogin: false,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
    }),
    {
      name: "login-state",
    }
  )
);
