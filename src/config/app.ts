import { env } from "@/config/env";

export const APP_CONFIG = {
  name: "PSIONHQ",
  shortName: "PSIONHQ",
  description: "The Operating System for Intelligence.",
  siteUrl: env.siteUrl,
  apiBaseUrl: env.apiBaseUrl,
  supportEmail: "support@psionhq.com",
} as const;
