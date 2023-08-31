import { UserJson } from "@share/web/src/types";
import { create } from "zustand";

export type UserState = {
  Authorization?: string;
  isAuthenticated?: boolean;
  user: UserJson | null;
};

type UserAction = {
  logout: () => void;
  login: ({}: { user: UserJson; Authorization: string }) => void;
};

export const useUser = () =>
  create<UserState & UserAction>()((set) => ({
    Authorization: "",
    isAuthenticated: false,
    user: null,
    logout: () => set({ user: null }),
    login: ({ Authorization, user }) =>
      set({ user, isAuthenticated: true, Authorization }),
  }));
