import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginStore {
  isLogin: boolean;
  userName: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setUserName: (userName: string) => void;
}

export const useLoginStore = create(
  persist<LoginStore>(
    (set) => ({
      isLogin: false,
      userName: null,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      setUserName: (userName: string) => set({ userName }),
    }),
    {
      name: "login-state",
    }
  )
);
