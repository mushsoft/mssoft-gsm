import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Cpu,
  Layers,
  Package,
  Smartphone,
  Sparkles,
  Wrench,
} from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import CatalogProductCard from '@/components/cards/CatalogProductCard';
import { CATEGORY_SUBCATEGORIES, type ProductCategory } from '@/lib/productSpecFields';

const CATEGORY_MAP: Record<
  string,
  {
    type: ProductCategory;
    label: string;
    icon: typeof Smartphone;
    subcategory?: string;
    excludeSubcategories?: string[];
  }
> = {
  phones: { type: 'PHONE', label: 'Phones', icon: Smartphone },
  accessories: { type: 'ACCESSORY', label: 'Accessories', icon: Package },
  screens: { type: 'SPARE_PART', subcategory: 'SCREEN', label: 'Screens', icon: Layers },
  spares: { type: 'SPARE_PART', excludeSubcategories: ['SCREEN'], label: 'Spare Parts', icon: Layers },
  tools: { type: 'REPAIR_TOOL', label: 'Repair Tools', icon: Wrench },
  'kids-tabs': { type: 'KIDS_TAB', label: 'Kids Tabs', icon: Cpu },
};

// Matches the ?sub= slugs already emitted by Header.tsx's nav dropdowns.
const SUB_SLUG_MAP: Record<string, string> = {
  chargers: 'CHARGER',
  housings: 'HOUSING',
  blowers: 'BLOWER',
  separators: 'SEPARATOR',
  'power-supply': 'POWER_SUPPLY',
  microscopes: 'MICROSCOPE',
  multimeters: 'MULTIMETER',
  'soldering-guns': 'SOLDERING',
  laminators: 'LAMINATOR',
};

// Matches the ?brand=/?condition= slugs Header.tsx's PHONES dropdown emits.
const BRAND_SLUG_MAP: Record<string, string> = {
  apple: 'Apple',
  samsung: 'Samsung',
  tecno: 'Tecno',
};
const CONDITION_SLUG_MAP: Record<string, string> = {
  brand_new: 'Brand New',
  uk_used: 'UK Used',
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sub?: string; brand?: string; condition?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_MAP[category];
  if (!meta) return {};

  return {
    title: meta.label,
    description: `Shop ${meta.label.toLowerCase()} at MS Soft GSM — genuine stock, competitive prices, fast delivery across Kampala & East Africa.`,
    alternates: { canonical: `/shop/${category}` },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { sub, brand, condition } = await searchParams;
  const meta = CATEGORY_MAP[category];

  if (!meta) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-500 dark:text-neutral-400">
          Unknown category &quot;{category}&quot;.
        </div>
      </main>
    );
  }

  const mappedSub = sub ? SUB_SLUG_MAP[sub] : undefined;
  const where: Prisma.ProductWhereInput = { category: meta.type };
  if (mappedSub) {
    where.subcategory = mappedSub;
  } else if (meta.subcategory) {
    where.subcategory = meta.subcategory;
  } else if (meta.excludeSubcategories) {
    where.subcategory = { notIn: meta.excludeSubcategories };
  }
  const mappedBrand = brand ? BRAND_SLUG_MAP[brand] : undefined;
  if (mappedBrand) where.brand = { equals: mappedBrand, mode: 'insensitive' };
  const mappedCondition = condition ? CONDITION_SLUG_MAP[condition] : undefined;
  if (mappedCondition) where.specs = { path: ['condition'], equals: mappedCondition };

  const activeSubcategoryLabel =
    mappedSub && CATEGORY_SUBCATEGORIES[meta.type]?.find((s) => s.value === mappedSub)?.label;
  const pageLabel = activeSubcategoryLabel ?? meta.label;

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const Icon = meta.icon;

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
              {products.length} item{products.length === 1 ? '' : 's'} available &mdash; pay instantly or order via WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-500 dark:text-neutral-400">
          No items listed under {pageLabel.toLowerCase()} yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <CatalogProductCard key={product.id} product={product} fallbackIcon={Icon} />
          ))}
        </div>
      )}
    </main>
  );
}
