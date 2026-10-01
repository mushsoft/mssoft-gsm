import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Cpu, Laptop, Layers, Package, Smartphone, Sparkles, Wrench, type LucideIcon } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import CategoryProductGrid from '@/components/shop/CategoryProductGrid';
import { CATEGORY_SUBCATEGORIES } from '@/lib/productSpecFields';
import { CATEGORY_MAP, buildCategoryWhere } from '@/lib/categoryProductFilter';

// Icons are a page-only presentation concern, kept separate from
// categoryProductFilter's query-building source of truth.
const CATEGORY_ICON: Record<string, LucideIcon> = {
  phones: Smartphone,
  accessories: Package,
  screens: Layers,
  spares: Layers,
  tools: Wrench,
  'kids-tabs': Cpu,
  laptops: Laptop,
};

const PAGE_SIZE = 24;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sub?: string; brand?: string; condition?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_MAP[category];
  if (!meta) return {};

  const description = `Shop ${meta.label.toLowerCase()} at MS Soft GSM: genuine stock, competitive prices, fast delivery across Kampala & East Africa.`;

  return {
    title: meta.label,
    description,
    alternates: { canonical: `/shop/${category}` },
    ...(meta.banner && {
      openGraph: { title: meta.label, description, images: [{ url: meta.banner }] },
      twitter: { card: 'summary_large_image', title: meta.label, description, images: [meta.banner] },
    }),
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { sub, brand, condition } = await searchParams;

  const built = buildCategoryWhere(category, { sub, brand, condition });

  if (!built) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-500 dark:text-neutral-400">
          Unknown category &quot;{category}&quot;.
        </div>
      </main>
    );
  }
  const { meta, where, mappedSub } = built;

  const activeSubcategoryLabel = mappedSub && CATEGORY_SUBCATEGORIES[meta.type]?.find((s) => s.value === mappedSub)?.label;
  const pageLabel = activeSubcategoryLabel ?? meta.label;

  const [totalCount, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      select: {
        id: true,
        slug: true,
        title: true,
        brand: true,
        modelName: true,
        price: true,
        originalPrice: true,
        isHotDeal: true,
        stock: true,
        images: true,
        category: true,
      },
    }),
  ]);

  const Icon = CATEGORY_ICON[category] ?? Package;

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

      {meta.banner && (
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 sm:h-56">
          <Image
            src={meta.banner}
            alt={`${meta.label} in stock at MS Soft GSM`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
            <Icon className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
              <Sparkles className="h-3 w-3" />
              Verified Inventory
            </div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">{pageLabel}</h1>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
              {totalCount} item{totalCount === 1 ? '' : 's'} available &mdash; pay instantly or order via WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-500 dark:text-neutral-400">
          No items listed under {pageLabel.toLowerCase()} yet.
        </div>
      ) : (
        <CategoryProductGrid
          initialProducts={products}
          initialHasMore={PAGE_SIZE < totalCount}
          category={category}
          sub={sub}
          brand={brand}
          condition={condition}
          fallbackIcon={Icon}
        />
      )}
    </main>
  );
}
