import type { Metadata } from 'next';
import CartPageClient from '@/components/cart/CartPageClient';
import { availableCheckoutMethods } from '@/lib/paymentConfig';

// The cart's entire content is client-only (localStorage-backed, no session
// or DB-backed state) — this file carries metadata, plus which payment
// methods the server is configured to offer (env-based, see paymentConfig).
export const metadata: Metadata = {
  title: 'Your Cart',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageClient availableMethods={availableCheckoutMethods()} />;
}
