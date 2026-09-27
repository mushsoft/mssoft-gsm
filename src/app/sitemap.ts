import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const routes = [
  '',
  'about',
  'contact',
  'privacy',
  'terms',
  'learn-to-repair',
  'wholesale',
  'new-arrivals',
  'deals',
  'shop/phones',
  'shop/accessories',
  'shop/screens',
  'shop/spares',
  'shop/tools',
  'shop/testpoints',
  'shop/kids-tabs',
];

// Product pages are the actual catalog — without them here, Google has to
// discover each one purely by crawling internal links, which is far slower
// and less reliable than an explicit sitemap entry.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = routes.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
  }));

  const products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []);
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/shop/product/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  return [...staticEntries, ...productEntries];
}
