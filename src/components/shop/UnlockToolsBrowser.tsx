'use client';

import { useMemo, useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';

export type PricedSoftwareTool = {
  id: string;
  title: string;
  priceUgx: number;
};

export type SoftwareToolGroup = {
  category: string;
  items: PricedSoftwareTool[];
};

const WHATSAPP_PHONE = '256773944288';

export default function UnlockToolsBrowser({
  groups,
  initialQuery = '',
}: {
  groups: SoftwareToolGroup[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        category: g.category,
        items: g.items.filter(
          (item) => item.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tool or vendor name, e.g. Octoplus, NCK, Samsung..."
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-2.5 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {filteredGroups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-10 text-center text-sm text-neutral-500">
          No matches for &quot;{query}&quot;. Message us on WhatsApp &mdash; we likely still have it.
        </div>
      ) : (
        filteredGroups.map((group) => (
          <div key={group.category} className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-amber-600 dark:text-amber-400">
              {group.category}
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {group.items.map((item) => {
                const waMessage = `Hello MS Soft GSM! I'd like to order this:\n\n🔑 *${item.title}*\n💰 ${item.priceUgx.toLocaleString()} Credits`;
                const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 bg-white dark:bg-neutral-950/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 sm:pr-4">
                      {item.title}
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-black text-neutral-900 dark:text-white whitespace-nowrap">
                        {item.priceUgx.toLocaleString()} Credits
                      </span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-emerald-500"
                      >
                        <MessageCircle className="h-3.5 w-3.5 fill-current" />
                        Order
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
