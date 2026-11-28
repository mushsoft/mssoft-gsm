'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Bitcoin, Check, Copy, CreditCard, ImagePlus, Loader2, Smartphone, Store } from 'lucide-react';
import { AIRTEL_USSD_CODE, MTN_USSD_CODE } from '@/lib/airtelMerchant';
import { formatUsd } from '@/lib/softwareToolPricing';
import { parseTopUpAmount, topUpUgx, TOPUP_PRESETS_USD } from '@/lib/walletAmounts';
import { isProofMethod, paysInUsdt, type ProofDestinations, type ProofMethod } from '@/lib/paymentProof';
import type { TopUpPaymentMethod } from '@/lib/wallet';

type Method = TopUpPaymentMethod | ProofMethod;

const METHODS: { value: Method; label: string; icon: typeof Smartphone }[] = [
  { value: 'MTN_MERCHANT', label: 'MTN MoMo Pay', icon: Store },
  { value: 'AIRTEL_MERCHANT', label: 'Airtel Pay Merchant', icon: Store },
  { value: 'BINANCE', label: 'Binance (USDT)', icon: Bitcoin },
  { value: 'PAWAPAY', label: 'Mobile Money (pawaPay)', icon: Smartphone },
  { value: 'MOBILE_MONEY', label: 'Mobile Money', icon: Smartphone },
  { value: 'CARD', label: 'Card', icon: CreditCard },
];

// Phone photos are often several MB. Shrink to a sharp, readable JPEG
// before upload so it's quick on mobile data and well under the size limit.
async function shrinkImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
    return blob ?? file;
  } catch {
    return file;
  }
}

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="inline-flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-1.5 py-0.5 font-mono font-bold text-neutral-900 dark:text-white"
      aria-label={`Copy ${value}`}
    >
      {value}
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-neutral-400" />}
    </button>
  );
}

