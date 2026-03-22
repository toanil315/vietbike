import { create } from "zustand";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  permissions: string[];
}

interface AuthState {
  // Auth state
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  refreshToken: string | null;
  user: AdminUser | null;

  // Loading & Error
  isLoading: boolean;
  error: string | null;

  // Actions
  setToken: (token: string, refreshToken?: string) => void;
  setUser: (user: AdminUser) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  login: (token: string, refreshToken: string, user: AdminUser) => void;
  logout: () => void;
  refreshTokenIfNeeded: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  error: null,

  setToken: (token: string, refreshToken?: string) =>
    set({
      token,
      refreshToken,
      isAuthenticated: !!token,
      error: null,
    }),

  setUser: (user: AdminUser) => set({ user }),

  setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),

  login: (token: string, refreshToken: string, user: AdminUser) =>
    set({
      token,
      refreshToken,
      user,
      isAuthenticated: true,
      isAdmin: user.role === "admin",
      error: null,
      isLoading: false,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      refreshToken: null,
      user: null,
      error: null,
    }),

  refreshTokenIfNeeded: async () => {
    const { token, refreshToken } = get();

    if (!token || !refreshToken) {
      return false;
    }

    try {
      set({ isLoading: true });
      set({
        isLoading: false,
        error: "Token refresh needed - please login again",
      });
      return false;
    } catch (error) {
      set({
        isLoading: false,
        error: "Failed to refresh token",
        isAuthenticated: false,
      });
      return false;
    }
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  clearError: () => set({ error: null }),
}));
