const DEFAULT_SITE_URL = "http://localhost:3000";

function getString(name: string, fallback = ""): string {
  const value = process.env[name];
  return value !== undefined ? value : fallback;
}

function getBoolean(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value === undefined) return fallback;
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
  getString("NEXT_PUBLIC_API_BASE_URL", `${siteUrl}/api`),
  `${siteUrl}/api`,
);

export const env = {
  nodeEnv: getString("NODE_ENV", "development"),
  siteUrl,
  apiBaseUrl,
  authProvider: getString("NEXT_PUBLIC_AUTH_PROVIDER", "none") as
    | "none"
    | "clerk"
    | "authjs",
  authSecret: getString("AUTH_SECRET"),
  clerkPublishableKey: getString("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  clerkSecretKey: getString("CLERK_SECRET_KEY"),
  newsletterEnabled: getBoolean("NEXT_PUBLIC_NEWSLETTER_ENABLED", false),
  contactFormEnabled: getBoolean("NEXT_PUBLIC_CONTACT_FORM_ENABLED", false),
  analyticsId: getString("NEXT_PUBLIC_ANALYTICS_ID"),
  databaseUrl: getString("DATABASE_URL"),
} as const;

export const isProduction = env.nodeEnv === "production";
export const isAuthConfigured = env.authProvider !== "none";
