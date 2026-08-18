import { prisma } from './prisma';

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
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const since = new Date();
  since.setDate(since.getDate() - (TREND_DAYS - 1));
  since.setHours(0, 0, 0, 0);

  const totalVisits = await prisma.pageView.count();
  const visitsToday = await prisma.pageView.count({ where: { createdAt: { gte: startOfToday } } });
  const visits7Days = await prisma.pageView.count({ where: { createdAt: { gte: since } } });

  const dailyRows = await prisma.$queryRaw<{ day: Date; count: number }[]>`
    SELECT date_trunc('day', "createdAt") as day, COUNT(*) as count
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
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    dailyVisits.push({ date: key, count: visitsByDay.get(key) ?? 0 });
  }

  return { totalVisits, visitsToday, visits7Days, dailyVisits, topViewedProducts, recentVisits };
}
