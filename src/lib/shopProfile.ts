import { prisma } from './prisma';

// ShopProfile is a singleton — exactly one row, id doesn't matter. Created
// lazily on first read so there's no seed step; every field defaults to
// null/the schema default until an admin fills it in via /admin/settings.
export async function getShopProfile() {
  const existing = await prisma.shopProfile.findFirst();
  if (existing) return existing;
  return prisma.shopProfile.create({ data: {} });
}
