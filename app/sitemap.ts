import type { MetadataRoute } from "next";

const siteUrl = "https://tree251.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/tree-inventories`,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/real-estate`,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/historic-trees`,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/knowledge-center`,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/resources/storm-tree-checklist`,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/resources/tree-benefit-calculator`,
      changeFrequency: "yearly",
      priority: 0.6
    }
  ];
}
