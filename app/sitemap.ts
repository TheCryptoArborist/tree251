import type { MetadataRoute } from "next";

const siteUrl = "https://tree251.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/real-estate`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/historic-trees`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/knowledge-center`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
