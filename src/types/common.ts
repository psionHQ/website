export type Result<T, E> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface AsyncState<T, E> {
  status: AsyncStatus;
  data: T | null;
  error: E | null;
}
