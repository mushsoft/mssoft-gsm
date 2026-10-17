'use client';

import { useEffect, useRef, useState } from 'react';
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
  fits,
  quality,
  q,
}: {
  initialProducts: ProductWithCategory[];
  initialHasMore: boolean;
  category: string;
  sub?: string;
  brand?: string;
  condition?: string;
  fits?: string;
  quality?: string;
  q?: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  async function loadMore() {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    try {
      const qs = new URLSearchParams({ category, page: String(page + 1) });
      if (sub) qs.set('sub', sub);
      if (brand) qs.set('brand', brand);
      if (condition) qs.set('condition', condition);
      if (fits) qs.set('fits', fits);
      if (quality) qs.set('quality', quality);
      if (q) qs.set('q', q);
      const res = await fetch(`/api/shop/products?${qs.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [...prev, ...data.products]);
        setHasMore(data.hasMore);
        setPage((p) => p + 1);
      }
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }

  // Fetch the next page automatically once the sentinel scrolls near the
  // viewport, so the list keeps growing without a click.
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '600px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, page]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <CatalogProductCard key={product.id} product={product} fallbackIcon={CATEGORY_ICON[product.category] ?? Package} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center pt-2">
          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-neutral-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading more...
            </div>
          )}
        </div>
      )}
    </>
  );
}
