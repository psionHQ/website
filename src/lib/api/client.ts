import { APP_CONFIG } from "@/config/app";
import { AppError, toAppError } from "@/lib/errors";
import type { ApiRequestOptions } from "@/types/api";
import type { Result } from "@/types/common";

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async request<TResponse, TBody = unknown>(
    endpoint: string,
    options: ApiRequestOptions<TBody> = {},
  ): Promise<Result<TResponse, AppError>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method ?? "GET",
        cache: options.cache,
        signal: options.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
      });

      if (!response.ok) {
        const details = await tryParseJson(response);
        return {
          ok: false,
          error: new AppError({
            code: "API_REQUEST_FAILED",
            message: `Request failed with status ${response.status}`,
            status: response.status,
            details,
          }),
        };
      }

      if (response.status === 204) {
        return { ok: true, data: undefined as TResponse };
      }

      const data = (await response.json()) as TResponse;
      return { ok: true, data };
    } catch (error) {
      return {
        ok: false,
        error: toAppError(error, "Network request failed."),
      };
    }
  }
}

async function tryParseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export const apiClient = new ApiClient(APP_CONFIG.apiBaseUrl);
