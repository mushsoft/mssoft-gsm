'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export type SoftwareToolFormValues = {
  category: string;
  title: string;
  creditCost: string;
  order: string;
};

export default function SoftwareToolForm({
  mode,
  initialValues,
  softwareToolId,
  existingCategories,
}: {
  mode: 'create' | 'edit';
  initialValues: SoftwareToolFormValues;
  softwareToolId?: string;
  existingCategories: string[];
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof SoftwareToolFormValues>(key: K, value: SoftwareToolFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      category: values.category,
      title: values.title,
      creditCost: Number(values.creditCost),
      order: values.order ? Number(values.order) : 0,
    };

    try {
      const url = mode === 'create' ? '/api/admin/software-tools' : `/api/admin/software-tools/${softwareToolId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      router.push('/admin/software-tools');
      router.refresh();
      setIsSubmitting(false);
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
        <label className={labelClass}>Category (grouping heading on the public page)</label>
        <input
          required
          list="software-tool-categories"
          value={values.category}
          onChange={(e) => update('category', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="DC-Unlocker & HCU"
        />
        <datalist id="software-tool-categories">
          {existingCategories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div>
        <label className={labelClass}>Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => update('title', e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="DC-Unlocker And HCU Credits For Existing User"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Supplier Cost (Credit units)</label>
          <input
            required
            type="number"
            step="0.001"
            min="0"
            value={values.creditCost}
            onChange={(e) => update('creditCost', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="11.02"
          />
        </div>
        <div>
          <label className={labelClass}>Sort Order (optional, lower first)</label>
          <input
            type="number"
            value={values.order}
            onChange={(e) => update('order', e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="0"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

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
        ) : mode === 'create' ? (
          'Create Software Tool'
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
}
