import type { ApiError, ApiResult } from "@/types";

export type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function getApiBaseUrl() {
  // 기본: NEXT_PUBLIC_API_BASE_URL이 설정되어 있으면 해당 값을 사용
  // 없으면 제공된 백엔드 URL을 기본으로 사용
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend-production-cdc4.up.railway.app";
  if (!base) return "";
  return base.replace(/\/+$/, "");
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<ApiResult<T>> {
  // If caller provided a full URL, don't prepend base. Otherwise use base + path.
  const isFullUrl = /^https?:\/\//i.test(path);
  const base = getApiBaseUrl();
  const url = isFullUrl ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(options.headers as HeadersInit);
  if (options.body !== undefined && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Attach authorization header from localStorage on client side if available
  try {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("pt_access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
  } catch {
    // ignore
  }

  const res = await fetch(url, {
    ...options,
    headers,
    // Next.js on the client requires the body to be string for JSON requests
    body:
      options.body === undefined
        ? undefined
        : options.body instanceof FormData
          ? options.body
          : JSON.stringify(options.body),
  });

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
