import type { MetadataRoute } from "next";
import { getPublicProperties } from "@/lib/crm/properties";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/nemovitosti",
  "/prodano",
  "/správa-nemovitostí",
  "/odhad",
  "/reference",
  "/o-mne",
  "/kontakt"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const { properties } = await getPublicProperties();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.8
    })),
    ...properties.map((property) => ({
      url: absoluteUrl(`/nemovitosti/${property.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: property.status === "Prodáno" ? 0.55 : 0.75
    }))
  ];
}
