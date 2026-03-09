export type ID = string;

export type ISODateTimeString = string;

export type Role = "USER" | "SELLER" | "ARTIST" | "ADMIN";

export type SortOrder = "asc" | "desc";

export type PageMeta = {
  page: number;
  pageSize: number;
  totalCount: number;
};

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
