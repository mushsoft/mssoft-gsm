import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { ArrowLeft, CircuitBoard, MessageCircle, Search, Sparkles, X } from 'lucide-react';
import TestpointCard from '@/components/cards/TestpointCard';
import { prisma } from '@/lib/prisma';
import { rankByRelevance, tokenizeQuery, tokenWhereConditions } from '@/lib/searchQuery';
import { TESTPOINT_SEARCH_FIELDS, TESTPOINT_SEARCH_IGNORE, testpointRankFields } from '@/lib/testPointSearch';
import { TESTPOINT_SLUG_MAP, TESTPOINT_TYPES } from '@/lib/testPointTypes';

export const metadata = {
  title: 'Testpoint Diagrams: EDL, BROM & ISP',
  description: 'Qualcomm EDL, MediaTek BROM and ISP testpoint diagrams for phone repair technicians. Find the exact testpoint for your device model at MS Soft GSM.',
  alternates: { canonical: '/shop/testpoints' },
};

export default async function TestpointsPage({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string; q?: string }>;
}) {
  const { sub, q } = await searchParams;
  const mappedType = sub ? TESTPOINT_SLUG_MAP[sub] : undefined;
  const trimmedQuery = q?.trim();
  const tokens = trimmedQuery ? tokenizeQuery(trimmedQuery, { ignore: TESTPOINT_SEARCH_IGNORE }) : [];

  const matches = await prisma.testPoint.findMany({
    where: {
      ...(mappedType ? { pointType: mappedType } : {}),
      ...(tokens.length
        ? { AND: tokenWhereConditions<Prisma.TestPointWhereInput>(tokens, TESTPOINT_SEARCH_FIELDS) }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
  const testpoints = rankByRelevance(matches, tokens, trimmedQuery ?? '', testpointRankFields);

  // ?sub= slug for each type chip — the reverse of TESTPOINT_SLUG_MAP.
  const typeChips = Object.entries(TESTPOINT_SLUG_MAP).map(([slug, value]) => ({
    slug,
    label: TESTPOINT_TYPES.find((t) => t.value === value)?.label ?? value,
  }));
  const chipHref = (slug?: string) => {
    const params = new URLSearchParams();
    if (slug) params.set('sub', slug);
    if (trimmedQuery) params.set('q', trimmedQuery);
    const qs = params.toString();
    return qs ? `/shop/testpoints?${qs}` : '/shop/testpoints';
  };

  const whatsappPhone = '256773944288';
  const brandCount = new Set(testpoints.map((item) => item.brand).filter(Boolean)).size;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 min-h-[75vh]">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
              <CircuitBoard className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                <Sparkles className="h-3 w-3" />
                Hardware Diagrams
              </div>
              <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                Testpoints &amp; Schematics
              </h1>
              <p className="mt-1 max-w-xl text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                Free testpoint and hardware diagrams for repair technicians: Qualcomm EDL,
                MTK BROM, Samsung ISP and more, added as we document them. Zoom in for detail.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-3 sm:flex-col sm:items-end">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 px-4 py-2 text-center">
              <div className="text-lg font-black text-amber-400">{testpoints.length}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                Diagrams
              </div>
            </div>
            {brandCount > 0 && (
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 px-4 py-2 text-center">
                <div className="text-lg font-black text-amber-400">{brandCount}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  Brands
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Plain GET form — works without JS, and keeps the active type filter. */}
        <form action="/shop/testpoints" method="get" className="relative">
          {sub && mappedType && <input type="hidden" name="sub" value={sub} />}
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            name="q"
            defaultValue={trimmedQuery}
            placeholder="Search by brand, model or chipset, e.g. Redmi Note 9, Spark 8, MT6765"
            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-2.5 pl-9 pr-24 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-neutral-950 transition-colors hover:bg-amber-400"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {[{ slug: undefined, label: 'All types' }, ...typeChips].map((chip) => {
            const active = chip.slug ? sub === chip.slug : !mappedType;
            return (
              <Link
                key={chip.slug ?? 'all'}
                href={chipHref(chip.slug)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-amber-500/50 hover:text-amber-500'
                }`}
              >
                {chip.label}
              </Link>
            );
          })}
          {trimmedQuery && (
            <Link
              href={mappedType ? `/shop/testpoints?sub=${sub}` : '/shop/testpoints'}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-amber-500"
            >
              <X className="h-3.5 w-3.5" />
              Clear search
            </Link>
          )}
        </div>
      </div>

      {testpoints.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <CircuitBoard className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
              {trimmedQuery ? `No matches for "${trimmedQuery}"` : 'No diagrams listed yet'}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              {trimmedQuery
                ? "Try a different model name, or message us directly and we'll source the diagram you need."
                : "Add entries at /admin/testpoints, or message us directly and we'll source the diagram you need."}
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              'Hello MS Soft GSM! I am looking for a specific testpoint diagram.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            Request a Diagram
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {testpoints.map((item) => {
            const waMessage = `Hello MS Soft GSM! I have a question about this testpoint diagram:\n\n📌 *${item.title}*`;
            const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

            return (
              <TestpointCard
                key={item.id}
                title={item.title}
                imageUrl={item.diagramUrl || undefined}
                brand={item.brand}
                modelName={item.modelName}
                chipset={item.chipset}
                pointTypeLabel={TESTPOINT_TYPES.find((t) => t.value === item.pointType)?.label}
                notes={item.notes}
                whatsappUrl={whatsappUrl}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
