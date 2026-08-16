import { Smartphone, Layers, Headphones, Wrench, Cpu, type LucideIcon } from 'lucide-react';
import type { ProductCategory } from './productSpecFields';

export interface CategoryRouteDef {
  slug: string;
  category: ProductCategory;
  label: string;
  description: string;
  icon: LucideIcon;
}

// Drives the /admin/products/new/[category] routes — one dedicated creation
// form per category, replacing a single form with a category dropdown.
export const PRODUCT_CATEGORY_ROUTES: CategoryRouteDef[] = [
  { slug: 'phone', category: 'PHONE', label: 'Phone', description: 'Brand new or UK used smartphones.', icon: Smartphone },
  {
    slug: 'spare-part',
    category: 'SPARE_PART',
    label: 'Spare Part',
    description: 'Screens, batteries, charging flex, cameras, and more.',
    icon: Layers,
  },
  {
    slug: 'accessory',
    category: 'ACCESSORY',
    label: 'Accessory',
    description: 'Chargers, cases, cables, earphones, screen protectors.',
    icon: Headphones,
  },
  {
    slug: 'repair-tool',
    category: 'REPAIR_TOOL',
    label: 'Repair Tool',
    description: 'Soldering, testing, and opening tools.',
    icon: Wrench,
  },
  { slug: 'kids-tab', category: 'KIDS_TAB', label: 'Kids Tab', description: 'Educational tablets for children.', icon: Cpu },
];

export function getCategoryRoute(slug: string): CategoryRouteDef | undefined {
  return PRODUCT_CATEGORY_ROUTES.find((r) => r.slug === slug);
}

export function getCategoryRouteByCategory(category: string): CategoryRouteDef | undefined {
  return PRODUCT_CATEGORY_ROUTES.find((r) => r.category === category);
}
