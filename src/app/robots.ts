import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/signin", "/signup"],
    },
    sitemap: `${APP_CONFIG.siteUrl}/sitemap.xml`,
  };
}