export default function WalletTopUpForm({
  usdRate,
  hasPhone,
  availableMethods,
  proofDestinations,
}: {
  usdRate: number;
  hasPhone: boolean;
  // Only gateways whose payments the site can actually confirm (see
  // availableTopUpMethods) — never offer one that could take money without
  // crediting it.
  availableMethods: TopUpPaymentMethod[];
  // Our merchant codes / Binance account, for top-ups proved by screenshot.
  proofDestinations: ProofDestinations;
}) {
  const router = useRouter();
  const methods = METHODS.filter((m) =>
    isProofMethod(m.value) ? Boolean(proofDestinations[m.value]) : availableMethods.includes(m.value as TopUpPaymentMethod)
  );
  const [amount, setAmount] = useState('20');
  const [method, setMethod] = useState<Method>(methods[0]?.value ?? 'AIRTEL_MERCHANT');
  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [proofSubmitted, setProofSubmitted] = useState(false);

  const parsed = parseTopUpAmount(amount);
  // Shown for guidance only — the server recalculates with the current rate.
  const ugx = parsed.cents !== undefined ? topUpUgx(parsed.cents, usdRate) : null;
  const needsPhone = !hasPhone && (method === 'MOBILE_MONEY' || method === 'CARD');
  const proofMethod = isProofMethod(method) ? method : null;
  const usdt = proofMethod !== null && paysInUsdt(proofMethod);
  const payText = usdt
    ? parsed.cents !== undefined
      ? `${(parsed.cents / 100).toFixed(2)} USDT`
      : 'the amount above in USDT'
    : ugx !== null
      ? `UGX ${ugx.toLocaleString('en-US')}`
      : 'the amount above';

  function chooseProof(file: File | null) {
    if (proofPreview) URL.revokeObjectURL(proofPreview);
    setProof(file);
    setProofPreview(file ? URL.createObjectURL(file) : null);
    setError(null);
  }

  async function submitProof() {
    if (!proof) {
      setError('Add a screenshot or photo of your payment confirmation.');
      setSubmitting(false);
      return;
    }
    const form = new FormData();
    form.set('method', proofMethod!);
    form.set('amountUsd', amount);
    form.set('reference', reference);
    form.set('proof', await shrinkImage(proof), 'proof.jpg');
    const response = await fetch('/api/wallet/topup/proof', { method: 'POST', body: form });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      setError(data.error || 'Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }
    setProofSubmitted(true);
    setReference('');
    chooseProof(null);
    setSubmitting(false);
    router.refresh();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (parsed.error !== undefined) {
      setError(parsed.error);
      return;
    }
    setError(null);
    setProofSubmitted(false);
    setSubmitting(true);
    try {
      if (proofMethod) {
        await submitProof();
        return;
      }
      const response = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUsd: amount, paymentMethod: method, phone }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      window.location.href = data.paymentUrl;
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
          {parsed.cents !== undefined && usdt ? (
            <>
              You pay <span className="font-bold text-neutral-900 dark:text-white">{payText}</span> (1 USDT = $1)
            </>
          ) : ugx !== null ? (
            <>
              You pay <span className="font-bold text-neutral-900 dark:text-white">UGX {ugx.toLocaleString('en-US')}</span> at
              UGX {Math.round(usdRate).toLocaleString('en-US')} per $1
            </>
          ) : (
            parsed.error
          )}
        </p>
      </div>

      <div>
        <span className={labelClass}>Pay with</span>
        <div className="grid grid-cols-2 gap-2">
          {methods.map(({ value, label, icon: Icon }) => (
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

      {proofMethod && (
        <div className="space-y-3 rounded-lg border border-amber-500/25 bg-amber-500/5 p-3">
          <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Pay {payText}, then send us the proof:</p>
          <ol className="list-inside list-decimal space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
            {proofMethod === 'MTN_MERCHANT' && proofDestinations.MTN_MERCHANT && (
              <>
                <li>
                  Dial <span className="font-mono font-bold">{MTN_USSD_CODE}</span> and choose MoMoPay
                </li>
                <li>
                  Merchant code <CopyValue value={proofDestinations.MTN_MERCHANT.code} />, amount {payText}, then confirm with your PIN
                </li>
              </>
            )}
            {proofMethod === 'AIRTEL_MERCHANT' && proofDestinations.AIRTEL_MERCHANT && (
              <>
                <li>
                  Dial <span className="font-mono font-bold">{AIRTEL_USSD_CODE}</span> and choose &quot;Pay Merchant&quot;
                </li>
                <li>
                  Merchant ID <CopyValue value={proofDestinations.AIRTEL_MERCHANT.code} />, amount {payText}, then confirm with your PIN
                </li>
              </>
            )}
            {proofMethod === 'BINANCE' && proofDestinations.BINANCE && (
              <>
                <li>In the Binance app open Pay, then Send</li>
                <li>
                  Binance Pay ID <CopyValue value={proofDestinations.BINANCE.payId} />
                  {proofDestinations.BINANCE.name && <> (name: {proofDestinations.BINANCE.name})</>}
                </li>
                <li>Send exactly {payText}</li>
              </>
            )}
            <li>Take a screenshot (or photo) of the confirmation showing the amount and transaction ID, and add it below</li>
          </ol>

          <label
            className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-3 py-3 text-xs transition-colors ${
              proof
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-neutral-300 dark:border-neutral-700 hover:border-amber-500/50'
            }`}
          >
            {proofPreview ? (
              // eslint-disable-next-line @next/next/no-img-element -- local preview of the customer's own file
              <img src={proofPreview} alt="Your payment proof" className="h-16 w-12 rounded object-cover" />
            ) : (
              <ImagePlus className="h-6 w-6 shrink-0 text-amber-500" />
            )}
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {proof ? 'Proof added. Tap to change it' : 'Add payment screenshot'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={submitting}
              onChange={(e) => chooseProof(e.target.files?.[0] ?? null)}
            />
          </label>

          <input
            value={reference}
            onChange={(e) => setReference(e.target.value.toUpperCase())}
            disabled={submitting}
            className={`${inputClass} font-mono uppercase`}
            placeholder="Transaction ID (optional)"
            aria-label="Transaction ID (optional)"
          />
          <p className="text-[11px] text-neutral-500">
            We add the credit to your wallet once we&apos;ve confirmed the payment arrived, usually within minutes during working hours.
          </p>
        </div>
      )}

      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
      {proofSubmitted && (
        <p className="text-xs font-semibold text-emerald-500">Proof sent. We&apos;ll confirm your payment and add the credit shortly.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {proofMethod ? 'Send Proof' : 'Continue to Payment'}
      </button>
    </form>
  );
}
