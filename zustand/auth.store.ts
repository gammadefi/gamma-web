import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type ROLE = "IBILE_ADMIN" | "IBILE_AMBASSADOR" | "IBILE_AGENT"

interface Auth {
  username: string;
  password: string;
}

export const useAuth = create(
  persist(
    combine(
      {
        loggedIn: false,
        token: null as string | null | AxiosBasicCredentials,
        userId: null as string | null,
        profile: null as object | any,
        initial: null as object | any,
        role: null as ROLE | null | string,
        balance : null as | object | any
      },
      (set) => ({
        setLoggedIn: (value: boolean) => {
          set({ loggedIn: value });
        },
        setToken: (token: string | AxiosBasicCredentials) => {
          set({ token });
        },
        setUserProfile: (profile: any) => {
          set({ profile, loggedIn: true });
        },
        setInitial: (initial : any) => {
          set({initial})
        },
        setUserRoleType: (role: string) => {
          set({ role });
        },
        setBalance: (balance : any) => {
          set({balance})
        },
        logout: () => {
          set({
            loggedIn: false,
            token: null,
            userId: "",
            profile: null,
            role: null,
          });
          window.location.replace("/login")
        },
      })
    ),
    {
      name: "gamma-auth",
      getStorage: () => sessionStorage,
    }
  )
);

export const AuthActions = {
  logout: () => {
    useAuth.getState().logout();
  },
  setToken: (token: string | AxiosBasicCredentials) => {
    useAuth.getState().setToken(token);
  },
  setUserId: (userId: string) => {
    useAuth.setState({ userId });
  },
  setProfile: (profile: any) => {
    useAuth.getState().setUserProfile(profile);
  },
  setInitial: (initial: any) => {
    useAuth.getState().setInitial(initial)
  },
  setRole: (role: string) => {
    useAuth.setState({ role });
  },
  setBalance: (balance : any) => {
    useAuth.getState().setBalance(balance)
  },
  setLoggedUserIn: (val : boolean) => {
    useAuth.getState().setLoggedIn(val);
  },
};
