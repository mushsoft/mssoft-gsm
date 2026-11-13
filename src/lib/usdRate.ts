import 'server-only';

// The UGX shown under each unlock-tool price follows the live USD→UGX market
// rate plus a fixed add-on, so shilling prices move with the dollar without
// anyone editing a setting. Cached for an hour — the sources only update
// about daily, and this keeps every page view from calling them.
export const UGX_RATE_ADDON = 99;
const CACHE_SECONDS = 3600;

// Free, keyless sources, tried in order. fawazahmed0's currency-api tracks
// close to what Google shows; exchangerate-api is a backup.
const SOURCES: { name: string; url: string; pick: (json: unknown) => unknown }[] = [
  {
    name: 'currency-api (jsDelivr)',
    url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    pick: (j) => (j as { usd?: { ugx?: unknown } }).usd?.ugx,
  },
  {
    name: 'currency-api (Cloudflare)',
    url: 'https://latest.currency-api.pages.dev/v1/currencies/usd.json',
    pick: (j) => (j as { usd?: { ugx?: unknown } }).usd?.ugx,
  },
  {
    name: 'exchangerate-api',
    url: 'https://open.er-api.com/v6/latest/USD',
    pick: (j) => (j as { rates?: { UGX?: unknown } }).rates?.UGX,
  },
];

// Anything outside this is a broken response, not a real rate.
const PLAUSIBLE = { min: 2000, max: 10000 };

export interface UsdRate {
  marketRate: number; // UGX per USD from the source (or the fallback)
  rate: number; // marketRate + UGX_RATE_ADDON — what prices use
  live: boolean; // false when every source failed and the fallback was used
  source: string;
}

async function fetchMarketRate(): Promise<{ value: number; source: string } | null> {
  for (const source of SOURCES) {
    try {
      const res = await fetch(source.url, {
        next: { revalidate: CACHE_SECONDS },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      const value = Number(source.pick(await res.json()));
      if (Number.isFinite(value) && value >= PLAUSIBLE.min && value <= PLAUSIBLE.max) {
        return { value, source: source.name };
      }
    } catch {
      // Try the next source.
    }
  }
  return null;
}

// fallbackMarketRate: used only if every source is down — the admin's saved
// rate (ShopProfile.creditRateUgx), so the page never shows a missing price.
export async function getUsdRate(fallbackMarketRate: number): Promise<UsdRate> {
  const market = await fetchMarketRate();
  const marketRate = market?.value ?? fallbackMarketRate;
  return {
    marketRate,
    rate: marketRate + UGX_RATE_ADDON,
    live: market !== null,
    source: market?.source ?? 'saved rate in admin settings',
  };
}
