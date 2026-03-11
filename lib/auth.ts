import "server-only";
import { cookies, headers } from "next/headers";

export type SessionTokens = {
  accessToken?: string;
  refreshToken?: string;
};

const ACCESS_TOKEN_COOKIE = "pt_access_token";
const REFRESH_TOKEN_COOKIE = "pt_refresh_token";

export async function getSessionTokens(): Promise<SessionTokens> {
  // This helper is safe to call from server components / server code (Next.js app router)
  // In client components it may throw due to server-only imports; callers should handle.
  try {
    const c = await cookies();
    return {
      accessToken: c.get(ACCESS_TOKEN_COOKIE)?.value,
      refreshToken: c.get(REFRESH_TOKEN_COOKIE)?.value,
    };
  } catch {
    // If cookies() is not available (e.g., running in browser), return empty
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
