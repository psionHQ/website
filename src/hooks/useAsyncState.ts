"use client";

import { useCallback, useState } from "react";
import type { AsyncState } from "@/types/common";

export function useAsyncState<TData, TError = Error>(initialData: TData | null = null) {
  const [state, setState] = useState<AsyncState<TData, TError>>({
    status: "idle",
    data: initialData,
    error: null,
  });

  const run = useCallback(async (operation: () => Promise<TData>) => {
    setState((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      const data = await operation();
      setState({ status: "success", data, error: null });
      return { ok: true as const, data };
    } catch (error) {
      const normalizedError = error as TError;
      setState({ status: "error", data: null, error: normalizedError });
      return { ok: false as const, error: normalizedError };
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle", data: initialData, error: null });
  }, [initialData]);

  return {
    ...state,
    run,
    reset,
    isLoading: state.status === "loading",
  };
}
