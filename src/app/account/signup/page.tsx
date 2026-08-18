'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, MailCheck, Eye, EyeOff } from 'lucide-react';
import { getPasswordStrength } from '@/lib/passwordStrength';
import { REFERRAL_SOURCE_OPTIONS } from '@/lib/referralSources';
import { COUNTRY_CODES, DEFAULT_COUNTRY_ISO2 } from '@/lib/countryCodes';

const inputClass =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-amber-500/50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:placeholder-neutral-500';
const fieldErrorClass = 'mt-1 text-[10px] font-bold text-red-500';

const DEFAULT_DIAL_CODE = COUNTRY_CODES.find((c) => c.iso2 === DEFAULT_COUNTRY_ISO2)?.dialCode ?? '+256';

interface FieldErrors {
  email?: string;
  username?: string;
  phone?: string;
}

function PasswordField({
  value,
  onChange,
  placeholder,
  disabled,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function AccountSignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dialCode, setDialCode] = useState(DEFAULT_DIAL_CODE);
  const [localPhone, setLocalPhone] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const strength = getPasswordStrength(password);
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit =
    !!email && !!username && !!localPhone && !!referralSource && password.length >= 8 && password === confirmPassword;

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    const phone = `${dialCode}${localPhone.replace(/\D/g, '')}`;

    try {
      const response = await fetch('/api/account/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, phone, referralSource, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.field === 'email' || data.field === 'username' || data.field === 'phone') {
          setFieldErrors({ [data.field]: data.error });
        } else {
          setError(data.error || 'Sign up failed');
        }
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
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-8">
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
            className={inputClass}
          />
          <div>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearFieldError('username');
              }}
              placeholder="Username"
              disabled={isSubmitting}
              className={inputClass}
            />
            {fieldErrors.username && <p className={fieldErrorClass}>{fieldErrors.username}</p>}
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
              placeholder="Email"
              disabled={isSubmitting}
              className={inputClass}
            />
            {fieldErrors.email && <p className={fieldErrorClass}>{fieldErrors.email}</p>}
          </div>
          <div>
            <div className="flex gap-2">
              <select
                value={dialCode}
                onChange={(e) => {
                  setDialCode(e.target.value);
                  clearFieldError('phone');
                }}
                disabled={isSubmitting}
                className={`${inputClass} w-28 shrink-0`}
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.iso2} value={c.dialCode}>
                    {c.dialCode} {c.iso2}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={localPhone}
                onChange={(e) => {
                  setLocalPhone(e.target.value);
                  clearFieldError('phone');
                }}
                placeholder="7XX XXX XXX"
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>
            {fieldErrors.phone && <p className={fieldErrorClass}>{fieldErrors.phone}</p>}
          </div>
          <select
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          >
            <option value="" disabled>
              How did you hear about us?
            </option>
            {REFERRAL_SOURCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div>
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="Password (min 8 characters)"
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {strength && (
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex h-1 flex-1 gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i <= strength.score ? strength.barColor : 'bg-neutral-200 dark:bg-neutral-800'}`}
                    />
                  ))}
                </div>
                <span className={`text-[10px] font-bold ${strength.textColor}`}>{strength.label}</span>
              </div>
            )}
          </div>

          <div>
            <PasswordField
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm Password"
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {passwordsMismatch && <p className={fieldErrorClass}>Passwords do not match</p>}
          </div>
        </div>

        {error && (
          <div className="mt-3 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !canSubmit}
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
