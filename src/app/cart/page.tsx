import type { Metadata } from 'next';
import CartPageClient from '@/components/cart/CartPageClient';

// The cart's entire content is client-only (localStorage-backed, no session
// or DB-backed state) — this file exists only to carry metadata, since a
// 'use client' component can't export it.
export const metadata: Metadata = {
  title: 'Your Cart | MS Soft GSM',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartPageClient />;
}
