import Link from 'next/link';
import { Layers, MessageCircle, Package, Smartphone, Stethoscope, Wrench, type LucideIcon } from 'lucide-react';
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
const PRODUCT_RAILS: { key: string; label: string; eyebrow: string; href: string; where: Prisma.ProductWhereInput }[] = [
  { key: 'phones', label: 'Phones', eyebrow: 'For the Counter', href: '/shop/phones', where: { category: 'PHONE' } },
  {
    key: 'screens',
    label: 'Screens',
    eyebrow: 'Screens & Displays',
    href: '/shop/screens',
    where: { category: 'SPARE_PART', subcategory: 'SCREEN' },
  },
  { key: 'tools', label: 'Repair Tools', eyebrow: 'For the Bench', href: '/shop/tools', where: { category: 'REPAIR_TOOL' } },
  { key: 'accessories', label: 'Accessories', eyebrow: 'Everyday Carry', href: '/shop/accessories', where: { category: 'ACCESSORY' } },
  {
    key: 'spares',
    label: 'Other Spares',
    eyebrow: 'Spare Parts',
    href: '/shop/spares',
    where: { category: 'SPARE_PART', NOT: { subcategory: 'SCREEN' } },
  },
  { key: 'kids-tabs', label: 'Kids Tabs', eyebrow: 'For the Kids', href: '/shop/kids-tabs', where: { category: 'KIDS_TAB' } },
];

interface ProductRailData {
  key: string;
  label: string;
  eyebrow: string;
  href: string;
  products: Prisma.ProductGetPayload<object>[];
}

function RailHeader({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <Reveal className="mb-4 flex items-end justify-between gap-3">
      <div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">{eyebrow}</div>
        <h2 className="mt-1 text-xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-2xl">{title}</h2>
      </div>
      <Link href={href} className="shrink-0 text-xs font-bold text-amber-500 hover:underline">
        View All →
      </Link>
    </Reveal>
  );
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
    if (products.length > 0) {
      productRails.push({ key: rail.key, label: rail.label, eyebrow: rail.eyebrow, href: rail.href, products });
    }
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
          { number: '01', title: 'Genuine Parts', blurb: 'Sourced & verified' },
          { number: '02', title: 'Fast Delivery', blurb: 'Across East Africa' },
          { number: '03', title: 'WhatsApp Support', blurb: 'A technician replies' },
          { number: '04', title: 'Repair Guidance', blurb: 'Free technician tips' },
        ].map(({ number, title, blurb }) => (
          <StaggerItem key={title}>
            <div className="flex h-full items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500">
                {number}
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">{title}</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{blurb}</div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Technician Lane CTA */}
      <Reveal className="overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Technician Lane</div>
            <h2 className="mt-1 text-xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
              Buying in bulk, or fixing a board?
            </h2>
            <p className="mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
              Get the right testpoint diagram, wholesale pricing, or a second pair of eyes on a stubborn
              fault — talk to a real technician, not a chatbot.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello! I have a technician question / bulk order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              WhatsApp the Bench
            </a>
            <Link
              href="/account/repair-requests"
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-colors hover:border-amber-500/50 hover:text-amber-500"
            >
              <Stethoscope className="h-3.5 w-3.5" />
              Ask a Technician
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Latest Arrivals, grouped by category — Phones first, then Testpoints, then the rest */}
      {productRails.find((r) => r.key === 'phones') && (
        <ProductRail rail={productRails.find((r) => r.key === 'phones')!} />
      )}

      {latestTestpoints.length > 0 && (
        <div>
          <RailHeader eyebrow="Diagram Library" title="Latest in Testpoints" href="/shop/testpoints" />
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
      <RailHeader eyebrow={rail.eyebrow} title={`Latest in ${rail.label}`} href={rail.href} />
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
