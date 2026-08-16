import 'server-only';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabase/server';
import { prisma } from './prisma';
import type { Customer } from '@prisma/client';

// Supabase Auth owns credentials/sessions in its own separate Postgres
// project — this app's data lives in a different database entirely, so we
// mirror a lightweight Customer row here (keyed by supabaseUserId) that all
// app-side relations (Order, Review, WishlistItem) point at. The mirror is
// created lazily on first use rather than via a Supabase webhook, so there's
// no separate sync job that can silently desync — it just always exists by
// the time anything needs it.
export async function getOrCreateCustomer(): Promise<Customer | null> {
  const supabase = await createSupabaseServerClient();
  // getUser() revalidates against Supabase — never trust getSession()'s
  // unverified JWT alone for an authorization decision.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) return null;

  return prisma.customer.upsert({
    where: { supabaseUserId: user.id },
    create: {
      supabaseUserId: user.id,
      email: user.email,
      name: typeof user.user_metadata?.name === 'string' ? user.user_metadata.name : null,
    },
    update: {},
  });
}

// See the comment in src/proxy.ts — that's the real, unconditional gate for
// /account/**. This redirect() is defense-in-depth: it's only a guaranteed
// HTTP redirect before React starts streaming the response; once streaming
// begins it falls back to a client-side <meta refresh> (Next.js's own
// documented behavior), which a real browser still honors but a plain HTTP
// client wouldn't.
/** For Server Component pages — redirects to the login page if not authenticated. */
export async function requireCustomerPage(): Promise<Customer> {
  const customer = await getOrCreateCustomer();
  if (!customer) {
    redirect('/account/login');
  }
  return customer;
}

/** For Route Handlers — returns the Customer or null instead of redirecting. */
export async function requireCustomerApi(): Promise<Customer | null> {
  return getOrCreateCustomer();
}
