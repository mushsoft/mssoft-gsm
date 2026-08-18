import Link from 'next/link';
import {
  CircuitBoard,
  GraduationCap,
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
import { prisma } from '@/lib/prisma';
import CatalogProductCard from '@/components/cards/CatalogProductCard';
import GlowOrbs from '@/components/motion/GlowOrbs';
import HeroContent from '@/components/motion/HeroContent';
import Marquee from '@/components/motion/Marquee';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

export const metadata = {
  title: 'MS Soft GSM | Phones, Spare Parts & Technician Support Uganda',
  description:
    'Genuine phones, screens, batteries, accessories and repair tools in Uganda. Instant checkout or order via WhatsApp — fast delivery across Kampala & East Africa.',
};

// Featured products come from the live database — revalidate periodically
// instead of freezing "Latest Arrivals" and stock levels at build time.
export const revalidate = 60;

const CATEGORY_TILES: { label: string; href: string; icon: LucideIcon; blurb: string }[] = [
  { label: 'Phones', href: '/shop/phones', icon: Smartphone, blurb: 'Brand new & UK used' },
  { label: 'Testpoints', href: '/shop/testpoints', icon: CircuitBoard, blurb: 'EDL / BROM / ISP' },
  { label: 'Screens & Spares', href: '/shop/screens', icon: Layers, blurb: 'Batteries, flex, glass' },
  { label: 'Repair Tools', href: '/shop/tools', icon: Wrench, blurb: 'Blowers, scopes, irons' },
  { label: 'Accessories', href: '/shop/accessories', icon: Package, blurb: 'Chargers, cases, buds' },
  { label: 'Learn to Repair', href: '/learn-to-repair', icon: GraduationCap, blurb: 'Free video guides' },
];

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

export default async function HomePage() {
  const featuredProducts = await prisma.product
    .findMany({ orderBy: { createdAt: 'desc' }, take: 8 })
    .catch(() => []);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-10">
        <GlowOrbs />
        <HeroContent />
      </div>

      <Marquee items={BRAND_TICKER} />

      {/* Category Tiles */}
      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Shop by Category</h2>
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_TILES.map(({ label, href, icon: Icon, blurb }) => (
            <StaggerItem key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{label}</div>
                <div className="text-[10px] text-neutral-500">{blurb}</div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

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

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div>
          <Reveal className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Latest Arrivals</h2>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hello Phone Hub! I want to see what is currently in stock.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-500 hover:underline"
            >
              Ask What&apos;s In Stock →
            </a>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <CatalogProductCard product={product} fallbackIcon={CATEGORY_ICON[product.category] ?? Package} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      )}
    </main>
  );
}
