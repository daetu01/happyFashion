import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const TOKEN_KEY = "aura_token";

export interface AuthUser {
  id: number;
  email: string;
  nickname: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function extractErrorMessage(res: Response, fallback: string) {
  try {
    const data = await res.json();
    return data.message ?? fallback;
  } catch {
    return fallback;
  }
}

class SessionInvalidError extends Error {}

async function fetchMe(accessToken: string): Promise<AuthUser> {
  const res = await fetch("/api/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 401 || res.status === 403) throw new SessionInvalidError("Session expired");
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchMe(token)
      .then((u) => !cancelled && setUser(u))
      .catch((err) => {
        if (cancelled) return;
        // Only a confirmed 401/403 means the token is actually invalid — transient
        // network errors (including the duplicate request StrictMode fires in dev,
        // where one copy gets aborted) shouldn't log the user out.
        if (err instanceof SessionInvalidError) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await extractErrorMessage(res, "Invalid email or password."));
    const { accessToken } = (await res.json()) as { accessToken: string };
    const me = await fetchMe(accessToken);
    localStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
    setUser(me);
  };

  const signup = async (email: string, password: string, nickname: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nickname }),
    });
    if (!res.ok) throw new Error(await extractErrorMessage(res, "Couldn't create your account."));
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!token, loading, login, signup, logout }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}
