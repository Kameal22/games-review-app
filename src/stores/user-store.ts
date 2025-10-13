import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export type User = {
  _id: string;
  displayName: string;
  email: string;
  createdAt: string;
};

export type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type UserActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user: User) => {
        set({ user, isAuthenticated: true, error: null });
      },

      clearUser: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      login: (user: User, token: string) => {
        // Store token in cookie
        Cookies.set("auth_token", token, { expires: 7 });
        // Store user in state
        set({ user, isAuthenticated: true, error: null });
      },

      logout: () => {
        // Remove token from cookie
        Cookies.remove("auth_token");
        // Clear user from state
        set({ user: null, isAuthenticated: false, error: null });
      },
    }),
    {
      name: 'user-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }), // only persist user and isAuthenticated
    }
  )
);
