'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, MailCheck } from 'lucide-react';

export default function AccountSignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/account/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Sign up failed');
        setIsSubmitting(false);
        return;
      }

      if (data.needsEmailConfirmation) {
        setNeedsConfirmation(true);
        setIsSubmitting(false);
        return;
      }

      router.push('/account');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (needsConfirmation) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <MailCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Check Your Email</h1>
          <p className="mt-1 text-xs text-neutral-500">We sent a confirmation link to {email}. Confirm it, then sign in.</p>
          <Link
            href="/account/login"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400"
          >
            Go to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Create Account</h1>
          <p className="mt-1 text-xs text-neutral-500">Track orders, save favorites, leave reviews.</p>
        </div>

        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            autoFocus
            disabled={isSubmitting}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 characters)"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500"
          />
        </div>

        {error && (
          <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !email || password.length < 8}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
        </button>

        <p className="mt-4 text-center text-xs text-neutral-500">
          Already have an account?{' '}
          <Link href="/account/login" className="font-bold text-amber-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
