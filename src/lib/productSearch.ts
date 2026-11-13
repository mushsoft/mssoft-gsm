import type { Product } from '@prisma/client';

// Shared by /shop?search=, /shop/[category]?q= and the header's typeahead so
// all three find the same products for the same query.
export const PRODUCT_SEARCH_FIELDS = ['title', 'brand', 'modelName'] as const;

export function productRankFields(p: Pick<Product, 'title' | 'brand' | 'modelName'>) {
  return [
    { value: p.modelName, weight: 3 },
    { value: p.title, weight: 3 },
    { value: p.brand, weight: 2 },
  ];
}
