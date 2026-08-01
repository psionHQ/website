import { AppError } from "@/lib/errors";
import type { DatabaseClient } from "@/types/database";

let activeDatabaseClient: DatabaseClient | null = null;

export function registerDatabaseClient(client: DatabaseClient) {
  activeDatabaseClient = client;
}

export function getDatabaseClient(): DatabaseClient {
  if (!activeDatabaseClient) {
    throw new AppError({
      code: "DATABASE_CLIENT_NOT_REGISTERED",
      message: "Database client has not been registered yet.",
    });
  }

  return activeDatabaseClient;
}
