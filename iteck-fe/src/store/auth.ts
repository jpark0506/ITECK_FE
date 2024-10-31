import { create } from "zustand";

interface isLoginStore {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useLoginStore = create<isLoginStore>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
}));
