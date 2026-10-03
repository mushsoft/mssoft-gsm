import type { Prisma } from '@prisma/client';

export interface ProductTab {
  key: string;
  label: string;
  where: Prisma.ProductWhereInput;
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

export function getProductTab(key: string | undefined): ProductTab | undefined {
  return PRODUCT_TABS.find((t) => t.key === key);
}

// Mirrors each tab's `where` filter so a product can be mapped back to the
// tab it lives under, for products list links that didn't carry a `?tab=`.
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
