'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Minus, MessageCircle, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { CartLine } from '@/lib/cart';
import type { CatalogProduct } from '@/components/cards/CatalogProductCard';
import CheckoutFields, { type CheckoutFieldValues, type PaymentMethod } from '@/components/checkout/CheckoutFields';

const WHATSAPP_PHONE = '256773944288';

interface CartDisplayLine {
  line: CartLine;
  product: CatalogProduct;
}

export default function CartPageClient() {
  const { lines, isHydrated, setQuantity, removeItem, clear } = useCart();

  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [removedNotice, setRemovedNotice] = useState(false);

  const [fields, setFields] = useState<CheckoutFieldValues>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    couponCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOBILE_MONEY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ids = useMemo(() => [...new Set(lines.map((l) => l.productId))].sort().join(','), [lines]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!ids) {
      // Deferred, not a direct setState call in the effect body — see
      // CartContext's hydration effect for the same convention.
      queueMicrotask(() => setProducts([]));
      return;
    }

    let cancelled = false;
    queueMicrotask(() => {
      setIsLoadingProducts(true);
      setLoadError(null);
    });

    fetch(`/api/products/by-ids?ids=${encodeURIComponent(ids)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.success) {
          setLoadError(data.error || 'Unable to load your cart items.');
          return;
        }
        const fetchedIds = new Set<string>(data.products.map((p: CatalogProduct) => p.id));
        const missing = ids.split(',').filter((id) => !fetchedIds.has(id));
        if (missing.length > 0) {
          // No longer in the catalog — drop from the stored cart, not just
          // from this render, so it doesn't keep reappearing.
          missing.forEach((id) => removeItem(id));
          setRemovedNotice(true);
        }
        setProducts(data.products);
      })
      .catch(() => {
        if (!cancelled) setLoadError('Network error loading your cart. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingProducts(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ids, isHydrated, removeItem]);

  const displayLines: CartDisplayLine[] = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((entry): entry is CartDisplayLine => !!entry.product);

  // A stale cart line can carry more quantity than is actually in stock —
  // clamp per-line here (display + totals + checkout payload) rather than
  // silently rewriting localStorage the moment the page loads.
  const checkoutable = displayLines
    .filter(({ product }) => product.stock > 0)
    .map(({ line, product }) => ({ line, product, quantity: Math.min(line.quantity, product.stock) }));

  const subtotal = checkoutable.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  function updateField(field: keyof CheckoutFieldValues, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    if (checkoutable.length === 0) {
      setSubmitError('Your cart has no items available to check out.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fields.customerName,
          customerPhone: fields.customerPhone,
          customerEmail: fields.customerEmail,
          paymentMethod,
          items: checkoutable.map(({ product, quantity }) => ({ id: product.id, quantity })),
          couponCode: fields.couponCode.trim() || null,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      clear();
      queueMicrotask(() => {
        window.location.href = data.paymentUrl;
      });
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  }

  const whatsappMessage =
    checkoutable.length > 0
      ? `Hello Phone Hub! I want to ORDER these items:\n\n${checkoutable
          .map(
            ({ product, quantity }) =>
              `📌 *${product.title}* ×${quantity} — UGX ${(product.price * quantity).toLocaleString()}`
          )
          .join('\n')}\n\n💰 Total: UGX ${subtotal.toLocaleString()}`
      : '';
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  if (!isHydrated) {
    return <main className="mx-auto max-w-3xl px-4 py-8" />;
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <PageHeader itemCount={0} />
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          Your cart is empty.{' '}
          <Link href="/shop" className="font-bold text-amber-500 hover:underline">
            Start shopping
          </Link>
          .
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <PageHeader itemCount={lines.reduce((sum, l) => sum + l.quantity, 0)} />

      {removedNotice && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
          One or more items were removed — they&apos;re no longer available.
        </div>
      )}

      {loadError && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {loadError}
        </div>
      )}

      {isLoadingProducts && products.length === 0 ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 text-xs text-neutral-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your cart...
        </div>
      ) : (
        <div className="space-y-3">
          {displayLines.map(({ line, product }) => {
            const inStock = product.stock > 0;
            const quantity = Math.min(line.quantity, product.stock);
            const imageUrl = product.images[0];

            return (
              <div
                key={product.id}
                className={`flex items-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 ${
                  !inStock ? 'opacity-70' : ''
                }`}
              >
                <Link
                  href={`/shop/product/${product.slug}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-950"
                >
                  {imageUrl ? (
                    <Image src={imageUrl} alt={product.title} fill className="object-contain p-1.5" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-neutral-700" />
                    </div>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <Link href={`/shop/product/${product.slug}`} className="block truncate text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-amber-500">
                    {product.title}
                  </Link>
                  <div className="mt-0.5 text-xs font-black text-amber-500 dark:text-amber-400">
                    UGX {product.price.toLocaleString()}
                  </div>
                  {!inStock ? (
                    <span className="mt-1 inline-block rounded-md bg-red-950/10 dark:bg-red-950/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500 dark:text-red-300">
                      Out of Stock
                    </span>
                  ) : (
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, line.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-neutral-800 dark:text-neutral-200">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, Math.min(line.quantity + 1, product.stock))}
                        disabled={line.quantity >= product.stock}
                        aria-label="Increase quantity"
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      {line.quantity > product.stock && (
                        <span className="text-[10px] text-amber-500">only {product.stock} left</span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  aria-label="Remove item"
                  className="shrink-0 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {checkoutable.length > 0 && (
        <>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">Subtotal</span>
              <span className="text-lg font-black text-amber-500 dark:text-amber-400">UGX {subtotal.toLocaleString()}</span>
            </div>

            <form onSubmit={handleCheckout} className="mt-4 space-y-3">
              <CheckoutFields
                values={fields}
                onChange={updateField}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                isSubmitting={isSubmitting}
              />

              {submitError && (
                <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
                  {submitError}
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

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Order All via WhatsApp Instead
          </a>
        </>
      )}
    </main>
  );
}

function PageHeader({ itemCount }: { itemCount: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
        <ShoppingCart className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-lg font-black text-neutral-900 dark:text-white">Your Cart</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{itemCount} item{itemCount === 1 ? '' : 's'}</p>
      </div>
    </div>
  );
}
