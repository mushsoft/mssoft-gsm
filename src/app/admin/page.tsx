import Link from 'next/link';
import { AlertTriangle, LayoutDashboard, Package, TrendingUp } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { getDashboardData } from '@/lib/adminDashboard';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import RevenueTrendChart from '@/components/admin/RevenueTrendChart';
import { FulfillmentStatusBadge } from '@/components/admin/OrderStatusBadge';

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-xl font-black text-neutral-900 dark:text-white">{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  await requireAdminPage();

  const data = await getDashboardData();

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={15000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Dashboard</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Last 30 days</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Revenue (30d)" value={`UGX ${data.revenue30Days.toLocaleString()}`} />
        <StatTile label="Orders (30d)" value={data.orders30DaysCount.toLocaleString()} />
        <StatTile label="Pending Orders" value={data.pendingOrdersCount.toLocaleString()} />
        <StatTile label="Low Stock Items" value={data.lowStockProducts.length.toLocaleString()} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
          <TrendingUp className="h-3.5 w-3.5" />
          Daily Revenue
        </div>
        <RevenueTrendChart data={data.dailyRevenue} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <Package className="h-3.5 w-3.5" />
            Top Products (30d)
          </div>
          {data.topProducts.length === 0 ? (
            <p className="text-xs text-neutral-500">No sales yet.</p>
          ) : (
            <ul className="space-y-2">
              {data.topProducts.map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-neutral-700 dark:text-neutral-300">{p.title}</span>
                  <span className="shrink-0 font-bold text-neutral-900 dark:text-white">{p.unitsSold} sold</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
            Low Stock
          </div>
          {data.lowStockProducts.length === 0 ? (
            <p className="text-xs text-neutral-500">Everything is well stocked.</p>
          ) : (
            <ul className="space-y-2">
              {data.lowStockProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2 text-xs">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="truncate text-neutral-700 dark:text-neutral-300 hover:text-amber-500"
                  >
                    {p.title}
                  </Link>
                  <span
                    className={`shrink-0 font-bold ${p.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}
                  >
                    {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <div className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Orders by Fulfillment Status</div>
        <div className="flex flex-wrap gap-3">
          {data.fulfillmentBreakdown.map((f) => (
            <div key={f.status} className="flex items-center gap-2">
              <FulfillmentStatusBadge status={f.status} />
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{f.count}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
