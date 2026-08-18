import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { Eye, Wrench } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import RepairRequestStatusBadge from '@/components/account/RepairRequestStatusBadge';

const REQUEST_TABS: { key: string; label: string; where: Prisma.RepairRequestWhereInput }[] = [
  { key: 'all', label: 'All', where: {} },
  { key: 'open', label: 'Open', where: { status: 'OPEN' } },
  { key: 'answered', label: 'Answered', where: { status: 'ANSWERED' } },
  { key: 'closed', label: 'Closed', where: { status: 'CLOSED' } },
];

export default async function AdminRepairRequestsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdminPage();

  const { tab } = await searchParams;
  const activeTab = REQUEST_TABS.find((t) => t.key === tab) ?? REQUEST_TABS[0];

  // Sequential, not Promise.all — concurrent Prisma queries over the shared
  // pooled connection have triggered a Postgres protocol error ("bind
  // message supplies N parameters, but prepared statement requires 0") in
  // this environment (see ReviewsSection.tsx, adminDashboard.ts).
  const requests = await prisma.repairRequest.findMany({
    where: activeTab.where,
    include: { customer: { select: { name: true, email: true, phone: true } } },
    orderBy: { createdAt: 'desc' },
  });
  const counts: number[] = [];
  for (const t of REQUEST_TABS) {
    counts.push(await prisma.repairRequest.count({ where: t.where }));
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={15000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Ask a Technician</h1>
            <p className="text-xs text-neutral-500">{counts[0]} requests</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        {REQUEST_TABS.map((t, i) => {
          const active = t.key === activeTab.key;
          const href = t.key === 'all' ? '/admin/repair-requests' : `/admin/repair-requests?tab=${t.key}`;
          return (
            <Link
              key={t.key}
              href={href}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                active
                  ? 'bg-amber-500 text-black'
                  : 'border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500'
              }`}
            >
              {t.label}
              <span className={active ? 'text-black/60' : 'text-neutral-400 dark:text-neutral-600'}>{counts[i]}</span>
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Customer</th>
              <th className="px-4 py-3 font-bold">Device</th>
              <th className="px-4 py-3 font-bold">Problem</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {requests.map((request) => {
              const device = [request.brand, request.modelName].filter(Boolean).join(' ') || '—';
              return (
                <tr key={request.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                  <td className="px-4 py-3 align-top">
                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {request.customer.name || request.customer.email}
                    </div>
                    <div className="text-[10px] text-neutral-500">{request.customer.phone}</div>
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">{device}</td>
                  <td className="max-w-xs truncate px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {request.problem}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <RepairRequestStatusBadge status={request.status} />
                  </td>
                  <td className="px-4 py-3 align-middle text-[10px] text-neutral-500">
                    {request.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link
                      href={`/admin/repair-requests/${request.id}`}
                      className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">No {activeTab.label.toLowerCase()} requests yet.</div>
        )}
      </div>
    </main>
  );
}
