import type { ApiError, ApiResult } from "@/types";
import { getSessionTokens } from "./auth";

export type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  // when true, include credentials (cookies) with fetch — useful for same-origin setups
  includeCredentials?: boolean;
};

function getApiBaseUrl() {
  // 기본: same-origin (Next Route Handler / reverse proxy)
  // 필요 시 NEXT_PUBLIC_API_BASE_URL로 분리 가능
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<ApiResult<T>> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(options.headers);
  if (options.body !== undefined && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Try to attach Authorization header from cookies (access token) when available.
  // This supports both client-side calls and server-side client components (via lib/auth.getSessionTokens).
  try {
    const tokens = await getSessionTokens();
    if (tokens?.accessToken) {
      // Ensure standard Bearer format expected by backend guard
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }
  } catch {
    // getSessionTokens may throw in pure client env; ignore and proceed.
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    body:
      options.body === undefined
        ? undefined
        : options.body instanceof FormData
          ? options.body
          : JSON.stringify(options.body),
  };

  // If caller explicitly asked to include credentials (cookies) — add credentials: 'include'
  if (options.includeCredentials) {
    fetchOptions.credentials = "include";
  }

  const res = await fetch(url, fetchOptions);

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    let err: ApiError = {
      message: `Request failed (${res.status})`,
      status: res.status,
    };

    if (isJson) {
      try {
        const body = (await res.json()) as Partial<ApiError>;
        err = {
          message: body.message ?? err.message,
          status: body.status ?? err.status,
          code: body.code,
          details: body.details,
        };
      } catch {
        // ignore
      }
    } else {
      try {
        const text = await res.text();
        if (text) err.details = { raw: text };
      } catch {
        // ignore
      }
    }

    return { ok: false, error: err };
  }

  if (!isJson) {
    // API가 빈 응답(204) 또는 텍스트를 주는 경우를 대비
    const text = await res.text();
    return { ok: true, data: (text as unknown as T) };
  }

  const data = (await res.json()) as T;
  return { ok: true, data };
}
