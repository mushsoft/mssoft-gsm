'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/account/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        setError('Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }
      setSent(true);
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Mail className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Reset your password</h1>
          <p className="mt-1 text-xs text-neutral-500">Enter your account email and we&apos;ll send you a reset link.</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-4 text-center text-xs text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            <p>If an account exists for that email, a reset link is on its way. Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="forgot-email" className="sr-only">
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              autoFocus
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500"
            />

            {error && (
              <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-neutral-500">
          <Link href="/account/login" className="font-semibold text-amber-500 hover:text-amber-400">
            Back to Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
