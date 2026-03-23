import { MetadataRoute } from "next";
import { vehicleEndpoints } from "@/lib/api-endpoints";
import { Vehicle } from "@/types";

interface VehiclePageResponse {
  data: Vehicle[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vietbike.vn";

async function fetchAllVehicleSlugs(): Promise<string[]> {
  const pageSize = 100;
  let page = 1;
  const slugs: string[] = [];
  let totalPages = 1;

  while (page <= totalPages) {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    try {
      const response = await fetch(
        `${API_BASE_URL}${vehicleEndpoints.list()}?${query.toString()}`,
        { next: { revalidate: 3600 } },
      );

      if (!response.ok) {
        break;
      }

      const payload = (await response.json()) as {
        success: boolean;
        data?: VehiclePageResponse;
      };

      if (!payload.success || !payload.data) {
        break;
      }

      slugs.push(
        ...payload.data.data
          .map((vehicle) => vehicle.slug)
          .filter((slug): slug is string => Boolean(slug)),
      );

      totalPages = payload.data.pagination.totalPages;
      page += 1;
    } catch {
      break;
    }
  }

  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchAllVehicleSlugs();

  const bikePages = slugs.map((slug) => ({
    url: `${SITE_URL}/bikes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/bikes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...bikePages,
  ];
}
