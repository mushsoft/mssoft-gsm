import { Package } from 'lucide-react';
import type { Product } from '@prisma/client';
import CatalogProductCard from '@/components/cards/CatalogProductCard';
import { CATEGORY_ICON } from '@/lib/categoryIcons';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-sm font-black text-neutral-900 dark:text-white">You Might Also Like</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <CatalogProductCard key={product.id} product={product} fallbackIcon={CATEGORY_ICON[product.category] ?? Package} />
        ))}
      </div>
    </div>
  );
}
