import { MetadataRoute } from 'next';
import { VEHICLES } from '@/data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vietbike.vn'; // Update with actual domain if deploying to production

  const bikePages = VEHICLES.map((bike) => ({
    url: `${baseUrl}/bikes/${bike.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/bikes`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...bikePages,
  ];
}
