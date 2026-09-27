import Link from 'next/link';
import { FileText, Plus, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

const DOC_LABELS: Record<string, string> = {
  INVOICE: 'Invoice',
  RECEIPT: 'Sales Receipt',
  DELIVERY_NOTE: 'Delivery Note',
  QUOTATION: 'Quotation',
};

export default async function AdminReceiptsListPage() {
  await requireAdminPage();

  const receipts = await prisma.receipt.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Receipts</h1>
            <p className="text-xs text-neutral-500">{receipts.length} saved</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex justify-end">
        <Link
          href="/admin/receipts/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <Plus className="h-3.5 w-3.5" />
          New Receipt
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 font-bold">Customer</th>
              <th className="px-4 py-3 font-bold">Reference</th>
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {receipts.map((receipt) => {
              const items = Array.isArray(receipt.items) ? (receipt.items as { quantity: number; price: number }[]) : [];
              const total = Math.max(
                0,
                items.reduce((sum, item) => sum + item.price * item.quantity, 0) - receipt.discountAmount
              );
              return (
                <tr key={receipt.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                  <td className="px-4 py-3 align-middle text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {DOC_LABELS[receipt.docType] ?? receipt.docType}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {receipt.customerName || <span className="text-neutral-400">—</span>}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    UGX {total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {receipt.documentDate.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        receipt.paymentStatus === 'SUCCESSFUL'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}
                    >
                      {receipt.paymentStatus === 'SUCCESSFUL' ? 'Paid' : 'Pending'}
                    </span>
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
            No saved receipts yet,{' '}
            <Link href="/admin/receipts/new" className="font-bold text-amber-500 hover:underline">
              create your first one
            </Link>
            .
          </div>
        )}
      </div>
    </main>
  );
}
