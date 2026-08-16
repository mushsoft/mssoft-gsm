'use client';

import { useState, type FormEvent } from 'react';
import { CreditCard, Loader2, Smartphone, X } from 'lucide-react';

type BuyNowButtonProps = {
  productId: string;
  productTitle: string;
  price: number;
  inStock: boolean;
};

type PaymentMethod = 'MOBILE_MONEY' | 'CARD';

export default function BuyNowButton({ productId, productTitle, price, inStock }: BuyNowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOBILE_MONEY');
  const [couponCode, setCouponCode] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.get('customerName'),
          customerPhone: form.get('customerPhone'),
          customerEmail: form.get('customerEmail'),
          paymentMethod,
          items: [{ id: productId, quantity: 1 }],
          couponCode: couponCode.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      window.location.href = data.paymentUrl;
    } catch {
      setError('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  }

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-xs font-bold text-neutral-500"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-black transition-all hover:scale-[1.02] hover:bg-amber-400 active:scale-95"
      >
        Buy Now
      </button>

      {isOpen && (
        <div
          onClick={() => !isSubmitting && setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Buy Now</h2>
                <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">{productTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => !isSubmitting && setIsOpen(false)}
                className="shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1.5 text-neutral-500 dark:text-neutral-300 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-3 text-center">
              <div className="text-[10px] uppercase tracking-wide text-neutral-500">Total</div>
              <div className="text-lg font-black text-amber-500 dark:text-amber-400">UGX {price.toLocaleString()}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                  Full Name
                </label>
                <input
                  name="customerName"
                  required
                  placeholder="Jane Doe"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                  Phone Number
                </label>
                <input
                  name="customerPhone"
                  required
                  type="tel"
                  placeholder="+256 700 000 000"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                  Email
                </label>
                <input
                  name="customerEmail"
                  required
                  type="email"
                  placeholder="jane@example.com"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                  Promo Code (optional)
                </label>
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="WELCOME10"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm font-mono uppercase text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setPaymentMethod('MOBILE_MONEY')}
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
                    onClick={() => setPaymentMethod('CARD')}
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

              {error && (
                <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecting to payment...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
