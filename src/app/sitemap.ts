import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://devstack-eight.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/sobre-el-proyecto", "/contacto", "/privacidad"];
  const toolRoutes = tools
    .filter((tool) => tool.status === "available" && tool.href)
    .map((tool) => tool.href as string);

  return [...staticRoutes, ...toolRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/tools/") ? 0.8 : 0.6
  }));
}
