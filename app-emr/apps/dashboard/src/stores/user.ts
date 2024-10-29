import { create } from "zustand";
import { Me } from "@repo/typescript-config";

type State = {
  user: Me | null;
};

type Actions = {
  setUser: (user: Me) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (_user) => set(() => ({ user: _user })),
}));
