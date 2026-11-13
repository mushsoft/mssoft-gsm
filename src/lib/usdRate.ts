import 'server-only';

// The UGX shown under each unlock-tool price follows the live USD→UGX market
// rate plus an add-on the admin sets (ShopProfile.usdRateAddonUgx), so
// shilling prices move with the dollar without anyone editing the rate.
// Cached for an hour — the sources only update about daily, and this keeps
// every page view from calling them.
const CACHE_SECONDS = 3600;
const DEFAULT_ADDON = 99; // matches the column default

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
  addon: number;
  rate: number; // marketRate + addon — what prices use
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

// Takes the shop profile's two settings: the add-on, and the backup rate
// (creditRateUgx) used only if every source is down, so the page never
// shows a missing price.
export async function getUsdRate(profile: { usdRateAddonUgx: number; creditRateUgx: number }): Promise<UsdRate> {
  const market = await fetchMarketRate();
  const marketRate = market?.value ?? profile.creditRateUgx;
  // Guard so a missing value (e.g. a stale Prisma client before the column
  // existed) can never turn every price into NaN.
  const addon = Number.isFinite(profile.usdRateAddonUgx) ? profile.usdRateAddonUgx : DEFAULT_ADDON;
  return {
    marketRate,
    addon,
    rate: marketRate + addon,
    live: market !== null,
    source: market?.source ?? 'saved rate in admin settings',
  };
}
