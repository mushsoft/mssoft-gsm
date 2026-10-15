import Link from 'next/link';
import { ArrowLeft, KeyRound, MessageCircle, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import UnlockToolsBrowser, { type SoftwareToolGroup } from '@/components/shop/UnlockToolsBrowser';

export const metadata = {
  title: 'Unlock & Flash Tool Credits',
  description:
    'DC-Unlocker, Octoplus, NCK, Miracle, UnlockTool, Chimera and more — unlock/FRP/flash tool credits and activations for repair technicians, priced in Credits at MS Soft GSM.',
  alternates: { canonical: '/shop/unlock-tools' },
};

// No searchParams/cookies/headers usage here, so Next.js would otherwise
// statically prerender this at build time and freeze it at whatever the DB
// held then — admin additions/price-rate changes need to show up without a
// redeploy, so this opts out of that.
export const dynamic = 'force-dynamic';

export default async function UnlockToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const tools = await prisma.softwareTool.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }, { title: 'asc' }],
  });

  const whatsappPhone = '256773944288';

  const groupsMap = new Map<string, SoftwareToolGroup>();
  for (const tool of tools) {
    if (!groupsMap.has(tool.category)) groupsMap.set(tool.category, { category: tool.category, items: [] });
    groupsMap.get(tool.category)!.items.push({
      id: tool.id,
      title: tool.title,
      credits: tool.creditCost,
    });
  }
  const groups = Array.from(groupsMap.values());

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6 min-h-[75vh]">
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
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
              <KeyRound className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                <Sparkles className="h-3 w-3" />
                For Repair Technicians
              </div>
              <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                Unlock &amp; Flash Tool Credits
              </h1>
              <p className="mt-1 max-w-xl text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                DC-Unlocker, Octoplus, NCK, Z3X, Miracle, UnlockTool, Chimera, schematics and more &mdash;
                we top these up for you locally in Credits, no card needed. Find yours below and order on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-3 sm:flex-col sm:items-end">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 px-4 py-2 text-center">
              <div className="text-lg font-black text-amber-400">{tools.length}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">Tools Listed</div>
            </div>
          </div>
        </div>
      </div>

      {tools.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <KeyRound className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No tools listed yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-neutral-500">
              Add entries at /admin/software-tools, or message us directly and we&apos;ll check if we can get it.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              'Hello MS Soft GSM! I am looking for a specific unlock/flash tool credit.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            Ask Us
          </a>
        </div>
      ) : (
        <UnlockToolsBrowser groups={groups} initialQuery={q ?? ''} />
      )}
    </main>
  );
}
