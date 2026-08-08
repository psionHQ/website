export interface DatabaseRecord {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EncryptedRecord extends DatabaseRecord {
  encryptedPayload: string;
  encryptionVersion: number;
}

export interface DatabaseInsert<TRecord> {
  data: TRecord;
}

export interface DatabaseUpdate<TRecord> {
  id: string;
  data: Partial<TRecord>;
}

export interface DatabaseDelete {
  id: string;
}

export interface DatabaseClient {
  insert<TRecord>(
    table: string,
    input: DatabaseInsert<TRecord>,
  ): Promise<TRecord>;

  findById<TRecord>(
    table: string,
    id: string,
  ): Promise<TRecord | null>;

  findMany<TRecord>(
    table: string,
    userId: string,
  ): Promise<TRecord[]>;

  update<TRecord>(
    table: string,
    input: DatabaseUpdate<TRecord>,
  ): Promise<TRecord>;

  delete(
    table: string,
    input: DatabaseDelete,
  ): Promise<void>;
}