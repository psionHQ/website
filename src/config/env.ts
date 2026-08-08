const DEFAULT_SITE_URL = "http://localhost:3000";

function getString(name: string, fallback = ""): string {
  const value = process.env[name];

  return value !== undefined ? value : fallback;
}

function getBoolean(name: string, fallback: boolean): boolean {
  const value = process.env[name];

  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

function normalizeUrl(value: string, fallback: string): string {
  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

const siteUrl = normalizeUrl(
  getString("NEXT_PUBLIC_SITE_URL", DEFAULT_SITE_URL),
  DEFAULT_SITE_URL,
);

const apiBaseUrl = normalizeUrl(
  getString(
    "NEXT_PUBLIC_API_BASE_URL",
    `${siteUrl}/api`,
  ),
  `${siteUrl}/api`,
);

export const env = {
  /*
   * Application
   */
  nodeEnv: getString("NODE_ENV", "development"),

  siteUrl,

  apiBaseUrl,

  /*
   * Authentication — Clerk
   */
  authProvider: getString(
    "NEXT_PUBLIC_AUTH_PROVIDER",
    "none",
  ) as "none" | "clerk" | "authjs",

  authSecret: getString("AUTH_SECRET"),

  clerkPublishableKey: getString(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  ),

  clerkSecretKey: getString("CLERK_SECRET_KEY"),

  /*
   * Database — legacy compatibility
   *
   * Kept temporarily because the existing DatabaseClient
   * abstraction still supports DATABASE_URL.
   *
   * Do not expose through NEXT_PUBLIC_*.
   */
  databaseUrl: getString("DATABASE_URL"),

  /*
   * Supabase
   *
   * Public client configuration.
   * These values are safe to expose to the browser when
   * Supabase Row Level Security is configured correctly.
   */
  supabaseUrl: getString("NEXT_PUBLIC_SUPABASE_URL"),

  supabasePublishableKey: getString(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  ),

  /*
   * AI
   *
   * Server-side only.
   */
  anthropicApiKey: getString("ANTHROPIC_API_KEY"),

  /*
   * Encryption
   *
   * Server-side only.
   *
   * This is currently the configuration entry point
   * for the encryption layer. It is NOT the final
   * production key-management architecture.
   */
  encryptionKey: getString("ENCRYPTION_KEY"),

  /*
   * Feature flags
   */
  newsletterEnabled: getBoolean(
    "NEXT_PUBLIC_NEWSLETTER_ENABLED",
    false,
  ),

  contactFormEnabled: getBoolean(
    "NEXT_PUBLIC_CONTACT_FORM_ENABLED",
    false,
  ),

  analyticsId: getString(
    "NEXT_PUBLIC_ANALYTICS_ID",
  ),
} as const;

export const isProduction =
  env.nodeEnv === "production";

export const isAuthConfigured =
  env.authProvider !== "none";

export const isDatabaseConfigured =
  env.databaseUrl.length > 0 ||
  (
    env.supabaseUrl.length > 0 &&
    env.supabasePublishableKey.length > 0
  );

export const isSupabaseConfigured =
  env.supabaseUrl.length > 0 &&
  env.supabasePublishableKey.length > 0;

export const isAnthropicConfigured =
  env.anthropicApiKey.length > 0;

export const isEncryptionConfigured =
  env.encryptionKey.length > 0;