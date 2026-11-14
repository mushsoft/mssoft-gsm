'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, MessageCircle, ShieldAlert, Wallet, X } from 'lucide-react';
import { getOrderFormSpec, MAX_CREDIT_QUANTITY, validateCreditQuantity, validateOrderField } from '@/lib/softwareToolOrderFields';
import { formatUsd, multiplyUsd, roundUpUgx } from '@/lib/softwareToolPricing';
import { formatUsdCents } from '@/lib/walletAmounts';

export interface OrderableTool {
  id: string;
  title: string;
  category: string;
  // Price of the item, or of one credit when perCredit is true.
  priceUgx: number;
  priceUsd: number;
  perCredit: boolean;
}

// null = not logged in.
export type WalletState = { balanceCents: number } | null;

// Collects the account details this particular tool needs (see
// softwareToolOrderFields.ts), then either pays from the customer's wallet
// (server re-prices and debits — see src/lib/toolOrders.ts) or hands the
// order to WhatsApp as a pre-filled message, as before.
export default function OrderToolModal({
  tool,
  whatsappPhone,
  wallet,
  onClose,
}: {
  tool: OrderableTool;
  whatsappPhone: string;
  wallet: WalletState;
  onClose: () => void;
}) {
  const router = useRouter();
  const spec = useMemo(() => getOrderFormSpec(tool.category, tool.title), [tool]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paidCents, setPaidCents] = useState<number | null>(null);

  const quantityValid = tool.perCredit && validateCreditQuantity(quantity) === null;
  const totalUgx = quantityValid ? roundUpUgx(tool.priceUgx * Number(quantity)) : null;
  const totalUsd = quantityValid ? multiplyUsd(tool.priceUsd, Number(quantity)) : null;
  // What the wallet will be charged (the server computes the same).
  const unitCents = Math.round(tool.priceUsd * 100);
  const totalCents = tool.perCredit ? (quantityValid ? unitCents * Number(quantity) : null) : unitCents;
  const canAfford = wallet !== null && totalCents !== null && wallet.balanceCents >= totalCents;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    for (const field of spec.fields) {
      const error = validateOrderField(field, values[field.key] ?? '');
      if (error) nextErrors[field.key] = error;
    }
    if (tool.perCredit) {
      const error = validateCreditQuantity(quantity);
      if (error) nextErrors.quantity = error;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function sendOnWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const priceLines = tool.perCredit
      ? [
          `Quantity: ${Number(quantity).toLocaleString()} credits`,
          `Price per credit: ${formatUsd(tool.priceUsd)} (≈ UGX ${tool.priceUgx.toLocaleString()})`,
          `Total: ${formatUsd(totalUsd!)} (≈ UGX ${totalUgx!.toLocaleString()})`,
        ]
      : [`Price: ${formatUsd(tool.priceUsd)} (≈ UGX ${tool.priceUgx.toLocaleString()})`];
    const lines = [
      'Hello MS Soft GSM! I would like to order:',
      '',
      `📌 *${tool.title}*`,
      `Category: ${tool.category}`,
      ...priceLines,
      '',
      ...spec.fields
        .filter((f) => (values[f.key] ?? '').trim())
        .map((f) => `${f.label}: ${values[f.key].trim()}`),
      ...(notes.trim() ? ['', `Notes: ${notes.trim()}`] : []),
    ];
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
    onClose();
  }

  async function payFromWallet() {
    if (!validate()) return;
    setPayError(null);
    setPaying(true);
    try {
      const response = await fetch('/api/wallet/tool-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id, quantity, details: values, notes }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setPayError(data.error || 'Something went wrong. Your wallet was not charged.');
        setPaying(false);
        return;
      }
      setPaidCents(data.totalCents);
      setPaying(false);
      router.refresh(); // updates the balance shown on the page
    } catch {
      setPayError('Network error. Check My Account → Tool Orders before trying again.');
      setPaying(false);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-tool-title"
    >
      <form
        onSubmit={sendOnWhatsApp}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 p-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500">{tool.category}</div>
            <h2 id="order-tool-title" className="mt-0.5 text-sm font-bold text-neutral-900 dark:text-white">
              {tool.title}
            </h2>
            <div className="mt-1 text-sm font-black text-neutral-900 dark:text-white">
              {formatUsd(tool.priceUsd)}
              {tool.perCredit && <span className="text-xs font-semibold text-neutral-500"> per credit</span>}
            </div>
            <div className="text-[11px] text-neutral-500">≈ UGX {tool.priceUgx.toLocaleString()}</div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {paidCents !== null ? (
          <div className="space-y-4 p-5 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Paid {formatUsdCents(paidCents)} from your wallet</p>
              <p className="mt-1 text-xs text-neutral-500">
                We&apos;ll load it shortly and let you know. If we can&apos;t, the money goes straight back to your wallet.
              </p>
            </div>
            <Link
              href="/account/tool-orders"
              className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-neutral-950 hover:bg-amber-400"
            >
              Track my order
            </Link>
          </div>
        ) : (
          <div className="space-y-4 p-5">
            {spec.intro && <p className="text-xs text-neutral-600 dark:text-neutral-400">{spec.intro}</p>}

            {tool.perCredit && (
              <div>
                <label htmlFor="order-quantity" className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Number of credits
                </label>
                <input
                  id="order-quantity"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_CREDIT_QUANTITY}
                  step={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 50"
                  className={inputClass}
                />
                {errors.quantity ? (
                  <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.quantity}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {totalUgx !== null && totalUsd !== null ? (
                      <>
                        Total: <span className="font-bold text-neutral-900 dark:text-white">{formatUsd(totalUsd)}</span>{' '}
                        (≈ UGX {totalUgx.toLocaleString()})
                      </>
                    ) : (
                      'Your total shows here.'
                    )}
                  </p>
                )}
              </div>
            )}

            {spec.fields.map((field) => (
              <div key={field.key}>
                <label htmlFor={`order-${field.key}`} className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {field.label}
                  {!field.required && <span className="font-normal text-neutral-400"> (optional)</span>}
                </label>
                <input
                  id={`order-${field.key}`}
                  type={field.kind === 'email' ? 'email' : 'text'}
                  autoComplete={field.kind === 'email' ? 'email' : 'off'}
                  spellCheck={false}
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className={`${inputClass} ${field.kind === 'email' ? '' : 'font-mono'}`}
                />
                {errors[field.key] ? (
                  <p className="mt-1 text-[11px] font-semibold text-red-500">{errors[field.key]}</p>
                ) : (
                  field.help && <p className="mt-1 text-[11px] text-neutral-500">{field.help}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="order-notes" className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Notes or comments <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <textarea
                id="order-notes"
                rows={3}
                maxLength={500}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything else we should know"
                className={inputClass}
              />
            </div>

            <p className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] text-amber-700 dark:text-amber-300">
              <ShieldAlert className="mt-px h-3.5 w-3.5 shrink-0" />
              Never send us your password. We only need the details above.
            </p>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={payFromWallet}
                disabled={!canAfford || paying}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
                {totalCents !== null ? `Pay ${formatUsdCents(totalCents)} from wallet` : 'Pay from wallet'}
              </button>
              <p className="text-center text-[11px] text-neutral-500">
                {wallet === null ? (
                  <>
                    <Link href="/account/login" className="font-bold text-amber-500 hover:underline">
                      Log in
                    </Link>{' '}
                    to pay instantly from your wallet.
                  </>
                ) : (
                  <>
                    Wallet balance: {formatUsdCents(wallet.balanceCents)}
                    {!canAfford && totalCents !== null && (
                      <>
                        {' '}·{' '}
                        <Link href="/account/wallet" className="font-bold text-amber-500 hover:underline">
                          Top up
                        </Link>
                      </>
                    )}
                  </>
                )}
              </p>
              {payError && <p className="text-center text-xs font-semibold text-red-500">{payError}</p>}
            </div>

            <button
              type="submit"
              disabled={paying}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-4 py-3 text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white disabled:opacity-50 dark:text-emerald-400"
            >
              <MessageCircle className="h-4 w-4" />
              Or send order on WhatsApp
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
