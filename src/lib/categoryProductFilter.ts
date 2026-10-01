import type { Prisma } from '@prisma/client';
import type { ProductCategory } from './productSpecFields';

export interface CategoryMeta {
  type: ProductCategory;
  label: string;
  subcategory?: string;
  excludeSubcategories?: string[];
  banner?: string;
}

// Shared between the category page (initial SSR fetch), the "Load More" API
// route (subsequent client-side fetches), and anything else that needs to
// resolve a /shop/[category] slug — one source of truth instead of two maps
// that could drift out of sync.
export const CATEGORY_MAP: Record<string, CategoryMeta> = {
  phones: {
    type: 'PHONE',
    label: 'Phones',
    banner: 'https://qppkqxucnqnkgtaeqaot.supabase.co/storage/v1/object/public/product-images/_site/shop-phones-banner.jpg',
  },
  accessories: { type: 'ACCESSORY', label: 'Accessories' },
  screens: { type: 'SPARE_PART', subcategory: 'SCREEN', label: 'Screens' },
  spares: { type: 'SPARE_PART', excludeSubcategories: ['SCREEN'], label: 'Spare Parts' },
  tools: { type: 'REPAIR_TOOL', label: 'Repair Tools' },
  'kids-tabs': { type: 'KIDS_TAB', label: 'Kids Tabs' },
  laptops: { type: 'LAPTOP', label: 'Laptops' },
};

// Matches the ?sub= slugs already emitted by Header.tsx's nav dropdowns.
export const SUB_SLUG_MAP: Record<string, string> = {
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
export const BRAND_SLUG_MAP: Record<string, string> = {
  apple: 'Apple',
  samsung: 'Samsung',
  tecno: 'Tecno',
};
export const CONDITION_SLUG_MAP: Record<string, string> = {
  brand_new: 'Brand New',
  uk_used: 'UK Used',
};

export function buildCategoryWhere(
  category: string,
  filters: { sub?: string; brand?: string; condition?: string }
): { meta: CategoryMeta; where: Prisma.ProductWhereInput; mappedSub?: string } | null {
  const meta = CATEGORY_MAP[category];
  if (!meta) return null;

  const mappedSub = filters.sub ? SUB_SLUG_MAP[filters.sub] : undefined;
  const where: Prisma.ProductWhereInput = { category: meta.type };
  if (mappedSub) {
    where.subcategory = mappedSub;
  } else if (meta.subcategory) {
    where.subcategory = meta.subcategory;
  } else if (meta.excludeSubcategories) {
    where.subcategory = { notIn: meta.excludeSubcategories };
  }
  const mappedBrand = filters.brand ? BRAND_SLUG_MAP[filters.brand] : undefined;
  if (mappedBrand) where.brand = { equals: mappedBrand, mode: 'insensitive' };
  const mappedCondition = filters.condition ? CONDITION_SLUG_MAP[filters.condition] : undefined;
  if (mappedCondition) where.specs = { path: ['condition'], equals: mappedCondition };

  return { meta, where, mappedSub };
}
