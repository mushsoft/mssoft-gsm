import { prisma } from './prisma';

const LOW_STOCK_THRESHOLD = 5;
const TREND_DAYS = 30;

export interface DashboardData {
  revenue30Days: number;
  orders30DaysCount: number;
  pendingOrdersCount: number;
  lowStockProducts: { id: string; title: string; stock: number }[];
  dailyRevenue: { date: string; revenue: number }[];
  topProducts: { title: string; unitsSold: number }[];
  fulfillmentBreakdown: { status: string; count: number }[];
}

// Sequential, not Promise.all — running multiple Prisma queries concurrently
// over the shared pooled connection has triggered a Postgres protocol error
// ("bind message supplies N parameters, but prepared statement requires 0")
// in this environment (see ReviewsSection.tsx). A dashboard page is not
// latency-sensitive enough to be worth reintroducing that risk.
export async function getDashboardData(): Promise<DashboardData> {
  const since = new Date();
  since.setDate(since.getDate() - (TREND_DAYS - 1));
  since.setHours(0, 0, 0, 0);

  const revenueAgg = await prisma.order.aggregate({
    where: { paymentStatus: 'SUCCESSFUL', createdAt: { gte: since } },
    _sum: { totalAmount: true },
  });

  const orders30DaysCount = await prisma.order.count({ where: { createdAt: { gte: since } } });

  const pendingOrdersCount = await prisma.order.count({ where: { paymentStatus: 'PENDING' } });

  const lowStockProducts = await prisma.product.findMany({
    where: { stock: { lte: LOW_STOCK_THRESHOLD } },
    orderBy: { stock: 'asc' },
    take: 10,
    select: { id: true, title: true, stock: true },
  });

  const dailyRows = await prisma.$queryRaw<{ day: Date; revenue: number }[]>`
    SELECT date_trunc('day', "createdAt") as day, SUM("totalAmount") as revenue
    FROM "Order"
    WHERE "paymentStatus" = 'SUCCESSFUL' AND "createdAt" >= ${since}
    GROUP BY day
    ORDER BY day ASC
  `;

  const topItemGroups = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  });
  const topProductIds = topItemGroups.map((g) => g.productId);
  const topProductRecords =
    topProductIds.length > 0
      ? await prisma.product.findMany({ where: { id: { in: topProductIds } }, select: { id: true, title: true } })
      : [];
  const topProductTitleById = new Map(topProductRecords.map((p) => [p.id, p.title]));
  const topProducts = topItemGroups.map((g) => ({
    title: topProductTitleById.get(g.productId) ?? 'Unknown product',
    unitsSold: g._sum.quantity ?? 0,
  }));

  const fulfillmentGroups = await prisma.order.groupBy({ by: ['fulfillmentStatus'], _count: true });
  const fulfillmentBreakdown = fulfillmentGroups.map((g) => ({ status: g.fulfillmentStatus, count: g._count }));

  const revenueByDay = new Map<string, number>();
  for (const row of dailyRows) {
    revenueByDay.set(row.day.toISOString().slice(0, 10), Number(row.revenue));
  }
  const dailyRevenue: { date: string; revenue: number }[] = [];
  for (let i = 0; i < TREND_DAYS; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    dailyRevenue.push({ date: key, revenue: revenueByDay.get(key) ?? 0 });
  }

  return {
    revenue30Days: revenueAgg._sum.totalAmount ?? 0,
    orders30DaysCount,
    pendingOrdersCount,
    lowStockProducts,
    dailyRevenue,
    topProducts,
    fulfillmentBreakdown,
  };
}
