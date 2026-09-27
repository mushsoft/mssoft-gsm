'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function AdminMfaSetupPage() {
  const router = useRouter();
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/mfa/enroll', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setLoadError(data.error || 'Could not start MFA enrollment');
          return;
        }
        setFactorId(data.factorId);
        setQrCode(data.qrCode);
        setSecret(data.secret);
      })
      .catch(() => setLoadError('Network error. Please refresh and try again.'));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!factorId) return;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/mfa/verify-enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ factorId, code }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubmitError(data.error || 'Incorrect code');
        setIsSubmitting(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setSubmitError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Set up two-factor login</h1>
          <p className="mt-1 text-xs text-neutral-500">
            Scan this with Google Authenticator, Authy, or any TOTP app, then enter the 6-digit code it shows.
          </p>
        </div>

        {loadError && (
          <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
            {loadError}
          </div>
        )}

        {qrCode && (
          <div className="flex flex-col items-center gap-3">
            {/* Supabase returns this as an inline SVG data URI. */}
            <img src={qrCode} alt="Scan this QR code with your authenticator app" className="h-40 w-40 rounded-lg bg-white p-2" />
            {secret && (
              <p className="break-all text-center font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                Or enter manually: {secret}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-2 w-full">
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

              {submitError && (
                <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || code.length !== 6}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm & Enable'}
              </button>
            </form>
          </div>
        )}

        {!qrCode && !loadError && (
          <div className="flex justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
          </div>
        )}
      </div>
    </main>
  );
}
