import Link from 'next/link';
import { ArrowLeft, Flame, Package } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import CatalogProductCard from '@/components/cards/CatalogProductCard';

export const revalidate = 60;

export default async function DealsPage() {
  const hotDeals = await prisma.product
    .findMany({ where: { isHotDeal: true }, orderBy: { createdAt: 'desc' } })
    .catch(() => []);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={30000} />
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <Flame className="h-7 w-7 fill-current text-red-500" />
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">Hot Deals & Flash Sales</h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Discounted phones, spares, and accessories
          </p>
        </div>
      </div>

      {hotDeals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-500 dark:text-neutral-400">
          No hot deals currently active. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {hotDeals.map((product) => (
            <CatalogProductCard key={product.id} product={product} fallbackIcon={Package} />
          ))}
        </div>
      )}
    </main>
  );
}
