import Link from 'next/link';
import { FileText, Plus, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import { formatDate } from '@/lib/formatDate';
import { DOC_TYPES, docTypeConfig, documentNumber, documentTotal } from '@/lib/receiptDocTypes';

const GROUPS = ['Sales', 'Repairs', 'Other'] as const;

export default async function AdminReceiptsListPage() {
  await requireAdminPage();

  const receipts = await prisma.receipt.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={5000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Receipts &amp; Documents</h1>
            <p className="text-xs text-neutral-500">{receipts.length} saved</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      {/* One click to start any document type. */}
      <div className="space-y-2 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Create</div>
        {GROUPS.map((group) => (
          <div key={group} className="flex flex-wrap items-center gap-2">
            <span className="w-16 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{group}</span>
            {DOC_TYPES.filter((d) => d.group === group).map((d) => (
              <Link
                key={d.key}
                href={`/admin/receipts/new?type=${d.key}`}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700 transition-colors hover:border-amber-500 hover:bg-amber-500 hover:text-black dark:border-neutral-800 dark:text-neutral-200"
              >
                <Plus className="h-3 w-3" />
                {d.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 font-bold">No.</th>
              <th className="px-4 py-3 font-bold">Customer</th>
              <th className="px-4 py-3 font-bold">Amount</th>
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {receipts.map((receipt) => {
              const config = docTypeConfig(receipt.docType);
              const items = Array.isArray(receipt.items) ? (receipt.items as { quantity: number; price: number }[]) : [];
              const total = documentTotal(items, receipt.discountAmount);
              const paid = receipt.paymentStatus === 'SUCCESSFUL';
              return (
                <tr key={receipt.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                  <td className="px-4 py-3 align-middle text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {config.label}
                  </td>
                  <td className="px-4 py-3 align-middle font-mono text-[11px] text-neutral-500">
                    {documentNumber(config.prefix, receipt.reference)}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {receipt.customerName || <span className="text-neutral-400">No name</span>}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {config.showTotals ? `UGX ${total.toLocaleString('en-US')}` : <span className="text-neutral-400">-</span>}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {formatDate(receipt.documentDate)}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {config.payment !== 'none' ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          paid ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}
                      >
                        {config.payment === 'refund' ? (paid ? 'Refunded' : 'Pending') : paid ? 'Paid' : 'Pending'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link
                      href={`/admin/receipts/${receipt.id}`}
                      className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {receipts.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">
            No saved documents yet. Pick a type above to create your first one.
          </div>
        )}
      </div>
    </main>
  );
}
