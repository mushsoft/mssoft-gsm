import Link from 'next/link';
import { ArrowLeft, CircuitBoard, MessageCircle, Sparkles } from 'lucide-react';
import TestpointCard from '@/components/cards/TestpointCard';
import { prisma } from '@/lib/prisma';
import { TESTPOINT_SLUG_MAP, TESTPOINT_TYPES } from '@/lib/testPointTypes';

export default async function TestpointsPage({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string }>;
}) {
  const { sub } = await searchParams;
  const mappedType = sub ? TESTPOINT_SLUG_MAP[sub] : undefined;

  const testpoints = await prisma.testPoint.findMany({
    where: mappedType ? { pointType: mappedType } : undefined,
    orderBy: { createdAt: 'desc' },
  });

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
                Qualcomm EDL testpoints, MTK BROM pinouts, Samsung ISP hardware diagrams, and
                board pinouts &mdash; free reference diagrams for repair technicians, zoom in for detail.
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

      {testpoints.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <CircuitBoard className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No diagrams listed yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              Add entries at /admin/testpoints, or message us directly and we&apos;ll source the
              diagram you need.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              'Hello Phone Hub! I am looking for a specific testpoint diagram.'
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
            const waMessage = `Hello Phone Hub! I have a question about this testpoint diagram:\n\n📌 *${item.title}*`;
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
