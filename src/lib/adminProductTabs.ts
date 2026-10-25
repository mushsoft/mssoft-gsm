import type { Prisma } from '@prisma/client';
import { BRAND_SLUG_MAP, QUALITY_SLUG_MAP } from './categoryProductFilter';
import { CATEGORY_SUBCATEGORIES } from './productSpecFields';

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

// Another filter row shown under the Screens tab, alongside quality — groups
// by the screen's own `brand` field (which phone the panel was made for),
// not the storefront's `fits`/compatibleBrands filter. Curated to the brands
// that actually show up in the catalog in meaningful numbers (~90% of all
// screens); anything else still shows up under "All Screens".
export const SCREEN_BRAND_SUB_TABS: ProductSubTab[] = [
  { key: 'samsung', label: 'Samsung', where: { brand: { equals: 'Samsung', mode: 'insensitive' } } },
  { key: 'tecno', label: 'Tecno', where: { brand: { equals: 'Tecno', mode: 'insensitive' } } },
  { key: 'vivo', label: 'Vivo', where: { brand: { equals: 'Vivo', mode: 'insensitive' } } },
  { key: 'realme', label: 'Realme', where: { brand: { equals: 'Realme', mode: 'insensitive' } } },
  { key: 'motorola', label: 'Motorola', where: { brand: { equals: 'Motorola', mode: 'insensitive' } } },
  { key: 'honor', label: 'Honor', where: { brand: { equals: 'Honor', mode: 'insensitive' } } },
  { key: 'nokia', label: 'Nokia', where: { brand: { equals: 'Nokia', mode: 'insensitive' } } },
  { key: 'apple', label: 'Apple', where: { brand: { equals: 'Apple', mode: 'insensitive' } } },
  { key: 'oppo', label: 'Oppo', where: { brand: { equals: 'Oppo', mode: 'insensitive' } } },
  { key: 'infinix', label: 'Infinix', where: { brand: { equals: 'Infinix', mode: 'insensitive' } } },
  { key: 'google', label: 'Google', where: { brand: { equals: 'Google', mode: 'insensitive' } } },
  { key: 'villaon', label: 'Villaon', where: { brand: { equals: 'Villaon', mode: 'insensitive' } } },
  { key: 'xiaomi', label: 'Xiaomi', where: { brand: { equals: 'Xiaomi', mode: 'insensitive' } } },
  { key: 'zte', label: 'ZTE', where: { brand: { equals: 'ZTE', mode: 'insensitive' } } },
  { key: 'huawei', label: 'Huawei', where: { brand: { equals: 'Huawei', mode: 'insensitive' } } },
  { key: 'itel', label: 'itel', where: { brand: { equals: 'itel', mode: 'insensitive' } } },
  { key: 'tiok', label: 'Tiok', where: { brand: { equals: 'Tiok', mode: 'insensitive' } } },
  { key: 'generic', label: 'Generic / Unbranded', where: { brand: { equals: 'Generic', mode: 'insensitive' } } },
];

// Built from the same CATEGORY_SUBCATEGORIES the admin product form's
// subcategory dropdown uses, so these chips can't drift out of sync with it.
export const ACCESSORY_TYPE_SUB_TABS: ProductSubTab[] = CATEGORY_SUBCATEGORIES.ACCESSORY!.map((s) => ({
  key: s.value.toLowerCase(),
  label: s.label,
  where: { subcategory: s.value },
}));

export const REPAIR_TOOL_TYPE_SUB_TABS: ProductSubTab[] = CATEGORY_SUBCATEGORIES.REPAIR_TOOL!.map((s) => ({
  key: s.value.toLowerCase(),
  label: s.label,
  where: { category: 'REPAIR_TOOL', subcategory: s.value },
}));

// Excludes SCREEN — the Screens tab already owns that subcategory.
export const SPARE_PART_TYPE_SUB_TABS: ProductSubTab[] = CATEGORY_SUBCATEGORIES.SPARE_PART!.filter(
  (s) => s.value !== 'SCREEN'
).map((s) => ({
  key: s.value.toLowerCase(),
  label: s.label,
  where: { category: 'SPARE_PART', subcategory: s.value },
}));

export interface ProductSubTabFacet {
  // Query param this facet's choice is stored under — each facet on a tab
  // needs its own param so picking a screen brand doesn't clobber the
  // quality selection (and vice versa).
  paramKey: string;
  // Label for the chip that clears this facet back to "no filter".
  clearLabel: string;
  options: ProductSubTab[];
}

// Maps a PRODUCT_TABS key to the independent filter row(s) shown beneath it.
// Screens has two: which phone brand the panel fits, and the quality grade.
export const SUB_TAB_FACETS_BY_TAB: Record<string, ProductSubTabFacet[] | undefined> = {
  phones: [{ paramKey: 'sub', clearLabel: 'All Phones', options: PHONE_BRAND_SUB_TABS }],
  screens: [
    { paramKey: 'brand', clearLabel: 'All Brands', options: SCREEN_BRAND_SUB_TABS },
    { paramKey: 'sub', clearLabel: 'All Grades', options: SCREEN_QUALITY_SUB_TABS },
  ],
  accessories: [{ paramKey: 'sub', clearLabel: 'All Accessories', options: ACCESSORY_TYPE_SUB_TABS }],
  'spares-tools': [
    { paramKey: 'sub', clearLabel: 'All Repair Tools', options: REPAIR_TOOL_TYPE_SUB_TABS },
    { paramKey: 'type', clearLabel: 'All Spare Parts', options: SPARE_PART_TYPE_SUB_TABS },
  ],
};

// Builds a sub-tab link that sets `paramKey=value` (or clears it) while
// preserving whatever the tab's *other* facet(s) are currently set to, so
// switching the brand chip doesn't reset the quality chip or vice versa.
export function subTabHref(
  tabKey: string,
  paramKey: string,
  value: string | undefined,
  otherActive: Record<string, string | undefined> = {}
): string {
  const params = new URLSearchParams({ tab: tabKey });
  for (const [key, val] of Object.entries(otherActive)) {
    if (val) params.set(key, val);
  }
  if (value) params.set(paramKey, value);
  return `/admin/products?${params.toString()}`;
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
