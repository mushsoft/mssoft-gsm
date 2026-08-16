import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Percent } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import CouponForm from '@/components/admin/CouponForm';
import DeleteCouponButton from '@/components/admin/DeleteCouponButton';

export default async function EditCouponPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const coupon = await prisma.coupon.findUnique({ where: { id } });

  if (!coupon) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        href="/admin/coupons"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Coupons</span>
      </Link>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Percent className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white font-mono">{coupon.code}</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Used {coupon.usedCount}
              {coupon.maxUses !== null ? ` / ${coupon.maxUses}` : ''} times
            </p>
          </div>
        </div>
        <DeleteCouponButton couponId={coupon.id} couponCode={coupon.code} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <CouponForm
          mode="edit"
          couponId={coupon.id}
          initialValues={{
            code: coupon.code,
            discountType: coupon.discountType,
            value: String(coupon.value),
            active: coupon.active,
            expiresAt: coupon.expiresAt ? coupon.expiresAt.toISOString().slice(0, 10) : '',
            maxUses: coupon.maxUses !== null ? String(coupon.maxUses) : '',
          }}
        />
      </div>
    </main>
  );
}
