/*
  This file provides helpers to read session tokens & request id on the server.
  To avoid importing server-only APIs from client code (which caused the build error),
  we keep this module server-only but also expose a safe client-side fallback function
  `getSessionTokensClient` that reads tokens from localStorage when available.

  - getSessionTokens(): server-only, uses next/headers and cookies — may throw when used in client.
  - getSessionTokensClient(): safe to call from client components — reads from localStorage.

  Callers that may run on both server and client (like lib/api.apiFetch) should call getSessionTokens()
  inside a try/catch and fall back to getSessionTokensClient() when the server-only import is not usable.
*/

import "server-only";
import { cookies, headers } from "next/headers";

export type SessionTokens = {
  accessToken?: string;
  refreshToken?: string;
};

const ACCESS_TOKEN_COOKIE = "pt_access_token";
const REFRESH_TOKEN_COOKIE = "pt_refresh_token";

export async function getSessionTokens(): Promise<SessionTokens> {
  // Server-only: read cookies via next/headers
  try {
    const c = await cookies();
    return {
      accessToken: c.get(ACCESS_TOKEN_COOKIE)?.value,
      refreshToken: c.get(REFRESH_TOKEN_COOKIE)?.value,
    };
  } catch {
    // If cookies() is not available (e.g., running in browser), throw so callers can fallback.
    throw new Error("server-only: cookies() not available");
  }
}

// Client-safe fallback: read tokens from localStorage. This does NOT import server-only APIs.
export function getSessionTokensClient(): SessionTokens {
  try {
    if (typeof window === "undefined") return {};
    const accessToken = localStorage.getItem(ACCESS_TOKEN_COOKIE) ?? undefined;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_COOKIE) ?? undefined;
    return { accessToken, refreshToken };
  } catch {
    return {};
  }
}

export async function getRequestId(): Promise<string | undefined> {
  try {
    const h = await headers();
    return h.get("x-request-id") ?? undefined;
  } catch {
    return undefined;
  }
}
