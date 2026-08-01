import type { ApiErrorShape } from "@/types/api";

export class AppError extends Error {
  public readonly code: string;
  public readonly status?: number;
  public readonly details?: unknown;

  constructor(params: ApiErrorShape) {
    super(params.message);
    this.name = "AppError";
    this.code = params.code;
    this.status = params.status;
    this.details = params.details;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function toAppError(error: unknown, fallbackMessage: string): AppError {
  if (isAppError(error)) return error;

  if (error instanceof Error) {
    return new AppError({
      code: "UNEXPECTED_ERROR",
      message: error.message || fallbackMessage,
    });
  }

  return new AppError({
    code: "UNEXPECTED_ERROR",
    message: fallbackMessage,
    details: error,
  });
}
