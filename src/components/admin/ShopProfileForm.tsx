'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';

export type ShopProfileFormValues = {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  tiktok: string;
  instagram: string;
  facebook: string;
  address: string;
  tinNumber: string;
};

export default function ShopProfileForm({ initialValues }: { initialValues: ShopProfileFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof ShopProfileFormValues>(key: K, value: ShopProfileFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSaved(true);
      setIsSubmitting(false);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60';
  const labelClass = 'mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Business Name</label>
        <input
          required
          value={values.businessName}
          onChange={(e) => update('businessName', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="MS Soft GSM"
        />
      </div>

      <div>
        <label className={labelClass}>Tagline (optional)</label>
        <input
          value={values.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="Phones, Spares, Repairs And Accessories"
        />
        <p className="mt-1 text-[10px] text-neutral-400">Shown as a smaller line under the business name on invoices and receipts.</p>
      </div>

      <div>
        <label className={labelClass}>Shop Location</label>
        <input
          value={values.address}
          onChange={(e) => update('address', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="Kampala Centre Point, AC 19"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="+256 700 000 000"
          />
        </div>
        <div>
          <label className={labelClass}>WhatsApp</label>
          <input
            type="tel"
            value={values.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="+256 700 000 000"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="hello@mssoft-gsm.com"
        />
      </div>

      <div>
        <label className={labelClass}>Website</label>
        <input
          value={values.website}
          onChange={(e) => update('website', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="mssoft-gsm.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>TikTok</label>
          <input
            value={values.tiktok}
            onChange={(e) => update('tiktok', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="@mssoftgsm"
          />
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <input
            value={values.instagram}
            onChange={(e) => update('instagram', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="@mssoftgsm"
          />
        </div>
        <div>
          <label className={labelClass}>Facebook</label>
          <input
            value={values.facebook}
            onChange={(e) => update('facebook', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="MS Soft GSM"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>TIN (optional)</label>
        <input
          value={values.tinNumber}
          onChange={(e) => update('tinNumber', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="Tax Identification Number, if you have one"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
        {saved && !isSubmitting && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}
