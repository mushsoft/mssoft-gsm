import Link from 'next/link';
import { Percent, Plus, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminCouponsPage() {
  await requireAdminPage();

  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Percent className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Coupons</h1>
            <p className="text-xs text-neutral-500">{coupons.length} coupons</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="flex justify-end">
        <Link
          href="/admin/coupons/new"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400"
        >
          <Plus className="h-3.5 w-3.5" />
          New Coupon
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Code</th>
              <th className="px-4 py-3 font-bold">Discount</th>
              <th className="px-4 py-3 font-bold">Usage</th>
              <th className="px-4 py-3 font-bold">Expires</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {coupons.map((coupon) => {
              const expired = coupon.expiresAt ? coupon.expiresAt < new Date() : false;
              const exhausted = coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses;
              const isLive = coupon.active && !expired && !exhausted;
              return (
                <tr key={coupon.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                  <td className="px-4 py-3 align-middle font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {coupon.code}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {coupon.discountType === 'PERCENT' ? `${coupon.value}%` : `UGX ${coupon.value.toLocaleString()}`}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {coupon.usedCount}
                    {coupon.maxUses !== null ? ` / ${coupon.maxUses}` : ''}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {coupon.expiresAt ? coupon.expiresAt.toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        isLive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-neutral-500/10 text-neutral-500'
                      }`}
                    >
                      {isLive ? 'Active' : expired ? 'Expired' : exhausted ? 'Exhausted' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link
                      href={`/admin/coupons/${coupon.id}`}
                      className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {coupons.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">
            No coupons yet —{' '}
            <Link href="/admin/coupons/new" className="font-bold text-amber-500 hover:underline">
              create your first one
            </Link>
            .
          </div>
        )}
      </div>
    </main>
  );
}
