"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface User {
  name: string;
  email: string;
  phone?: string;
  joined: string;
}

interface AuthContextValue {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string) => User;
  signUp: (name: string, email: string) => User;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const KEY = "sparq.user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((u: User | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = useCallback(
    (email: string, name?: string) => {
      const derived =
        name ||
        email
          .split("@")[0]
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
      const u: User = {
        name: derived,
        email,
        joined: new Date().toISOString(),
      };
      persist(u);
      return u;
    },
    [persist],
  );

  const signUp = useCallback(
    (name: string, email: string) => {
      const u: User = { name, email, joined: new Date().toISOString() };
      persist(u);
      return u;
    },
    [persist],
  );

  const signOut = useCallback(() => persist(null), [persist]);

  const updateUser = useCallback(
    (patch: Partial<User>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, signOut, updateUser }),
    [user, ready, signIn, signUp, signOut, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
