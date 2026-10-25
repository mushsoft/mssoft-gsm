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
  'usb-cables': 'CABLE',
  headsets: 'EARPHONE',
  powerbanks: 'POWERBANK',
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
  infinix: 'Infinix',
  itel: 'itel',
  zte: 'ZTE',
  redmi: 'Xiaomi',
  xiaomi: 'Xiaomi',
  google: 'Google',
  pixel: 'Google',
};
export const CONDITION_SLUG_MAP: Record<string, string> = {
  brand_new: 'Brand New',
  uk_used: 'UK Used',
};
// Matches the ?quality= slugs Header.tsx's SCREENS dropdown emits — filters
// SCREEN products on their own specs.quality grade (the same field the admin
// form's Quality Grade select writes to), not the part's own brand.
export const QUALITY_SLUG_MAP: Record<string, string> = {
  copy: 'Copy',
  oem: 'OEM Replacement',
  original: 'Original Service Pack',
  aftermarket: 'Aftermarket',
};

export function buildCategoryWhere(
  category: string,
  filters: { sub?: string; brand?: string; condition?: string; fits?: string; quality?: string; q?: string }
): { meta: CategoryMeta; where: Prisma.ProductWhereInput; mappedSub?: string } | null {
  const meta = CATEGORY_MAP[category];
  if (!meta) return null;

  const mappedSub = filters.sub ? SUB_SLUG_MAP[filters.sub] : undefined;
  const where: Prisma.ProductWhereInput = { category: meta.type };
  // Free-text search scoped to this category — the header's search bar uses
  // this (instead of the cross-category /shop search) whenever the shopper
  // is already browsing a specific category, so "iphone" typed on the
  // Phones page only searches phones, not the whole catalog.
  const q = filters.q?.trim();
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { brand: { contains: q, mode: 'insensitive' } },
      { modelName: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (mappedSub) {
    where.subcategory = mappedSub;
  } else if (meta.subcategory) {
    where.subcategory = meta.subcategory;
  } else if (meta.excludeSubcategories) {
    where.subcategory = { notIn: meta.excludeSubcategories };
  }
  const mappedBrand = filters.brand ? BRAND_SLUG_MAP[filters.brand] : undefined;
  if (mappedBrand) where.brand = { equals: mappedBrand, mode: 'insensitive' };

  // condition/fits/quality all live under the JSON specs column, so they can't
  // each assign where.specs directly without clobbering one another — combine
  // whichever of them are present into an AND list instead.
  const specsConditions: Prisma.ProductWhereInput[] = [];
  const mappedCondition = filters.condition ? CONDITION_SLUG_MAP[filters.condition] : undefined;
  if (mappedCondition) specsConditions.push({ specs: { path: ['condition'], equals: mappedCondition } });
  // compatibleBrands is stored as a comma-joined string (e.g. "Apple, Samsung"),
  // same convention as the RAM/storage multiselect fields — so "does this
  // screen fit brand X" is a substring check, not an array/equality match.
  const mappedFits = filters.fits ? BRAND_SLUG_MAP[filters.fits] : undefined;
  if (mappedFits) specsConditions.push({ specs: { path: ['compatibleBrands'], string_contains: mappedFits } });
  const mappedQuality = filters.quality ? QUALITY_SLUG_MAP[filters.quality] : undefined;
  if (mappedQuality) specsConditions.push({ specs: { path: ['quality'], equals: mappedQuality } });

  if (specsConditions.length === 1) {
    Object.assign(where, specsConditions[0]);
  } else if (specsConditions.length > 1) {
    where.AND = specsConditions;
  }

  return { meta, where, mappedSub };
}
