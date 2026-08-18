import Link from 'next/link';
import { ArrowLeft, Package, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import CatalogProductCard from '@/components/cards/CatalogProductCard';

export const metadata = {
  title: 'New Arrivals',
  description: 'The newest phones, spares, accessories, and tools just added to Phone Hub.',
};

export const revalidate = 60;

export default async function NewArrivalsPage() {
  const newArrivals = await prisma.product
    .findMany({ orderBy: { createdAt: 'desc' }, take: 24 })
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
        <Sparkles className="h-7 w-7 text-amber-500" />
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">Recently Introduced</h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            The newest phones, spares, accessories, and tools just added
          </p>
        </div>
      </div>

      {newArrivals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-500 dark:text-neutral-400">
          No products listed yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {newArrivals.map((product) => (
            <CatalogProductCard key={product.id} product={product} fallbackIcon={Package} />
          ))}
        </div>
      )}
    </main>
  );
}
