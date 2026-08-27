import Link from 'next/link';
import {
  Headphones,
  Layers,
  MessageCircle,
  Package,
  ShieldCheck,
  Smartphone,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import CatalogProductCard from '@/components/cards/CatalogProductCard';
import TestpointCard from '@/components/cards/TestpointCard';
import GlowOrbs from '@/components/motion/GlowOrbs';
import HeroContent from '@/components/motion/HeroContent';
import Marquee from '@/components/motion/Marquee';
import Reveal from '@/components/motion/Reveal';
import ScrollingRow from '@/components/motion/ScrollingRow';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { TESTPOINT_TYPES } from '@/lib/testPointTypes';

export const metadata = {
  title: 'MS Soft GSM | Phones, Spare Parts & Technician Support Uganda',
  description:
    'Genuine phones, screens, batteries, accessories and repair tools in Uganda. Instant checkout or order via WhatsApp, with fast delivery across Kampala & East Africa.',
};

// Featured products come from the live database — revalidate periodically
// instead of freezing "Latest Arrivals" and stock levels at build time.
export const revalidate = 60;

const CATEGORY_ICON: Record<string, LucideIcon> = {
  PHONE: Smartphone,
  ACCESSORY: Package,
  SPARE_PART: Layers,
  REPAIR_TOOL: Wrench,
};

const BRAND_TICKER = [
  'Samsung', 'Apple', 'Tecno', 'Infinix', 'Xiaomi', 'itel', 'Vivo', 'Oppo', 'Realme', 'Nokia', 'Huawei', 'Honor',
];

const WHATSAPP_PHONE = '256773944288';
// Roughly matches ScrollingRow's original 26s/4-item pacing (~6.5s per card)
// so the scroll speed feels the same however many items a rail has.
const SECONDS_PER_CARD = 6.5;
const MIN_SCROLL_SECONDS = 14;
// Below this, a scrolling row just looks like a few cards adrift in empty
// space on a wide screen — a plain grid (cards stretch to fill their column)
// reads far better for a lightly-stocked category than an auto-scroll would.
const MIN_ITEMS_TO_SCROLL = 6;

function railDuration(itemCount: number): number {
  return Math.max(itemCount * SECONDS_PER_CARD, MIN_SCROLL_SECONDS);
}

function testpointCardProps(item: Prisma.TestPointGetPayload<object>) {
  const waMessage = `Hello Phone Hub! I have a question about this testpoint diagram:\n\n📌 *${item.title}*`;
  return {
    title: item.title,
    imageUrl: item.diagramUrl || undefined,
    brand: item.brand,
    modelName: item.modelName,
    chipset: item.chipset,
    pointTypeLabel: TESTPOINT_TYPES.find((t) => t.value === item.pointType)?.label,
    notes: item.notes,
    whatsappUrl: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`,
  };
}

// Mirrors the shop/[category] page's own CATEGORY_MAP so "View All" always
// lands on a page that actually shows more of the same products.
const PRODUCT_RAILS: { key: string; label: string; href: string; where: Prisma.ProductWhereInput }[] = [
  { key: 'phones', label: 'Phones', href: '/shop/phones', where: { category: 'PHONE' } },
  { key: 'screens', label: 'Screens', href: '/shop/screens', where: { category: 'SPARE_PART', subcategory: 'SCREEN' } },
  { key: 'tools', label: 'Repair Tools', href: '/shop/tools', where: { category: 'REPAIR_TOOL' } },
  { key: 'accessories', label: 'Accessories', href: '/shop/accessories', where: { category: 'ACCESSORY' } },
  { key: 'spares', label: 'Other Spares', href: '/shop/spares', where: { category: 'SPARE_PART', NOT: { subcategory: 'SCREEN' } } },
  { key: 'kids-tabs', label: 'Kids Tabs', href: '/shop/kids-tabs', where: { category: 'KIDS_TAB' } },
];

interface ProductRailData {
  key: string;
  label: string;
  href: string;
  products: Prisma.ProductGetPayload<object>[];
}

export default async function HomePage() {
  // Sequential, not Promise.all — concurrent Prisma queries over the shared
  // pooled connection have triggered a Postgres protocol error in this
  // environment (see adminDashboard.ts).
  const productRails: ProductRailData[] = [];
  for (const rail of PRODUCT_RAILS) {
    const products = await prisma.product
      .findMany({ where: rail.where, orderBy: { createdAt: 'desc' } })
      .catch((error) => {
        // A caught failure here silently renders as "no products in this
        // category" rather than an error page — logging it is the only way
        // to tell that apart from a genuinely empty category, especially
        // since this page is ISR-cached (revalidate = 60) and would
        // otherwise serve a blank rail to visitors for up to a minute.
        console.error(`Homepage: failed to load "${rail.label}" rail`, error);
        return [];
      });
    if (products.length > 0) productRails.push({ key: rail.key, label: rail.label, href: rail.href, products });
  }

  const latestTestpoints = await prisma.testPoint.findMany({ orderBy: { createdAt: 'desc' } }).catch((error) => {
    console.error('Homepage: failed to load testpoints rail', error);
    return [];
  });

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-8">
      <AutoRefresh intervalMs={30000} />
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-5 sm:p-8 lg:p-14">
        <GlowOrbs />
        <HeroContent />
      </div>

      <Marquee items={BRAND_TICKER} />

      {/* Trust Strip */}
      <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: ShieldCheck, title: 'Genuine Parts', blurb: 'Tech certified' },
          { icon: Truck, title: 'Fast Delivery', blurb: 'Across East Africa' },
          { icon: MessageCircle, title: 'WhatsApp Support', blurb: '24/7 response' },
          { icon: Headphones, title: 'Repair Guidance', blurb: 'Free technician tips' },
        ].map(({ icon: Icon, title, blurb }) => (
          <StaggerItem key={title}>
            <div className="flex h-full items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700">
              <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-500">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">{title}</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{blurb}</div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Latest Arrivals, grouped by category — Phones first, then Testpoints, then the rest */}
      {productRails.find((r) => r.key === 'phones') && (
        <ProductRail rail={productRails.find((r) => r.key === 'phones')!} />
      )}

      {latestTestpoints.length > 0 && (
        <div>
          <Reveal className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Latest in Testpoints
            </h2>
            <Link href="/shop/testpoints" className="text-xs font-bold text-amber-500 hover:underline">
              View All →
            </Link>
          </Reveal>
          {latestTestpoints.length >= MIN_ITEMS_TO_SCROLL ? (
            <ScrollingRow durationSeconds={railDuration(latestTestpoints.length)}>
              {[...latestTestpoints, ...latestTestpoints].map((item, i) => (
                <div key={`${item.id}-${i}`} className="w-40 shrink-0 sm:w-48 lg:w-56">
                  <TestpointCard {...testpointCardProps(item)} />
                </div>
              ))}
            </ScrollingRow>
          ) : (
            <StaggerGroup className="flex flex-wrap justify-center gap-4">
              {latestTestpoints.map((item) => (
                <StaggerItem key={item.id} className="w-48 sm:w-56 lg:w-72">
                  <TestpointCard {...testpointCardProps(item)} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      )}

      {productRails
        .filter((r) => r.key !== 'phones')
        .map((rail) => (
          <ProductRail key={rail.key} rail={rail} />
        ))}
    </main>
  );
}

function ProductRail({ rail }: { rail: ProductRailData }) {
  return (
    <div>
      <Reveal className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Latest in {rail.label}
        </h2>
        <Link href={rail.href} className="text-xs font-bold text-amber-500 hover:underline">
          View All →
        </Link>
      </Reveal>
      {rail.products.length >= MIN_ITEMS_TO_SCROLL ? (
        <ScrollingRow durationSeconds={railDuration(rail.products.length)}>
          {[...rail.products, ...rail.products].map((product, i) => (
            <div key={`${product.id}-${i}`} className="w-40 shrink-0 sm:w-48 lg:w-56">
              <CatalogProductCard product={product} fallbackIcon={CATEGORY_ICON[product.category] ?? Package} />
            </div>
          ))}
        </ScrollingRow>
      ) : (
        <StaggerGroup className="flex flex-wrap justify-center gap-4">
          {rail.products.map((product) => (
            <StaggerItem key={product.id} className="w-48 sm:w-56 lg:w-72">
              <CatalogProductCard product={product} fallbackIcon={CATEGORY_ICON[product.category] ?? Package} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
