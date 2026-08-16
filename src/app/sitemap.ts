import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const routes = [
  '',
  'spares',
  'accessories',
  'screens',
  'tools',
  'deals',
  'shop/phones',
  'shop/accessories',
  'shop/screens',
  'shop/tools',
  'shop/testpoints',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
  }));
}
