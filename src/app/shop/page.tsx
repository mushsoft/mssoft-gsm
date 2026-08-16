import Link from 'next/link';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CatalogProductCard from '@/components/cards/CatalogProductCard';

interface ShopSearchPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ShopSearchPage({ searchParams }: ShopSearchPageProps) {
  const { search } = await searchParams;
  const query = search?.trim() ?? '';

  const products = query
    ? await prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { brand: { contains: query, mode: 'insensitive' } },
            { modelName: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      })
    : [];

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
            <Search className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
              {query ? `Results for "${query}"` : 'Search'}
            </h1>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
              {query
                ? `${products.length} item${products.length === 1 ? '' : 's'} found`
                : 'Use the search bar above to find phones, screens, tools, and accessories.'}
            </p>
          </div>
        </div>
      </div>

      {query && products.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No matches for &quot;{query}&quot;</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              Try a different search term, or browse by category from the menu above.
            </p>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <CatalogProductCard key={product.id} product={product} fallbackIcon={ShoppingBag} />
          ))}
        </div>
      )}
    </main>
  );
}
