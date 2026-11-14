'use client';

import { useMemo, useState } from 'react';
import { MessageCircle, Search, Wrench } from 'lucide-react';
import { formatUsd } from '@/lib/softwareToolPricing';
import OrderToolModal, { type OrderableTool, type WalletState } from './OrderToolModal';

export type PricedSoftwareTool = {
  id: string;
  title: string;
  // Price of the item, or of one credit when perCredit is true.
  priceUgx: number;
  priceUsd: number;
  perCredit: boolean;
};

// Repeating diagonal "UNDER MAINTENANCE" tile, drawn over the tool list while
// ordering is paused.
const MAINTENANCE_WATERMARK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='340' height='200'><text x='170' y='110' text-anchor='middle' transform='rotate(-24 170 100)' font-family='Arial, sans-serif' font-size='26' font-weight='900' letter-spacing='2' fill='rgba(245,158,11,0.32)'>UNDER MAINTENANCE</text></svg>`
)}")`;

const orderButtonClass =
  'inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-emerald-500';

export type SoftwareToolGroup = {
  category: string;
  items: PricedSoftwareTool[];
};

export default function UnlockToolsBrowser({
  groups,
  initialQuery = '',
  whatsappPhone,
  wallet,
  orderingPaused = false,
}: {
  groups: SoftwareToolGroup[];
  initialQuery?: string;
  whatsappPhone: string;
  wallet: WalletState;
  // While paused, "Order" goes to the maintenance notice instead of the form.
  orderingPaused?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [ordering, setOrdering] = useState<OrderableTool | null>(null);

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
      {orderingPaused && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
          <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-black text-neutral-900 dark:text-white">Under maintenance</p>
            <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">
              Ordering unlock &amp; flash tools is paused while we update things. You can still browse and search
              prices. Please check back soon.
            </p>
          </div>
        </div>
      )}

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

      {/* Maintenance: the list is softly blurred under a repeating watermark
          and made inert (no clicks, taps or keyboard focus), but still
          scrolls and stays readable so customers can see prices. */}
      <div className="relative">
      <div
        inert={orderingPaused}
        className={orderingPaused ? 'select-none space-y-6 blur-[1px] opacity-80' : 'space-y-6'}
      >
      {filteredGroups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-10 text-center text-sm text-neutral-500">
          No matches for &quot;{query}&quot;. Message us on WhatsApp, we likely still have it.
        </div>
      ) : (
        filteredGroups.map((group) => (
          <div key={group.category} className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-amber-600 dark:text-amber-400">
              {group.category}
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 bg-white dark:bg-neutral-950/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 sm:pr-4">
                    {item.title}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="flex flex-col items-end whitespace-nowrap leading-tight">
                      <span className="text-sm font-black text-neutral-900 dark:text-white">
                        {formatUsd(item.priceUsd)}
                        {item.perCredit && <span className="text-[10px] font-semibold text-neutral-500"> / credit</span>}
                      </span>
                      <span className="text-[10px] text-neutral-500">≈ UGX {item.priceUgx.toLocaleString()}</span>
                    </span>
                    <button
                      type="button"
                      disabled={orderingPaused}
                      onClick={() => setOrdering({ ...item, category: group.category })}
                      className={`${orderButtonClass} disabled:bg-neutral-400 disabled:dark:bg-neutral-700`}
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-current" />
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      </div>
      {orderingPaused && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ backgroundImage: MAINTENANCE_WATERMARK, backgroundRepeat: 'repeat', backgroundSize: '340px 200px' }}
        />
      )}
      </div>

      {ordering && (
        <OrderToolModal tool={ordering} whatsappPhone={whatsappPhone} wallet={wallet} onClose={() => setOrdering(null)} />
      )}
    </div>
  );
}
