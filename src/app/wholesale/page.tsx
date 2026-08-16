import Link from 'next/link';
import { ArrowLeft, Boxes, MessageCircle, ShieldCheck, Timer, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Technician Wholesale',
  description: 'Bulk pricing, priority stock, and dedicated support for repair technicians and shops.',
};

const PERKS = [
  {
    icon: Boxes,
    title: 'Bulk Pricing',
    description: 'Discounted per-unit pricing on screens, batteries, charging flexes, and accessories when you buy in volume.',
  },
  {
    icon: Timer,
    title: 'Priority Stock Access',
    description: 'First access to new arrivals and fast-moving parts before they hit the general shop listings.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Support Line',
    description: 'A dedicated WhatsApp line for quotes, part sourcing requests, and order updates — no waiting in the general queue.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine, Tested Parts',
    description: 'Every part is tested before it ships, so what you install for your customers holds up.',
  },
];

export default function WholesalePage() {
  const whatsappNumber = '256755754880';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Phone Hub! I'm a repair technician/shop interested in wholesale pricing. Here's a bit about my shop:\n\nShop name:\nLocation:\nParts I typically need:"
  )}`;

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
            <Wrench className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
              For Repair Shops & Technicians
            </div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
              Technician Wholesale
            </h1>
            <p className="mt-1 max-w-xl text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
              Buying parts for your shop, not just one repair? Get bulk pricing and priority support.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PERKS.map((perk) => (
          <div
            key={perk.title}
            className="flex items-start gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <perk.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{perk.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{perk.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-center">
        <h2 className="text-base font-bold text-neutral-900 dark:text-white">How it works</h2>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
          Message us on WhatsApp with your shop details and the parts you typically stock or need. We&apos;ll set
          you up with a wholesale quote and a direct line for future orders no minimum order size required to
          get started.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-500"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          Chat With Us on WhatsApp
        </a>
      </div>
    </main>
  );
}
