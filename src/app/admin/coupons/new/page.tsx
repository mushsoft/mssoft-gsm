import { Percent } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import CouponForm from '@/components/admin/CouponForm';
import AdminBackLink from '@/components/admin/AdminBackLink';

export default async function NewCouponPage() {
  await requireAdminPage();

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AdminBackLink href="/admin/coupons" label="Back to Coupons" />

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <Percent className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">New Coupon</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Create a discount code for checkout.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <CouponForm
          mode="create"
          initialValues={{
            code: '',
            discountType: 'PERCENT',
            value: '',
            active: true,
            expiresAt: '',
            maxUses: '',
          }}
        />
      </div>
    </main>
  );
}
