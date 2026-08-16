import { Cpu, Layers, Package, Smartphone, Wrench, type LucideIcon } from 'lucide-react';

export const CATEGORY_ICON: Record<string, LucideIcon> = {
  PHONE: Smartphone,
  ACCESSORY: Package,
  SPARE_PART: Layers,
  REPAIR_TOOL: Wrench,
  KIDS_TAB: Cpu,
};
