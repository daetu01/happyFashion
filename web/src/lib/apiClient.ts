import { getAuthToken } from "./AuthContext";

export class ApiError extends Error {}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(path, { ...options, headers });

  if (!res.ok) {
    const message = await res
      .text()
      .then((text) => (text ? (JSON.parse(text).message as string | undefined) : undefined))
      .catch(() => undefined);
    throw new ApiError(message ?? `Request failed (${res.status})`);
  }

  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
