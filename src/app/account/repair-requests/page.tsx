import Link from 'next/link';
import { MessageSquare, Plus, Wrench } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import AccountNav from '@/components/account/AccountNav';
import AutoRefresh from '@/components/AutoRefresh';
import RepairRequestStatusBadge from '@/components/account/RepairRequestStatusBadge';

export default async function RepairRequestsPage() {
  const customer = await requireCustomerPage();

  const requests = await prisma.repairRequest.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={20000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Ask a Technician</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{requests.length} requests</p>
          </div>
        </div>
        <Link
          href="/account/repair-requests/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <Plus className="h-3.5 w-3.5" />
          New Question
        </Link>
      </div>

      <AccountNav />

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          Got a phone problem? Describe it (with a photo if you can) and a technician will get back to you here.
          <div className="mt-4">
            <Link
              href="/account/repair-requests/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
            >
              <Plus className="h-3.5 w-3.5" />
              Ask Your First Question
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => {
            const device = [request.brand, request.modelName].filter(Boolean).join(' ');
            return (
              <div
                key={request.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {device && <p className="text-xs font-bold text-neutral-500">{device}</p>}
                    <p className="mt-0.5 text-sm text-neutral-800 dark:text-neutral-200">{request.problem}</p>
                  </div>
                  <RepairRequestStatusBadge status={request.status} />
                </div>

                {request.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element -- user-uploaded photo, no fixed dimensions to optimize against
                  <img
                    src={request.imageUrl}
                    alt="Attached photo"
                    className="mt-3 h-32 w-32 rounded-lg object-cover"
                  />
                )}

                {request.reply && (
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/40">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                      <MessageSquare className="h-3 w-3" />
                      Technician&apos;s Reply
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-200">{request.reply}</p>
                  </div>
                )}

                <p className="mt-2 text-[10px] text-neutral-400">{request.createdAt.toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
