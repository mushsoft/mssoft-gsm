'use client';

import { useState } from 'react';
import { Loader2, Package } from 'lucide-react';
import CatalogProductCard, { type CatalogProduct } from '@/components/cards/CatalogProductCard';
import { CATEGORY_ICON } from '@/lib/categoryIcons';

type ProductWithCategory = CatalogProduct & { category: string };

// fallbackIcon is a React component reference, which can't cross the
// Server->Client prop boundary (not serializable) — each card resolves its
// own icon client-side from the product's own category field instead, with
// Package as the final fallback if that lookup ever misses.
export default function CategoryProductGrid({
  initialProducts,
  initialHasMore,
  category,
  sub,
  brand,
  condition,
}: {
  initialProducts: ProductWithCategory[];
  initialHasMore: boolean;
  category: string;
  sub?: string;
  brand?: string;
  condition?: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMore() {
    setIsLoading(true);
    try {
      const qs = new URLSearchParams({ category, page: String(page + 1) });
      if (sub) qs.set('sub', sub);
      if (brand) qs.set('brand', brand);
      if (condition) qs.set('condition', condition);
      const res = await fetch(`/api/shop/products?${qs.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [...prev, ...data.products]);
        setHasMore(data.hasMore);
        setPage((p) => p + 1);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <CatalogProductCard key={product.id} product={product} fallbackIcon={CATEGORY_ICON[product.category] ?? Package} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 px-5 py-2.5 text-xs font-bold text-neutral-600 transition-colors hover:border-amber-500/50 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-800 dark:text-neutral-300"
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}
