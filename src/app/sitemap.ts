import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/config/app";
import { PUBLIC_SITE_ROUTES } from "@/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SITE_ROUTES.map((route) => ({
    url: `${APP_CONFIG.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
