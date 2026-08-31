import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/pricing", "/about", "/contact", "/booking", "/account", "/sign-in", "/sign-up"];
  const now = new Date();
  const base = site.url;

  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
