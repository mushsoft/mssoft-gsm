import type { Prisma, Product } from '@prisma/client';
import { prisma } from './prisma';

// Sequential, short-circuiting tiers — most products resolve at tier 1 or 2,
// so running all tiers in parallel would waste most of the queries. Each
// tier excludes everything already collected, so results never duplicate.
// The final category-only tier guarantees the section is never empty.
export async function getRelatedProducts(product: Product, take = 8): Promise<Product[]> {
  const seen = new Set<string>([product.id]);
  const results: Product[] = [];

  const tiers: Prisma.ProductWhereInput[] = [];
  if (product.modelName) {
    tiers.push({ category: product.category, brand: product.brand, modelName: product.modelName });
  }
  if (product.subcategory) {
    tiers.push({ category: product.category, subcategory: product.subcategory });
  }
  tiers.push({ category: product.category, brand: product.brand });
  tiers.push({ category: product.category });

  for (const where of tiers) {
    if (results.length >= take) break;
    const remaining = take - results.length;
    const batch = await prisma.product.findMany({
      where: { ...where, id: { notIn: [...seen] } },
      take: remaining,
      orderBy: { createdAt: 'desc' },
    });
    for (const p of batch) {
      results.push(p);
      seen.add(p.id);
    }
  }

  return results;
}
