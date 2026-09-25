'use client';

import { CreditCard, Copy, Smartphone } from 'lucide-react';
import { useState } from 'react';

export type PaymentMethod = 'MOBILE_MONEY' | 'CARD' | 'AIRTEL_MONEY';

export const AIRTEL_MERCHANT_ID = '6923944';
export const AIRTEL_USSD_CODE = '*185*9#';

export interface CheckoutFieldValues {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  couponCode: string;
  paymentReference: string;
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
  amount,
}: {
  values: CheckoutFieldValues;
  onChange: (field: keyof CheckoutFieldValues, value: string) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  isSubmitting: boolean;
  /** Total due, shown in the Airtel Money pay-this-amount instructions. */
  amount: number;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Full Name</label>
        <input
          value={values.customerName}
          onChange={(e) => onChange('customerName', e.target.value)}
          required
          placeholder="Nakato Patricia"
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
          placeholder="+256 772 345 678"
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
          placeholder="patricia@gmail.com"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Promo Code (optional)</label>
        <input
          value={values.couponCode}
          onChange={(e) => onChange('couponCode', e.target.value.toUpperCase())}
          placeholder="MSGSM10"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm font-mono uppercase text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onPaymentMethodChange('MOBILE_MONEY')}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px] font-bold transition-colors disabled:opacity-60 ${
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
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px] font-bold transition-colors disabled:opacity-60 ${
              paymentMethod === 'CARD'
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 dark:text-amber-400'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Card
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onPaymentMethodChange('AIRTEL_MONEY')}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px] font-bold transition-colors disabled:opacity-60 ${
              paymentMethod === 'AIRTEL_MONEY'
                ? 'border-red-500/50 bg-red-500/10 text-red-500 dark:text-red-400'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Airtel Money
          </button>
        </div>
      </div>

      {paymentMethod === 'AIRTEL_MONEY' && (
        <AirtelMoneyInstructions amount={amount} reference={values.paymentReference} onChange={onChange} disabled={isSubmitting} />
      )}
    </div>
  );
}

function AirtelMoneyInstructions({
  amount,
  reference,
  onChange,
  disabled,
}: {
  amount: number;
  reference: string;
  onChange: (field: keyof CheckoutFieldValues, value: string) => void;
  disabled: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copyMerchantId() {
    try {
      await navigator.clipboard.writeText(AIRTEL_MERCHANT_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (permissions, non-secure context) — the ID is
      // already shown on screen, so this is a convenience, not a requirement.
    }
  }

  return (
    <div className="space-y-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
        Pay UGX {amount.toLocaleString()} via Airtel Money:
      </p>
      <ol className="list-inside list-decimal space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
        <li>
          Dial <span className="font-mono font-bold">{AIRTEL_USSD_CODE}</span> on your Airtel line
        </li>
        <li>Choose &quot;Pay Merchant&quot;</li>
        <li className="flex flex-wrap items-center gap-1.5">
          Enter Merchant ID{' '}
          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 dark:bg-black px-1.5 py-0.5 font-mono font-bold text-white">
            {AIRTEL_MERCHANT_ID}
            <button
              type="button"
              onClick={copyMerchantId}
              className="text-neutral-400 hover:text-white"
              aria-label="Copy merchant ID"
            >
              <Copy className="h-3 w-3" />
            </button>
          </span>
          {copied && <span className="text-[10px] font-bold text-emerald-500">Copied!</span>}
        </li>
        <li>Enter the amount and confirm with your Airtel Money PIN</li>
        <li>Enter the transaction ID from the confirmation SMS below</li>
      </ol>

      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
          Airtel Money Transaction ID
        </label>
        <input
          value={reference}
          onChange={(e) => onChange('paymentReference', e.target.value.toUpperCase())}
          required
          placeholder="e.g. MP250101.1234.A56789"
          disabled={disabled}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-2 text-sm font-mono text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
        />
        <p className="mt-1 text-[10px] text-neutral-500">
          We&apos;ll verify this against our Airtel Money account before confirming your order.
        </p>
      </div>
    </div>
  );
}
