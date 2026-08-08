import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { env } from "@/config/env";

const ENCRYPTION_VERSION = 1;
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

interface EncryptedPayload {
  version: number;
  algorithm: typeof ALGORITHM;
  iv: string;
  tag: string;
  ciphertext: string;
}

function getEncryptionKey(): Buffer {
  if (!env.encryptionKey) {
    throw new Error("ENCRYPTION_KEY is not configured");
  }

  /*
   * The configured secret is never stored in the encrypted payload.
   * SHA-256 derives a fixed 32-byte key required by AES-256.
   *
   * Production key-management will be introduced separately.
   */
  return createHash("sha256")
    .update(env.encryptionKey, "utf8")
    .digest();
}

export function encrypt<T>(value: T): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);

  const plaintext = JSON.stringify(value);

  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  const payload: EncryptedPayload = {
    version: ENCRYPTION_VERSION,
    algorithm: ALGORITHM,
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };

  return JSON.stringify(payload);
}

export function decrypt<T>(encryptedPayload: string): T {
  const parsed = JSON.parse(encryptedPayload) as Partial<EncryptedPayload>;

  if (
    parsed.version !== ENCRYPTION_VERSION ||
    parsed.algorithm !== ALGORITHM ||
    typeof parsed.iv !== "string" ||
    typeof parsed.tag !== "string" ||
    typeof parsed.ciphertext !== "string"
  ) {
    throw new Error("Unsupported encrypted payload");
  }

  const key = getEncryptionKey();

  const iv = Buffer.from(parsed.iv, "base64");
  const tag = Buffer.from(parsed.tag, "base64");
  const ciphertext = Buffer.from(parsed.ciphertext, "base64");

  if (iv.length !== IV_LENGTH) {
    throw new Error("Invalid encryption IV");
  }

  if (tag.length !== AUTH_TAG_LENGTH) {
    throw new Error("Invalid encryption authentication tag");
  }

  const decipher = createDecipheriv(ALGORITHM, key, iv);

  decipher.setAuthTag(tag);

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString("utf8");

  return JSON.parse(plaintext) as T;
}