import type { MetadataRoute } from "next";
import { env } from "@/app/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Don't index the internal style-guide, admin console, or route
        // handlers — nothing user-facing lives there.
        disallow: ["/admin", "/admin/", "/style-guide", "/api", "/blog"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
