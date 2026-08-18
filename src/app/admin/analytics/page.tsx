import { Activity, Eye, Package, TrendingUp } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { getAnalyticsData } from '@/lib/adminAnalytics';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import VisitsTrendChart from '@/components/admin/VisitsTrendChart';

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-xl font-black text-neutral-900 dark:text-white">{value}</p>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  await requireAdminPage();

  const data = await getAnalyticsData();

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={15000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Analytics</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Site traffic & product views</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Total Visits" value={data.totalVisits.toLocaleString()} />
        <StatTile label="Visits Today" value={data.visitsToday.toLocaleString()} />
        <StatTile label="Visits (14d)" value={data.visits7Days.toLocaleString()} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
          <TrendingUp className="h-3.5 w-3.5" />
          Daily Visits (14 days)
        </div>
        <VisitsTrendChart data={data.dailyVisits} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <Package className="h-3.5 w-3.5" />
            Most Viewed Products
          </div>
          {data.topViewedProducts.length === 0 ? (
            <p className="text-xs text-neutral-500">No product views recorded yet.</p>
          ) : (
            <ul className="space-y-2">
              {data.topViewedProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-neutral-700 dark:text-neutral-300">{p.title}</span>
                  <span className="shrink-0 font-bold text-neutral-900 dark:text-white">{p.views} views</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <Eye className="h-3.5 w-3.5" />
            Recent Visits
          </div>
          {data.recentVisits.length === 0 ? (
            <p className="text-xs text-neutral-500">No visits recorded yet.</p>
          ) : (
            <ul className="max-h-64 space-y-2 overflow-y-auto">
              {data.recentVisits.map((v) => (
                <li key={v.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-neutral-700 dark:text-neutral-300">{v.path}</span>
                  <span className="shrink-0 text-neutral-400 dark:text-neutral-500">
                    {v.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
