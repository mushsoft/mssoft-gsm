import type { Prisma } from '@prisma/client';
import { BRAND_SLUG_MAP, QUALITY_SLUG_MAP } from './categoryProductFilter';

export interface ProductTab {
  key: string;
  label: string;
  where: Prisma.ProductWhereInput;
}

export interface ProductSubTab {
  key: string;
  label: string;
  where: Prisma.ProductWhereInput;
}

// Secondary filter row shown under the Phones tab — same brand set/mapping
// the storefront's Header.tsx nav and categoryProductFilter.ts use, so an
// admin's "Samsung" chip here and a shopper's "Samsung Galaxy" link there
// resolve to the exact same products.
export const PHONE_BRAND_SUB_TABS: ProductSubTab[] = [
  { key: 'apple', label: 'Apple / iPhone', where: { brand: { equals: BRAND_SLUG_MAP.apple, mode: 'insensitive' } } },
  { key: 'samsung', label: 'Samsung', where: { brand: { equals: BRAND_SLUG_MAP.samsung, mode: 'insensitive' } } },
  { key: 'tecno', label: 'Tecno', where: { brand: { equals: BRAND_SLUG_MAP.tecno, mode: 'insensitive' } } },
  { key: 'infinix', label: 'Infinix', where: { brand: { equals: BRAND_SLUG_MAP.infinix, mode: 'insensitive' } } },
  { key: 'itel', label: 'itel', where: { brand: { equals: BRAND_SLUG_MAP.itel, mode: 'insensitive' } } },
  { key: 'zte', label: 'ZTE', where: { brand: { equals: BRAND_SLUG_MAP.zte, mode: 'insensitive' } } },
  { key: 'pixel', label: 'Google Pixel', where: { brand: { equals: BRAND_SLUG_MAP.pixel, mode: 'insensitive' } } },
  { key: 'redmi', label: 'Redmi / Xiaomi', where: { brand: { equals: BRAND_SLUG_MAP.redmi, mode: 'insensitive' } } },
];

// Secondary filter row shown under the Screens tab — mirrors the storefront's
// Original/OEM vs Copy quality filter.
export const SCREEN_QUALITY_SUB_TABS: ProductSubTab[] = [
  { key: 'oem', label: 'OEM', where: { specs: { path: ['quality'], equals: QUALITY_SLUG_MAP.oem } } },
  { key: 'original', label: 'Original Service Pack', where: { specs: { path: ['quality'], equals: QUALITY_SLUG_MAP.original } } },
  { key: 'aftermarket', label: 'Aftermarket', where: { specs: { path: ['quality'], equals: QUALITY_SLUG_MAP.aftermarket } } },
  { key: 'copy', label: 'Copy', where: { specs: { path: ['quality'], equals: QUALITY_SLUG_MAP.copy } } },
];

// Maps a PRODUCT_TABS key to the sub-tab row (if any) shown beneath it.
export const SUB_TABS_BY_TAB: Record<string, ProductSubTab[] | undefined> = {
  phones: PHONE_BRAND_SUB_TABS,
  screens: SCREEN_QUALITY_SUB_TABS,
};

export function subTabHref(tabKey: string, subKey?: string): string {
  return subKey ? `/admin/products?tab=${tabKey}&sub=${subKey}` : `/admin/products?tab=${tabKey}`;
}

// Shared between the admin products list (which tab is active) and the
// product edit/create pages (which tab to link "back" to), so the two never
// drift out of sync on what counts as e.g. "Screens".
export const PRODUCT_TABS: ProductTab[] = [
  { key: 'all', label: 'All', where: {} },
  { key: 'phones', label: 'Phones', where: { category: 'PHONE' } },
  { key: 'screens', label: 'Screens', where: { category: 'SPARE_PART', subcategory: 'SCREEN' } },
  { key: 'accessories', label: 'Accessories', where: { category: 'ACCESSORY' } },
  { key: 'kids-tabs', label: 'Kids Tabs', where: { category: 'KIDS_TAB' } },
  { key: 'laptops', label: 'Laptops', where: { category: 'LAPTOP' } },
  {
    key: 'spares-tools',
    label: 'Spares & Tools',
    where: { OR: [{ category: 'REPAIR_TOOL' }, { category: 'SPARE_PART', NOT: { subcategory: 'SCREEN' } }] },
  },
];

// Mirrors each tab's `where` filter so a product can be mapped back to the
// tab it lives under.
export function resolveProductTab(category: string, subcategory: string | null): ProductTab {
  if (category === 'PHONE') return PRODUCT_TABS[1];
  if (category === 'SPARE_PART' && subcategory === 'SCREEN') return PRODUCT_TABS[2];
  if (category === 'ACCESSORY') return PRODUCT_TABS[3];
  if (category === 'KIDS_TAB') return PRODUCT_TABS[4];
  if (category === 'LAPTOP') return PRODUCT_TABS[5];
  return PRODUCT_TABS[6]; // REPAIR_TOOL, or SPARE_PART that isn't a screen
}

export function productTabHref(tab: ProductTab): string {
  return tab.key === 'all' ? '/admin/products' : `/admin/products?tab=${tab.key}`;
}
