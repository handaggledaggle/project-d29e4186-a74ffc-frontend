import "server-only";
import { cookies, headers } from "next/headers";

export type SessionTokens = {
  accessToken?: string;
  refreshToken?: string;
};

const ACCESS_TOKEN_COOKIE = "pt_access_token";
const REFRESH_TOKEN_COOKIE = "pt_refresh_token";

export async function getSessionTokens(): Promise<SessionTokens> {
  const c = await cookies();
  return {
    accessToken: c.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: c.get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

export async function getRequestId(): Promise<string | undefined> {
  const h = await headers();
  return h.get("x-request-id") ?? undefined;
}
