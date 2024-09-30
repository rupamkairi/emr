import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (_user: any) => set(() => ({ user: _user })),
}));
