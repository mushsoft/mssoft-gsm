'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, KeyRound } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

// Landing page for both the customer "forgot password" email link and the
// admin initial-password-set link. Manually parses the recovery token out
// of the URL hash and calls setSession() directly — see the comment in the
// effect below for why this app's browser client doesn't auto-detect it.
export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const expiredMessage = 'This link has expired or was already used. Request a new one.';

    // Two link formats can land here depending on how it was issued:
    // - PKCE ("?code=...", what this app's own resetPasswordForEmail()
    //   produces, matching account/login's ?code= confirm-signup handling)
    // - implicit ("#access_token=...&refresh_token=...", what Supabase's
    //   admin generateLink() still returns, used for the initial admin
    //   password-set link)
    // This app's browser client doesn't auto-detect either from the URL on
    // its own, so both are handled explicitly rather than relying on
    // detectSessionInUrl.
    const code = new URLSearchParams(window.location.search).get('code');
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error: sessionError }) => {
        if (data.session && !sessionError) {
          window.history.replaceState({}, '', window.location.pathname);
          setReady(true);
        } else {
          setError(expiredMessage);
        }
      });
      return;
    }

    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ data, error: sessionError }) => {
        if (data.session && !sessionError) {
          window.history.replaceState({}, '', window.location.pathname);
          setReady(true);
        } else {
          setError(expiredMessage);
        }
      });
      return;
    }

    // Fallback: a session may already exist (e.g. fast refresh re-running
    // this effect after setSession()/exchangeCodeForSession() already
    // succeeded once, so neither token is in the URL anymore).
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else setError(expiredMessage);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    const { data, error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message || 'Could not set your password. The link may have expired, so request a new one.');
      setIsSubmitting(false);
      return;
    }

    router.push(data.user?.app_metadata?.role === 'admin' ? '/admin' : '/account');
    router.refresh();
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-base font-black text-neutral-900 dark:text-white">Set a new password</h1>
        </div>

        {!ready && error ? (
          <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
            {error}
          </div>
        ) : !ready ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="reset-password" className="sr-only">
              New password
            </label>
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (min 8 characters)"
              autoComplete="new-password"
              minLength={8}
              autoFocus
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500"
            />

            <label htmlFor="reset-password-confirm" className="sr-only">
              Confirm new password
            </label>
            <input
              id="reset-password-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={isSubmitting}
              className="mt-2.5 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500"
            />

            {error && (
              <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !password || !confirmPassword}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Set Password'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
