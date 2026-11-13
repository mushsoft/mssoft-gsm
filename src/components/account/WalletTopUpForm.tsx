'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Loader2, Smartphone } from 'lucide-react';
import { AIRTEL_MERCHANT_ID, AIRTEL_USSD_CODE } from '@/components/checkout/CheckoutFields';
import { formatUsd } from '@/lib/softwareToolPricing';
import { parseTopUpAmount, topUpUgx, TOPUP_PRESETS_USD } from '@/lib/walletAmounts';

type Method = 'PAWAPAY' | 'MOBILE_MONEY' | 'CARD' | 'AIRTEL_MONEY';

const METHODS: { value: Method; label: string; icon: typeof Smartphone }[] = [
  { value: 'PAWAPAY', label: 'Mobile Money (pawaPay)', icon: Smartphone },
  { value: 'MOBILE_MONEY', label: 'Mobile Money', icon: Smartphone },
  { value: 'CARD', label: 'Card', icon: CreditCard },
  { value: 'AIRTEL_MONEY', label: 'Airtel Money', icon: Smartphone },
];

export default function WalletTopUpForm({ usdRate, hasPhone }: { usdRate: number; hasPhone: boolean }) {
  const router = useRouter();
  const [amount, setAmount] = useState('20');
  const [method, setMethod] = useState<Method>('PAWAPAY');
  const [phone, setPhone] = useState('');
  const [airtelRef, setAirtelRef] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [airtelSubmitted, setAirtelSubmitted] = useState(false);

  const parsed = parseTopUpAmount(amount);
  // Shown for guidance only — the server recalculates with the current rate.
  const ugx = parsed.cents !== undefined ? topUpUgx(parsed.cents, usdRate) : null;
  const needsPhone = !hasPhone && (method === 'MOBILE_MONEY' || method === 'CARD');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (parsed.error !== undefined) {
      setError(parsed.error);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUsd: amount, paymentMethod: method, phone, paymentReference: airtelRef }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }
      // Airtel Money: waits for admin approval.
      setAirtelSubmitted(true);
      setAirtelRef('');
      setSubmitting(false);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60';
  const labelClass = 'mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topup-amount" className={labelClass}>
          Amount (USD)
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          {TOPUP_PRESETS_USD.map((preset) => (
            <button
              key={preset}
              type="button"
              disabled={submitting}
              onClick={() => setAmount(String(preset))}
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                amount === String(preset)
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-500'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {formatUsd(preset)}
            </button>
          ))}
        </div>
        <input
          id="topup-amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={submitting}
          className={inputClass}
          placeholder="20"
        />
        <p className="mt-1 text-[11px] text-neutral-500">
          {ugx !== null ? (
            <>
              You pay <span className="font-bold text-neutral-900 dark:text-white">UGX {ugx.toLocaleString()}</span> at
              UGX {Math.round(usdRate).toLocaleString()} per $1
            </>
          ) : (
            parsed.error
          )}
        </p>
      </div>

      <div>
        <span className={labelClass}>Pay with</span>
        <div className="grid grid-cols-2 gap-2">
          {METHODS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              disabled={submitting}
              onClick={() => setMethod(value)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px] font-bold transition-colors disabled:opacity-60 ${
                method === value
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-500'
                  : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {needsPhone && (
        <div>
          <label htmlFor="topup-phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="topup-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
            className={inputClass}
            placeholder="+256 7XX XXX XXX"
          />
        </div>
      )}

      {method === 'AIRTEL_MONEY' && (
        <div className="space-y-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
            Pay {ugx !== null ? `UGX ${ugx.toLocaleString()}` : 'the amount above'} via Airtel Money:
          </p>
          <ol className="list-inside list-decimal space-y-1 text-xs text-neutral-600 dark:text-neutral-300">
            <li>
              Dial <span className="font-mono font-bold">{AIRTEL_USSD_CODE}</span> and choose &quot;Pay Merchant&quot;
            </li>
            <li>
              Merchant ID <span className="font-mono font-bold">{AIRTEL_MERCHANT_ID}</span>, then confirm with your PIN
            </li>
            <li>Enter the transaction ID from the confirmation SMS below</li>
          </ol>
          <input
            value={airtelRef}
            onChange={(e) => setAirtelRef(e.target.value.toUpperCase())}
            disabled={submitting}
            className={`${inputClass} font-mono uppercase`}
            placeholder="Airtel Money transaction ID"
            aria-label="Airtel Money transaction ID"
          />
          <p className="text-[11px] text-neutral-500">We add the credit once we&apos;ve confirmed your payment.</p>
        </div>
      )}

      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
      {airtelSubmitted && (
        <p className="text-xs font-semibold text-emerald-500">Top-up submitted. We&apos;ll confirm it shortly.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {method === 'AIRTEL_MONEY' ? 'Submit Top-up' : 'Continue to Payment'}
      </button>
    </form>
  );
}
