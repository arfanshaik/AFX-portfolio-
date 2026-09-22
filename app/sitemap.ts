import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }, ...projects.map(project => ({ url: `${siteUrl}/work/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
