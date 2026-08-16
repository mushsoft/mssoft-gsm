'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export type CouponFormValues = {
  code: string;
  discountType: 'PERCENT' | 'FIXED';
  value: string;
  active: boolean;
  expiresAt: string;
  maxUses: string;
};

export default function CouponForm({
  mode,
  initialValues,
  couponId,
}: {
  mode: 'create' | 'edit';
  initialValues: CouponFormValues;
  couponId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CouponFormValues>(key: K, value: CouponFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      code: values.code,
      discountType: values.discountType,
      value: Number(values.value),
      active: values.active,
      expiresAt: values.expiresAt || null,
      maxUses: values.maxUses ? Number(values.maxUses) : null,
    };

    try {
      const url = mode === 'create' ? '/api/admin/coupons' : `/api/admin/coupons/${couponId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      router.push('/admin/coupons');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60';
  const labelClass = 'mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Code</label>
        <input
          required
          value={values.code}
          onChange={(e) => update('code', e.target.value.toUpperCase())}
          disabled={isSubmitting}
          className={`${inputClass} font-mono uppercase`}
          placeholder="WELCOME10"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Discount Type</label>
          <select
            value={values.discountType}
            onChange={(e) => update('discountType', e.target.value as 'PERCENT' | 'FIXED')}
            disabled={isSubmitting}
            className={inputClass}
          >
            <option value="PERCENT">Percent Off</option>
            <option value="FIXED">Fixed Amount (UGX)</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Value</label>
          <input
            required
            type="number"
            min="0"
            step="1"
            value={values.value}
            onChange={(e) => update('value', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder={values.discountType === 'PERCENT' ? '10' : '5000'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Expires (optional)</label>
          <input
            type="date"
            value={values.expiresAt}
            onChange={(e) => update('expiresAt', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Max Uses (optional)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={values.maxUses}
            onChange={(e) => update('maxUses', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="Unlimited"
          />
        </div>
      </div>

      <label className="flex w-fit items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
        <input
          type="checkbox"
          checked={values.active}
          onChange={(e) => update('active', e.target.checked)}
          disabled={isSubmitting}
          className="h-4 w-4 accent-amber-500"
        />
        Active
      </label>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : mode === 'create' ? (
          'Create Coupon'
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
}
