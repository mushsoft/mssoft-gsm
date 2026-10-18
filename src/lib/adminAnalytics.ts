import { prisma } from './prisma';
import { startOfEatDay, eatDateKey } from './eatDate';

const RECENT_VISITS_LIMIT = 30;
const TOP_PRODUCTS_LIMIT = 10;
const TREND_DAYS = 14;

export interface AnalyticsData {
  totalVisits: number;
  visitsToday: number;
  visits7Days: number;
  dailyVisits: { date: string; count: number }[];
  topViewedProducts: { id: string; title: string; views: number }[];
  recentVisits: { id: string; path: string; referrer: string | null; createdAt: Date }[];
}

// Sequential, not Promise.all — see the same note in adminDashboard.ts: running
// multiple Prisma queries concurrently over the shared pooled connection has
// triggered a Postgres protocol error in this environment.
export async function getAnalyticsData(): Promise<AnalyticsData> {
  const startOfToday = startOfEatDay();
  const since = startOfEatDay(TREND_DAYS - 1);

  const totalVisits = await prisma.pageView.count();
  const visitsToday = await prisma.pageView.count({ where: { createdAt: { gte: startOfToday } } });
  const visits7Days = await prisma.pageView.count({ where: { createdAt: { gte: since } } });

  const dailyRows = await prisma.$queryRaw<{ day: Date; count: number }[]>`
    SELECT date_trunc('day', "createdAt" AT TIME ZONE 'Africa/Kampala') as day, COUNT(*) as count
    FROM "PageView"
    WHERE "createdAt" >= ${since}
    GROUP BY day
    ORDER BY day ASC
  `;

  const viewGroups = await prisma.pageView.groupBy({
    by: ['productId'],
    where: { productId: { not: null } },
    _count: { productId: true },
    orderBy: { _count: { productId: 'desc' } },
    take: TOP_PRODUCTS_LIMIT,
  });
  const productIds = viewGroups.map((g) => g.productId).filter((id): id is string => !!id);
  const productRecords =
    productIds.length > 0
      ? await prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, title: true } })
      : [];
  const titleById = new Map(productRecords.map((p) => [p.id, p.title]));
  const topViewedProducts = viewGroups
    .filter((g): g is typeof g & { productId: string } => !!g.productId)
    .map((g) => ({
      id: g.productId,
      title: titleById.get(g.productId) ?? 'Unknown product',
      views: g._count.productId,
    }));

  const recentVisits = await prisma.pageView.findMany({
    orderBy: { createdAt: 'desc' },
    take: RECENT_VISITS_LIMIT,
    select: { id: true, path: true, referrer: true, createdAt: true },
  });

  const visitsByDay = new Map<string, number>();
  for (const row of dailyRows) {
    visitsByDay.set(row.day.toISOString().slice(0, 10), Number(row.count));
  }
  const dailyVisits: { date: string; count: number }[] = [];
  for (let i = 0; i < TREND_DAYS; i++) {
    const key = eatDateKey(TREND_DAYS - 1 - i);
    dailyVisits.push({ date: key, count: visitsByDay.get(key) ?? 0 });
  }

  return { totalVisits, visitsToday, visits7Days, dailyVisits, topViewedProducts, recentVisits };
}
