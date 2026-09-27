'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function AdminMfaVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Incorrect code');
        setIsSubmitting(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Enter your 2FA code</h1>
          <p className="mt-1 text-xs text-neutral-500">Open your authenticator app for the current 6-digit code.</p>
        </div>

        <label htmlFor="mfa-code" className="sr-only">
          6-digit code
        </label>
        <input
          id="mfa-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          placeholder="123456"
          autoFocus
          required
          disabled={isSubmitting}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-center text-lg tracking-[0.3em] text-neutral-800 placeholder-neutral-300 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
        />

        {error && (
          <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || code.length !== 6}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
        </button>
      </form>
    </main>
  );
}
