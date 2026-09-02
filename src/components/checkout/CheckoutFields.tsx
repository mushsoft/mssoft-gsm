'use client';

import { CreditCard, Smartphone } from 'lucide-react';

export type PaymentMethod = 'MOBILE_MONEY' | 'CARD';

export interface CheckoutFieldValues {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  couponCode: string;
}

// Presentational only — the four inputs + payment-method toggle shared by
// BuyNowButton's single-item modal and the cart's full checkout form, so the
// two can't visually drift apart. No submit logic or fetch call lives here;
// each caller keeps its own handleSubmit, since the two forms differ in
// layout (centered modal vs. page section) and in what happens on success
// (redirect only, vs. redirect + clear the whole cart).
export default function CheckoutFields({
  values,
  onChange,
  paymentMethod,
  onPaymentMethodChange,
  isSubmitting,
}: {
  values: CheckoutFieldValues;
  onChange: (field: keyof CheckoutFieldValues, value: string) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Full Name</label>
        <input
          value={values.customerName}
          onChange={(e) => onChange('customerName', e.target.value)}
          required
          placeholder="Jane Doe"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Phone Number</label>
        <input
          value={values.customerPhone}
          onChange={(e) => onChange('customerPhone', e.target.value)}
          required
          type="tel"
          placeholder="+256 700 000 000"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Email</label>
        <input
          value={values.customerEmail}
          onChange={(e) => onChange('customerEmail', e.target.value)}
          required
          type="email"
          placeholder="jane@example.com"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Promo Code (optional)</label>
        <input
          value={values.couponCode}
          onChange={(e) => onChange('couponCode', e.target.value.toUpperCase())}
          placeholder="WELCOME10"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm font-mono uppercase text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Payment Method</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onPaymentMethodChange('MOBILE_MONEY')}
            className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-colors disabled:opacity-60 ${
              paymentMethod === 'MOBILE_MONEY'
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 dark:text-amber-400'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Mobile Money
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onPaymentMethodChange('CARD')}
            className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-colors disabled:opacity-60 ${
              paymentMethod === 'CARD'
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 dark:text-amber-400'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Card
          </button>
        </div>
      </div>
    </div>
  );
}
