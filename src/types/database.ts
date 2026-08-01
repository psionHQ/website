export interface DatabaseQueryParams {
  text: string;
  values?: unknown[];
}

export interface DatabaseClient {
  query<TRecord>(params: DatabaseQueryParams): Promise<TRecord[]>;
  transaction<TValue>(operation: () => Promise<TValue>): Promise<TValue>;
}
