"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User, Credentials } from "@/lib/api";
import { login as apiLogin, logout as apiLogout, register as apiRegister } from "@/lib/api";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (creds: Credentials) => Promise<void>;
  register: (creds: Credentials) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const LS_KEY = "notes.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage for demo; in real-world, use cookie/session.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed: User = JSON.parse(raw);
        setUser(parsed);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  // PUBLIC_INTERFACE
  const login = React.useCallback(async (creds: Credentials) => {
    /** Authenticate user and persist session */
    const u = await apiLogin(creds);
    setUser(u);
    localStorage.setItem(LS_KEY, JSON.stringify(u));
  }, []);

  // PUBLIC_INTERFACE
  const register = React.useCallback(async (creds: Credentials) => {
    /** Register new user and persist session */
    const u = await apiRegister(creds);
    setUser(u);
    localStorage.setItem(LS_KEY, JSON.stringify(u));
  }, []);

  // PUBLIC_INTERFACE
  const logout = React.useCallback(async () => {
    /** Clear session and call API logout if configured */
    try {
      await apiLogout(user?.token);
    } finally {
      setUser(null);
      localStorage.removeItem(LS_KEY);
    }
  }, [user?.token]);

  const value = useMemo<AuthContextType>(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
