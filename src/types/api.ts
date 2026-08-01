export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  cache?: RequestCache;
  signal?: AbortSignal;
}

export interface ApiErrorShape {
  code: string;
  message: string;
  status?: number;
  details?: unknown;
}
